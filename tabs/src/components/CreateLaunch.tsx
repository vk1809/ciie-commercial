import { useContext } from "react";
import { Welcome } from "./sample/Welcome";
import { TeamsFxContext } from "./Context";
import Listing from "./Dashboard/Listing";
import { Provider as RTSProvider, themeNames } from "@fluentui/react-teams";
import { createMicrosoftGraphClient, TeamsFx } from "@microsoft/teamsfx";
import { useGraph } from "@microsoft/teamsfx-react";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import { GlobalSvc } from "../service/GlobalSvc";
import Tickets from "../CreateIRSForm/raiseTicket";

const showFunction = Boolean(process.env.REACT_APP_FUNC_NAME);

export default function CreateIRS() {
    const { themeString, teamsfx } = useContext(TeamsFxContext);
  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <Tickets teamsContext={teamsfx} />
    </div>
  );
}

