import { default as axios } from "axios";
import * as querystring from "querystring";
import {
  TeamsActivityHandler,
  CardFactory,
  TurnContext,
  AdaptiveCardInvokeValue,
  AdaptiveCardInvokeResponse,
  TaskModuleRequest,
  TaskModuleResponse,
  TabRequest,
  TabResponse,
  TabSubmit,
} from "botbuilder";
import rawWelcomeCard from "./adaptiveCards/welcome.json";
import rawLearnCard from "./adaptiveCards/learn.json";
import firstCard from "./adaptiveCards/firstCard.json";
import irsCard from "./adaptiveCards/irsCard.json";
import welcomeMTN from "./adaptiveCards/welcomeMTN.json";
// import irsSubmit from "./adaptiveCards/irsSubmit.json";
import loginCard from "./adaptiveCards/login.json"; 
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import {submitIRS} from "./adaptiveCards/irsSubmit";


export interface DataInterface {
  likeCount: number;
} 

export class TeamsBot extends TeamsActivityHandler {
  // record the likeCount
  userLogin: boolean;

  constructor() {
    super();

    this.userLogin = true;

    this.onMessage(async (context, next) => { 
      console.log("Running with Message Activity.");

      let txt = context?.activity?.text || context?.activity?.value?.text;
      const removedMentionText = TurnContext.removeRecipientMention(context?.activity);
      if (removedMentionText) {
        // Remove the line break
        txt = removedMentionText?.toLowerCase().replace(/\n|\r/g, "").trim();
      }

      // Trigger command by IM text
      if (txt) {
        if (txt == "welcome" || txt ==  "hi" || txt == "hello" || txt ==  "hii") {
       
            const card = AdaptiveCards.declareWithoutData(welcomeMTN).render();
            await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          
        }
        else if ( txt ==  "irs" || txt ==  "create irs" || txt == "my irs" || txt == "irs management" || txt == "create irs request") { 
          const card = AdaptiveCards.declare<DataInterface>(irsCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
        } 
        else {
          await context.sendActivity("Sorry, Still Learning!");  
        }
      }
      else {
        await context.sendActivity("Sorry, Still Learning!");  
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          const card = AdaptiveCards.declareWithoutData(welcomeMTN).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
      }
      await next();
    });
  }

  // Invoked when an action is taken on an Adaptive Card. The Adaptive Card sends an event to the Bot and this
  // method handles that event.
  async onAdaptiveCardInvoke(
    context: TurnContext,
    invokeValue: AdaptiveCardInvokeValue
  ): Promise<AdaptiveCardInvokeResponse> {
    // The verb "userlike" is sent from the Adaptive Card defined in adaptiveCards/learn.json
    if (invokeValue.action.verb === "login") {
      this.userLogin = true;
      const card = AdaptiveCards.declare<DataInterface>(irsCard).render();
      await context.updateActivity({
        type: "message",
        id: context.activity.replyToId,
        attachments: [CardFactory.adaptiveCard(welcomeMTN)],
      });
      return { statusCode: 200, type: undefined, value: undefined };
    }
  }

  //set for task module popup
  setTaskInfo(taskInfo, uiSettings, text) {
    taskInfo.height = 1000;
    taskInfo.width = 700;
    taskInfo.title = "Create IRS Ticket";
  }

  public async handleTeamsTaskModuleFetch(context: TurnContext, taskModuleRequest: TaskModuleRequest): Promise<TaskModuleResponse> {
    console.log("task module fetch")
    try {
      // let userInfo = {}
      // let queryDetails = context.activity.value.data.queryDetails;
      // const cardTaskFetchValue = taskModuleRequest.data.text || taskModuleRequest.data.title;
      // const replyToId = context.activity.replyToId;

      // const queryString = "?&appId=" + process.env.MicrosoftAppID + "&theme=" + String(taskModuleRequest.context.theme).toLowerCase()
      let taskInfo:any = {
        // url:"https://mtndemandmdev57aff7tab.z19.web.core.windows.net/",
        url:"https://localhost:53000/",
        fallbackUrl:"https://www.google.com/",
        height : 650,
        width : 1350,
        title : "Create IRS Ticket" 
      }
      
      return {
        task: {
            type: 'continue',
            value: taskInfo
        }   
    };
  } catch (error) {
      console.log(`mainActivityHandler handleTeamsTaskModuleFetch error`, error);
  } 

    return 
  }

  public async handleTeamsTaskModuleSubmit(context: TurnContext, taskModuleRequest: TaskModuleRequest): Promise<TaskModuleResponse> {
    const data = JSON.parse(taskModuleRequest?.data)
    var submitData:any = {
      irsId:data?.data?.id,
      submittedBy:data?.data?.submittedBy,
      submittedOn: data?.data?.submittedOn,
      group:data?.data?.group,
      irsType:data?.data?.demandType,
      projectOwner:data?.data?.projectOwner,
      dataAvailablity:data?.data?.dataToggle,
      budgetAvailablity:data?.data?.budgetToggle,
      kpi:data?.data?.kpiList,
      kpiApproved:data?.data?.kpiApproval,
      approver:[]
    }
    const card = AdaptiveCards.declareWithoutData(submitIRS(submitData)).render();
    await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
    console.log("task module submitted")
    return 
  }

  public async handleTeamsTabFetch(context: TurnContext, tabRequest: TabRequest): Promise<TabResponse> {
    console.log("tab module fetch")
    return 
  }

  public async handleTeamsTabSubmit(context: TurnContext, tabSubmit: TabSubmit): Promise<TabResponse> {
    console.log("tab module submitted")
    return 
  }

  // Message extension Code
  // Action.
  public async handleTeamsMessagingExtensionSubmitAction(
    context: TurnContext,
    action: any
  ): Promise<any> {
    switch (action.commandId) {
      case "createCard":
        return createCardCommand(context, action);
      case "shareMessage":
        return shareMessageCommand(context, action);
      default:
        throw new Error("NotImplemented");
    }
  }

  // Search.
  public async handleTeamsMessagingExtensionQuery(context: TurnContext, query: any): Promise<any> {
    const searchQuery = query.parameters[0].value;
    const response = await axios.get(
      `http://registry.npmjs.com/-/v1/search?${querystring.stringify({
        text: searchQuery,
        size: 8,
      })}`
    );

    const attachments = [];
    response.data.objects.forEach((obj) => {
      const heroCard = CardFactory.heroCard(obj.package.name);
      const preview = CardFactory.heroCard(obj.package.name);
      preview.content.tap = {
        type: "invoke",
        value: { name: obj.package.name, description: obj.package.description },
      };
      const attachment = { ...heroCard, preview };
      attachments.push(attachment);
    });

    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: attachments,
      },
    };
  }

  public async handleTeamsMessagingExtensionSelectItem(
    context: TurnContext,
    obj: any
  ): Promise<any> {
    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: [CardFactory.heroCard(obj.name, obj.description)],
      },
    };
  } 

  // Link Unfurling.
  public async handleTeamsAppBasedLinkQuery(context: TurnContext, query: any): Promise<any> {
    const attachment = CardFactory.thumbnailCard("Image Preview Card", query.url, [query.url]);

    const result = {
      attachmentLayout: "list",
      type: "result",
      attachments: [attachment],
    };

    const response = {
      composeExtension: result,
    };
    return response;
  }
}

