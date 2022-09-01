import * as React from "react";
import axios from "axios";
import Attachments from "./attachment";
import "./main.css";
import { TeamsFx } from "@microsoft/teamsfx";

import {
  Flex,
  Segment,
  RadioGroup,
  Pill,
  Dropdown,
  Menu,
  Text,
  Input,
  TextArea,
  Portal,
  Header,
  CloseIcon,
  Button,
  Attachment,
} from "@fluentui/react-northstar";
import { Toggle } from '@fluentui/react-toggle';
import * as microsoftTeams from "@microsoft/teams-js";
import Spinner from "./spinner";
import Error from "./error";
import { createMicrosoftGraphClient } from "@microsoft/teamsfx";
import { useTeamsFx } from "@microsoft/teamsfx-react";
import { GroupType, PeoplePicker, Person, PersonCardInteraction, PersonViewType, UserType } from "@microsoft/mgt-react";
interface IState {
  isLoading: boolean;
  res: any;
  error: boolean;
  isSubmit: boolean;
  attachment: any;
  attachmentNames: any;
  filesData: any;
  filesSize: any;
  disableBtnAtttachment: boolean;
  AttachmentValidation: boolean;
  isLoadingRadio: boolean;
  disabeCancelBtn: boolean;
  projectName: string;
  demandOrigin: any;
  selectGroup: any;
  demandType: any;
  opcoType: any;
  dataToggle: boolean;
  budgetToggle: boolean;
  kpi: any;
  kpiApproval: any;
  sampleReport: any;
  projectOwner: any;
  businessAnalyst: any;
  executiveApprover: any;
  functionalAreaListData: any;
  demandTypeListData: any;
  opcoListData: any;
  kpiListData: any;
  projectOwnerListData: any;
  businessAnalystListData: any;
  executiveApproverListData: any;
  selectedPeople: any
}
interface IProps {
  appId?: string;
  token?: string;
  error?: string;
  flow?: string;
  teamsContext: any
}

export default class Tickets extends React.Component<IProps, IState> {
  state = {
    isLoading: false,
    res: "",
    error: false,
    isSubmit: false,
    attachment: [],
    attachmentNames: [],
    filesData: [],
    filesSize: [],
    disableBtnAtttachment: false,
    AttachmentValidation: false,
    isLoadingRadio: false,
    disabeCancelBtn: false,
    projectName: "",
    demandOrigin: {
      key: 'group',
      value: 'group'
    },
    selectGroup: {
      key: '',
      value: ''
    },
    demandType: {
      key: '',
      value: ''
    },
    opcoType: {
      key: '',
      value: ''
    },
    dataToggle: false,
    budgetToggle: false,
    kpi: [],
    kpiApproval: "0",
    sampleReport: "0",
    projectOwner: [],
    businessAnalyst: [],
    executiveApprover: [],
    functionalAreaListData: [],
    demandTypeListData: [],
    opcoListData: [],
    kpiListData: [],
    projectOwnerListData: [],
    businessAnalystListData: [],
    executiveApproverListData: [],
    selectedPeople: undefined
  };

