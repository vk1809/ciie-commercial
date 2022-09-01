import React, { useContext } from "react";
import { Welcome } from "./sample/Welcome";
import { TeamsFxContext } from "./Context";
import Listing from "./Dashboard/Listing";
import { Provider as RTSProvider, themeNames } from "@fluentui/react-teams";
import { createMicrosoftGraphClient, TeamsFx } from "@microsoft/teamsfx";
import { useGraph } from "@microsoft/teamsfx-react";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import * as microsoftTeams from "@microsoft/teams-js";

const showFunction = Boolean(process.env.REACT_APP_FUNC_NAME);

export default function Tab() {
  const { themeString, teamsfx } = useContext(TeamsFxContext);

  //SetGraphContext();

  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <RTSProvider themeName={themeNames.Default} lang="en-US">
        <Listing />
      </RTSProvider>
    </div>
  );
}

async function SetGraphContext() {
  const { teamsfx } = useContext(TeamsFxContext);
  // const teamsfx = new TeamsFx();
  // const accessToken = await teamsfx.login("User.Read");
  // teamsfx.setSsoToken(accessToken);
  const { loading, error, data, reload } = useGraph(
    async (graph, teamsfx, scope) => {
      // Call graph api directly to get user profile information
      let profile;
      await teamsfx.login([
        "https://graph.microsoft.com/User.Read",
        "Sites.ReadWrite.All",
        "User.ReadBasic.All"
      ]);
      try {
        profile = await graph.api("/me").get();
        profile.then((a) => console.log(a));
      } catch (error) {
        console.log(error);
      }

      // Initialize Graph Toolkit TeamsFx provider
      const provider = new TeamsFxProvider(teamsfx, scope);
      Providers.globalProvider = provider;
      Providers.globalProvider.setState(ProviderState.SignedIn);

      let photoUrl = "";
      let meeting = null;
      try {
        const photo = await graph.api("/me/photo/$value").get();
        photoUrl = URL.createObjectURL(photo);
        microsoftTeams.getContext(async (context) => {
          console.log(context);
          try {
            meeting = await graphClient
              .api("/sites/6347jx.sharepoint.com/:/sites/6347jx?$select=id")
              .get();
            meeting.then((a) => console.log(a));

            debugger;
          } catch (error) {
            console.error(error);
          }
        });
      } catch {
        // Could not fetch photo from user's profile, return empty string as placeholder.
      }
      console.log(meeting);
      return { meeting };
    },
    {
      scope: ["User.Read", "User.ReadBasic.All", "Sites.ReadWrite.All"],
      teamsfx: teamsfx,
    }
  );

  const graphClient = createMicrosoftGraphClient(teamsfx, [
    "User.Read",
    "Sites.ReadWrite.All",
    "User.ReadBasic.All"
  ]);
  const profile = await graphClient.api("/me").get();
  const sites = await graphClient
    .api(
      "/sites/00b8cf0a-6443-4d7a-8c1f-9d1538c6a061/lists/aa367958-f2c6-49b3-b994-5e7057a1bd35/items?expand=fields"
    )
    .get();
  console.table(sites);
  // sites.then(a => console.log(a));
  // profile.then(a => console.log(a));
  console.log(profile);
}