async function createCardCommand(context: TurnContext, action: any): Promise<any> {
  // The user has chosen to create a card by choosing the 'Create Card' context menu command.
  const data = action.data;
  const heroCard = CardFactory.heroCard(data.title, data.text);
  heroCard.content.subtitle = data.subTitle;
  const attachment = {
    contentType: heroCard.contentType,
    content: heroCard.content,
    preview: heroCard,
  };

  return {
    composeExtension: {
      type: "result",
      attachmentLayout: "list",
      attachments: [attachment],
    },
  };
}

async function shareMessageCommand(context: TurnContext, action: any): Promise<any> {
  // The user has chosen to share a message by choosing the 'Share Message' context menu command.
  let userName = "unknown";
  if (
    action.messagePayload &&
    action.messagePayload.from &&
    action.messagePayload.from.user &&
    action.messagePayload.from.user.displayName
  ) {
    userName = action.messagePayload.from.user.displayName;
  }

  // This Message Extension example allows the user to check a box to include an image with the
  // shared message.  This demonstrates sending custom parameters along with the message payload.
  let images = [];
  const includeImage = action.data.includeImage;
  if (includeImage === "true") {
    images = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtB3AwMUeNoq4gUBGe6Ocj8kyh3bXa9ZbV7u1fVKQoyKFHdkqU",
    ];
  }
  const heroCard = CardFactory.heroCard(
    `${userName} originally sent this message:`,
    action.messagePayload.body.content,
    images
  );

  if (
    action.messagePayload &&
    action.messagePayload.attachment &&
    action.messagePayload.attachments.length > 0
  ) {
    // This sample does not add the MessagePayload Attachments.  This is left as an
    // exercise for the user.
    heroCard.content.subtitle = `(${action.messagePayload.attachments.length} Attachments not included)`;
  }

  const attachment = {
    contentType: heroCard.contentType,
    content: heroCard.content,
    preview: heroCard,
  };

  return {
    composeExtension: {
      type: "result",
      attachmentLayout: "list",
      attachments: [attachment],
    },
  };


  async function submitCard(body){

  }

}