  async componentDidMount() {
    try {
      await this.functionalAreaList()
      await this.demandTypeList()
      await this.opcoList()
      await this.kpiList()
      await this.projectOwnerList()
      await this.businessAnalystList()
      await this.executiveApproverList()

    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, error: true });
    }
  }

  async componentWillReceiveProps() { }

  async componentDidUpdate(prevProps: IProps, prevState: IState) { }

  functionalAreaList = async () => {
    let res = await axios.get(``)
    this.setState({ functionalAreaListData: res.data })
  }

  demandTypeList = async () => {
    let res = await axios.get(``)
    this.setState({ demandTypeListData: res.data })
  }

  opcoList = async () => {
    let res = await axios.get(``)
    this.setState({ opcoListData: res.data })
  }

  kpiList = async () => {
    let res = await axios.get(``)
    this.setState({ kpiListData: res.data })
  }

  projectOwnerList = async () => {
    let res = await axios.get(``)
    this.setState({ projectOwnerListData: res.data })
  }

  businessAnalystList = async () => {
    let res = await axios.get(``)
    this.setState({ businessAnalystListData: res.data })
  }

  executiveApproverList = async () => {
    let res = await axios.get(``)
    this.setState({ executiveApproverListData: res.data })
  }

  handleFiles = async (files) => {
    if (files.length > 0) {
      let names = [];
      for (let i in files) {
        names.push(files[i].name);
      }
      let bodyData = new FormData();
      for (let i in files) {
        bodyData.append("file", files[i]);
      }
      this.setState({
        attachment: files,
        attachmentNames: names,
        filesData: bodyData,
        filesSize: [],
        disableBtnAtttachment: false,
      });
    }
  };

  demandOrigin = (e: any, data: any) => {
    let demandData = this.state.demandOrigin;
    demandData = {
      key: data?.items[data?.activeIndex].key,
      value: data?.items[data?.activeIndex].content
    }
    this.setState({
      demandOrigin: demandData
    })
  }

  inputProjectName = (e: any) => {
    let data = this.state.projectName
    data = e.target.value
    this.setState({ projectName: data })
  }

  functionalAreaDropdown = (item: any) => {
    let data = this.state.selectGroup
    data = item
    this.setState({ selectGroup: data })
  }

  demandTypeDropdown = (item: any) => {
    let data = this.state.demandType
    data = item
    this.setState({ demandType: data })
  }

  opcoDropdown = (item: any) => {
    let data = this.state.opcoType
    data.key = item
    data.value = item
    this.setState({ opcoType: data })
  }

  toggleDataAvailablity = (e: any) => {
    this.setState({
      dataToggle: !this.state.dataToggle
    })
  }

  toggleBudgetAvailablity = (e: any) => {
    this.setState({
      budgetToggle: !this.state.budgetToggle
    })
  }

  kpiApproval = (e: any, props: any) => {
    this.setState({
      kpiApproval: props.value
    })
  }

  sampleReport = (e: any, props: any) => {
    this.setState({
      sampleReport: props.value
    })
  }

  disableSubmitButton() {
    if (this.state.isSubmit) {
      return true;
    }
    else if (
      this.state.projectName == "" ||
      this.state.demandType.value == "" ||
      this.state.selectGroup.value == "" || 
      this.state.projectOwner.length == 0 ||
      this.state.businessAnalyst.length == 0 ||
      this.state.executiveApprover.length == 0
    ) {
      return true;
    } else if (
      this.state.demandOrigin.value !== "" &&
      this.state.demandOrigin.value.toLowerCase() == "opco" &&
      this.state.opcoType.value == ""
    ) {
      return true;
    }
    else if ( 
      this.state.sampleReport.toLocaleLowerCase() !== "0" &&
      this.state.attachment.length == 0) {
      return true;
    }
    else if ( 
      this.state.kpiApproval !== "0" &&
      this.state.kpi.length == 0) {
      return true;
    }
    else {  
      return false;
    }
  }

  executiveApproverAddedFunction = (item: any) => {
    let data = this.state.executiveApprover
    data.push(item)
    this.setState({
      executiveApprover: data
    })
  }

  executiveApproverRemovedFunction = (item: any) => {
    let data = this.state.executiveApprover
    let newData = []
    for (let i in data) {
      if (item.content !== data[i].content) {
        newData.push(data[i])
      }
    }
    this.setState({
      executiveApprover: newData
    })
  }

  businessAnalystAddedFunction = (item: any) => {
    let data = this.state.businessAnalyst
    data.push(item)
    this.setState({
      businessAnalyst: data
    })
  }

  businessAnalystRemovedFunction = (item: any) => {
    let data = this.state.businessAnalyst
    let newData = []
    for (let i in data) {
      if (item.content !== data[i].content) {
        newData.push(data[i])
      }
    }
    this.setState({
      businessAnalyst: newData
    })
  }

  projectOwnerAddedFunction = (item: any) => {
    let data = this.state.projectOwner
    data.push(item)
    this.setState({
      projectOwner: data
    })
  }

  projectOwnerRemovedFunction = (item: any) => {
    let data = this.state.projectOwner
    let newData = []
    for (let i in data) {
      if (item.content !== data[i].content) {
        newData.push(data[i])
      }
    }
    this.setState({
      projectOwner: newData
    })
  }

  kpiAddedFunction = (item: any) => {
    let data = this.state.kpi
    data.push(item)
    this.setState({
      kpi: data
    })
  }

  kpiRemovedFunction = (item: any) => {
    let data = this.state.kpi
    let newData = []
    for (let i in data) {
      if (item.content !== data[i].content) {
        newData.push(data[i])
      }
    }
    this.setState({
      kpi: newData
    })
  }

  handleInputChange = (e) => {
    this.setState({
      selectedPeople: e.target.selectedPeople
    })

    const rows = e.target.selectedPeople.map((person, index) => {
      return {
        key: index,
        truncateContent: true,
        items: [
          {
            content: <Person userId={person.id} view={PersonViewType.oneline} personCardInteraction={PersonCardInteraction.hover}></Person>,
            truncateContent: true,
            title: person.displayName,
          },
          { content: person.mail, truncateContent: true, title: person.mail },
          {
            content: person.userPrincipalName,
            title: person.userPrincipalName,
            truncateContent: true,
          },
        ],
      };
    });
  }

  submitTicket = async () => {
    console.log("Submitted Data ==> ", this.state)
    const stateData: any = this.state;
    const teamsfx = new TeamsFx(); 
     
    // const graphClient = createMicrosoftGraphClient(teamsfx, ["User.Read"]); // Initializes MS Graph SDK using our MsGraphAuthProvider
    // // const profile = await graphClient.api("/me").get();

    // const listItem = {
    //     fields: {
    //       Title: stateData.projectName,
    //       // DemandType: stateData.demandOrigin?.value,
    //       // GroupTypeId: stateData.selectGroup?.value,
    //       // RequestTypeId: stateData.demandType?.value,
    //       DataAvailability: stateData.dataToggle ? 1 : 0,
    //       BudgetAvailability: stateData.budgetToggle ? 1 : 0
    //     }
    //   }; 

    try {
      // const res = await graphClient.api('/sites/00b8cf0a-6443-4d7a-8c1f-9d1538c6a061/lists//aa367958-f2c6-49b3-b994-5e7057a1bd35/items')
      //   .post(listItem);
      //   console.log("Api response ==> ", res)  
      //   this.setState({ isSubmit: true });

      let paylaod:any = {  
        id:"1234",
        submittedBy:"admin",
        submittedOn:new Date(),
        projectName: stateData.projectName, 
        demandOrigin: stateData.demandOrigin?.value,
        group: stateData.selectGroup,
        demandType: stateData.demandType,
        opcoType:  stateData.opcoType?.value,
        dataToggle: stateData.dataToggle ? 'Yes' : 'No',
        budgetToggle: stateData.budgetToggle ? 'Yes' : 'No',
        kpiList:JSON.stringify(stateData.kpi),
        kpiApproval:stateData.kpiApproval == '1' ? 'Yes' : 'No',
        sampleReport: stateData.sampleReport == '1' ? 'Yes' : 'No',
        projectOwner:stateData.projectOwner[0]?.header,
        businessAnalyst:stateData.businessAnalyst[0]?.header,
        executiveApprover: stateData.executiveApprover[0]?.header 
    }
        let taskModuleSubmitData = {
          action: "IRSTicketSubmitAction",
          token: this.props.token,
          data: paylaod
        };  
  
        await microsoftTeams.tasks.submitTask(JSON.stringify(taskModuleSubmitData))  
        microsoftTeams.tasks.submitTask()
  
    }
    catch (error) {
      this.setState({ isLoading: false, error: true });
    } 
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    } else if (this.state.error) {
      return <Error />;
    } else if (!this.state.error) {
      return (
        <div>
          <div
            className="container-padding scroll-bar">
            <Flex>
              <Flex
                gap="gap.small"
                padding="padding.medium"
                className="main-container-mv"
              >
                <Flex.Item size="2/3">
                  <div  style={{marginLeft:0}}>
                    <div>
                      <Flex>
                        <div style={{width: "100%"}}>
                          <Flex className="pb10">
                            <Text style={{fontSize:"1.25rem"}} weight="bold" content="Details" />
                          </Flex>
                          <Flex className="pb10">
                            <label htmlFor="">Name </label>
                            <label style={{ color: "red" }}>{" *"}</label>
                          </Flex>
                          <Flex className="pb10">
                            <Input
                              required
                              fluid
                              value={this.state.projectName}
                              placeholder="Enter your Name"
                              onChange={(e) => this.inputProjectName(e)}
                            />
                          </Flex>

                          <Flex className="pb10">
                            <label htmlFor="">USN</label>
                            <label style={{ color: "red" }}>{" *"}</label>
                          </Flex>
                          <Flex className="pb10">
                          <Input
                            required
                            fluid
                            value={this.state.projectName}
                            placeholder="Enter your USN"
                            onChange={(e) => this.inputProjectName(e)}
                          />
                          </Flex>

                          <Flex className="pb10" gap="gap.smaller">
                            <label htmlFor="">Application</label>
                            <label style={{ color: "red" }}>{" *"}</label>
                          </Flex>
                          <Flex className="pb10 ">
                            <Menu
                              className="menu"
                              defaultActiveIndex={0}
                              fluid
                              items={[
                                {
                                  key: "Forms",
                                  content: "Forms",
                                },
                                // {
                                //   key: "Permission",
                                //   content: "Permission",
                                // },
                              ]}
                              onActiveIndexChange={this.demandOrigin}

                              primary
                            />

                          </Flex>

                          <Flex className="mobileview-display pb11">
                            <Flex.Item size="size.half">
                              <div style={{paddingRight:"1vw"}}>
                                <div className="pb10">
                                  <label htmlFor="">Categories</label>
                                  <label style={{ color: "red" }}>{" *"}</label>
                                </div>
                                <div className="pb11">
                                  <Dropdown
                                    items={[
                                      {
                                        key:"1",
                                        label:"Fast-track Form",
                                        value:"1",
                                        name:"Fast-track Form"
                                      },
                                      "ID Card Form Dhawan",
                                      "Pitch your Start-UP idea",
                                      "Permission For Auditorium",
                                      "Permission For Indoor",
                                      "Permission For Lab Facility",
                                    ]}
                                    value={this.state.selectGroup.value}
                                    getA11ySelectionMessage={{
                                      onAdd: item => `${this.functionalAreaDropdown(item)} has been selected.`,
                                    }}
                                    placeholder={"Select The Required Form"}
                                    checkable
                                    fluid
                                    className="widthinvw"
                                  />
                                </div>
                              </div>
                            </Flex.Item>
                            {/* <Flex.Item size="size.half">
                              <div style={{paddingRight:"1vw"}}>
                                <div className="pb10">
                                  <label htmlFor="">Demand Type </label>
                                  <label style={{ color: "red" }}>{" *"}</label>
                                </div>
                                <div className="pb11">
                                  <Dropdown
                                    items={[
                                      "Dashboard Development",
                                      "Cube Development",
                                      "Data request",
                                    ]}
                                    placeholder={"Please Select Demand Type"}
                                    value={this.state.demandType.value}
                                    getA11ySelectionMessage={{
                                      onAdd: item => `${this.demandTypeDropdown(item)} has been selected.`,
                                    }}
                                    checkable
                                    fluid
                                    className="widthinvw"
                                  />
                                </div>
                              </div>
                            </Flex.Item> */}
                          </Flex>
                          {
                            this.state.demandOrigin?.key === 'OpCo' && (
                              <div>
                                <Flex className="pb11">
                                  <Flex.Item size="size.half">
                                    <div>
                                      <div className="pb10">
                                        <label htmlFor="">Which OpCo </label>
                                        <label style={{ color: "red" }}>{" *"}</label>
                                      </div>
                                      <div className="pb11">
                                        <Dropdown
                                          items={[
                                            "Nigeria",
                                            "Uganda",
                                            "South Africa",
                                          ]}
                                          value={this.state.opcoType.value}
                                          getA11ySelectionMessage={{
                                            onAdd: item => `${this.opcoDropdown(item)} has been selected.`,
                                          }}
                                          placeholder={"Please select OpCo"}
                                          checkable
                                          fluid
                                          className="opco-mv"
                                        />
                                      </div>
                                    </div>
                                  </Flex.Item>
                                </Flex>
                              </div>
                            )
                          }
                          <Flex>
                            <Flex.Item size="size.half">
                              <div className="pb11">
                                <div className="pb10">
                                  <label htmlFor="">Data Availablity </label>
                                  <label style={{ color: "red" }}>{" *"}</label>
                                </div>
                                <div >
                                  <Toggle
                                    onClick={this.toggleDataAvailablity}
                                  />
                                </div>
                              </div>
                            </Flex.Item>
                            <Flex.Item size="size.half">
                              <div className="pb11">
                                <div className="pb10">
                                  <label htmlFor="">Budget Availablity </label>
                                  <label style={{ color: "red" }}>{" *"}</label>
                                </div>
                                <div >
                                  {/* className={this.state.budgetToggle == true ? "buttonToggleBase" : "" */}
                                  <Toggle
                                    onClick={this.toggleBudgetAvailablity}
                                  />
                                </div>
                              </div>
                            </Flex.Item>
                          </Flex>
                          <Flex className="radio-group-mv">
                            <Flex.Item size="size.half">
                              <div className="pb11">
                                <div className="pb10">
                                  <label htmlFor="">
                                    Are all the KPI's iGovCo Approved{" "}
                                  </label>
                                </div>
                                {/* <br/> */}
                                <div>
                                  <RadioGroup
                                    vertical
                                    defaultCheckedValue="1"
                                    checkedValue={this.state.kpiApproval}
                                    onCheckedValueChange={this.kpiApproval}
                                    items={[
                                      {
                                        key: "1",
                                        label: "Yes",
                                        value: "1",
                                      },
                                      {
                                        key: "0",
                                        label: "No",
                                        value: "0",
                                      },
                                    ]}
                                  />
                                </div>
                              </div>
                            </Flex.Item>
                            <Flex.Item size="size.half">
                              <div className="pb11">
                                <div className="pb10">
                                  <label htmlFor="">
                                    Do we have a sample report? Please attach,if yes{" "}
                                  </label>
                                </div>
                                <div>
                                  <RadioGroup
                                    vertical
                                    defaultCheckedValue="2"
                                    checkedValue={this.state.sampleReport}
                                    onCheckedValueChange={this.sampleReport}
                                    items={[
                                      {
                                        key: "1",
                                        label: "Yes",
                                        value: "1",
                                      },
                                      {
                                        key: "0",
                                        label: "No",
                                        value: "0",
                                      },
                                    ]}
                                  />
                                </div>
                              </div>
                            </Flex.Item>
                          </Flex>
                        </div>
                      </Flex>
                      {
                        this.state.kpiApproval && this.state.kpiApproval === "1" ? (
                          <Flex>
                        <div className="pb11">
                          <div className="pb10">
                            <label htmlFor="">KPI's needed </label>
                            <label style={{ color: "red" }}>{" *"}</label>
                          </div>
                          <div>
                            <Dropdown
                              multiple
                              className="kpidropdown kpiinvwmv"
                              search
                              items={[
                                {
                                  header: "Robert Tolbert",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg",
                                  content: "Software Engineer",
                                },
                                {
                                  header: "Wanda Howard",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/WandaHoward.jpg",
                                  content: "UX Designer 2",
                                },
                                {
                                  header: "Tim Deboer",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg",
                                  content: "Principal Software Engineering Manager",
                                },
                                {
                                  header: "Amanda Brady",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg",
                                  content: "Technology Consultant",
                                },
                              ]}
                              placeholder="Select KPI's"
                              getA11ySelectionMessage={{
                                onAdd: item => `${this.kpiAddedFunction(item)} has been selected.`,

                                onRemove: item => `${this.kpiRemovedFunction(item)} has been removed.`,
                              }}
                              noResultsMessage="We couldn't find any KPI's for match"
                              a11ySelectedItemsMessage="Press Delete or Backspace to remove"
                            />
                          </div>
                        </div>
                      </Flex>
                        ):(
                          <Flex>
                        <div className="pb11">
                          <div className="pb10">
                            <label htmlFor="">KPI's needed </label>  
                          </div>
                          <div>
                            <PeoplePicker userType={UserType.user} selectionChanged={this.handleInputChange} placeholder="Typing name to select people to view contact info" className="typebox"></PeoplePicker>
                          </div>
                        </div>
                      </Flex>
                        )
                      }
                      
                    </div>
                  </div>
                </Flex.Item>

                <Flex.Item  size="1/3">
                  <div style={{paddingLeft:"2rem !important"}}>
                    <div>
                      <Flex className="pb10">
                        <Text style={{fontSize:"1.25rem"}} weight="bold" content="Key Stackholder" />
                      </Flex>
                      <Flex>
                        <div className="pb11">
                          <div className="pb10">
                            <label htmlFor="">Project Owner </label>
                            <label style={{ color: "red" }}>{" *"}</label>
                          </div>
                          <div>
                            <Dropdown
                              multiple
                              search
                              items={[
                                {
                                  header: "Robert Tolbert",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg",
                                  content: "Software Engineer",
                                },
                                {
                                  header: "Wanda Howard",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/WandaHoward.jpg",
                                  content: "UX Designer 2",
                                },
                                {
                                  header: "Tim Deboer",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg",
                                  content: "Principal Software Engineering Manager",
                                },
                                {
                                  header: "Amanda Brady",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg",
                                  content: "Technology Consultant",
                                },
                              ]}
                              placeholder="Select Project Owner"
                              getA11ySelectionMessage={{
                                onAdd: item => `${this.projectOwnerAddedFunction(item)} has been selected.`,

                                onRemove: item => `${this.projectOwnerRemovedFunction(item)} has been removed.`,
                              }}
                              noResultsMessage="We couldn't find any matches"
                              a11ySelectedItemsMessage="Press Delete or Backspace to remove"
                              className="left-column-mv"
                            />
                          </div>
                        </div>
                      </Flex>
                      <Flex>
                        <div className="pb11">
                          <div className="pb10">
                            <label htmlFor="">Business Analyst </label>
                            <label style={{ color: "red" }}>{" *"}</label>
                          </div>
                          <div>
                            <Dropdown
                              multiple
                              search
                              items={[
                                {
                                  header: "Robert Tolbert",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg",
                                  content: "Software Engineer",
                                },
                                {
                                  header: "Wanda Howard",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/WandaHoward.jpg",
                                  content: "UX Designer 2",
                                },
                                {
                                  header: "Tim Deboer",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg",
                                  content: "Principal Software Engineering Manager",
                                },
                                {
                                  header: "Amanda Brady",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg",
                                  content: "Technology Consultant",
                                },
                              ]}
                              placeholder="Select Business Analyst"
                              getA11ySelectionMessage={{
                                onAdd: item => `${this.businessAnalystAddedFunction(item)} has been selected.`,

                                onRemove: item => `${this.businessAnalystRemovedFunction(item)} has been removed.`,
                              }}
                              noResultsMessage="We couldn't find any matches"
                              a11ySelectedItemsMessage="Press Delete or Backspace to remove"
                              className="left-column-mv"
                            />
                          </div>
                        </div>
                      </Flex>
                      <Flex>
                        <div className="pb11">
                          <div className="pb10">
                            <label htmlFor="">Executive Approvers </label>
                            <label style={{ color: "red" }}>{" *"}</label>
                          </div>
                          <div>
                            <Dropdown
                              multiple
                              search
                              items={[
                                {
                                  header: "Robert Tolbert",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg",
                                  content: "Software Engineer",
                                },
                                {
                                  header: "Wanda Howard",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/WandaHoward.jpg",
                                  content: "UX Designer 2",
                                },
                                {
                                  header: "Tim Deboer",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg",
                                  content: "Principal Software Engineering Manager",
                                },
                                {
                                  header: "Amanda Brady",
                                  image:
                                    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg",
                                  content: "Technology Consultant",
                                },
                              ]}
                              placeholder="Select Executive Approvers"
                              getA11ySelectionMessage={{
                                onAdd: item => `${this.executiveApproverAddedFunction(item)} has been selected.`,

                                onRemove: item => `${this.executiveApproverRemovedFunction(item)} has been removed.`,
                              }}
                              noResultsMessage="We couldn't find any matches"
                              a11ySelectedItemsMessage="Press Delete or Backspace to remove"
                              className="left-column-mv"
                            />
                          </div>
                        </div>
                      </Flex>
                      <Flex>
                        <div className="pb11">
                          <div className="pb10">
                          <Text style={{fontSize:"1.25rem"}} weight="bold" content="Attachments" />
                            <label style={{ color: "red" }}>{" *"}</label>
                          </div>
                          <div>
                            <label htmlFor="">Document</label>
                          </div>
                          <div>
                          </div>
                          <div>
                            <Attachments handleFiles={this.handleFiles} />
                          </div>
                        </div>
                      </Flex>
                    </div>
                  </div>
                </Flex.Item>
              </Flex>
            </Flex>
          </div>
          <div style={{
            position: "fixed",
            bottom: "10px",
            right: "10px"
          }}>
            <Flex >
              <Button
                content={
                  this.state.isSubmit
                    ? "Please Wait..."
                    : this.state.disableBtnAtttachment
                      ? "Loading..."
                      : "Submit"
                }
                // disabled={this.disableSubmitButton()}
                onClick={(e) => this.submitTicket()}
                primary
              />
            </Flex>
          </div>
        </div>
      );
    }
  }
}
