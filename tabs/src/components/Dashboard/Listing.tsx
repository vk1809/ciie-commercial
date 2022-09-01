import { Loader } from "@fluentui/react-northstar";
import { EAvatarVariant, List, TSortable } from "@fluentui/react-teams";
import { ICellIconAvatarContent } from "@fluentui/react-teams/lib/cjs/components/Table/Table";
import { useData, useTeamsFx } from "@microsoft/teamsfx-react";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ListDataService } from "./Utilities/listDataService";
import { Table as FList, Toolbar } from "@fluentui/react-northstar";
import { createMicrosoftGraphClient } from "@microsoft/teamsfx";
import { TeamsFxContext } from "../Context";

const Elem = (name: any) => {
  return <h3> ${name}</h3>;
};
const GetListData = async (graphClient) => {
  const data = await graphClient
    .api(
      "/sites/00b8cf0a-6443-4d7a-8c1f-9d1538c6a061/lists/aa367958-f2c6-49b3-b994-5e7057a1bd35/items?expand=fields"
    )
    .get();
  console.log(data);
  return data;
};
function Listing() {
  // let sampleData = require("../../SampleData.json");
  const [listData, setListData] = useState<any>();
  const { teamsfx } = useContext(TeamsFxContext);

  const graphClient = createMicrosoftGraphClient(teamsfx, [
    "User.Read",
    "Sites.ReadWrite.All",
  ]);

  useEffect(() => {
    GetListData(graphClient).then((data) => {
      var listDataService: ListDataService = new ListDataService(
        { ...data },
        getStatusContent
      );
      const listData = listDataService.getListData();
      setListData(listData);
    });
  }, []);
  const getStatusContent = (val) => {
    const colour = StatusColor[val];

    return <span style={{ color: colour }}>{val}</span>;
  };
  return (
    <div>
      {listData ? <List label="sdsd" {...listData}></List> : <Loader></Loader>}
    </div>
  );
}
const listConfig = {
  find: true,
  filters: ["c2", "c3"],
  emptySelectionActionGroups: {
    g1: {
      a1: {
        title: "Add",
        icon: "Add",
        subject: ["list", "add"],
      },
    },
  },

  columns: {
    c1: {
      title: <h1>member</h1>,
      sortable: "alphabetical" as TSortable,
      icon: "ContactCard",
    },
    c2: {
      title: "Location",
      hideable: true,
      minWidth: 100,
    },
    c3: {
      title: "Role",
      hideable: true,
      hidePriority: 1,
    },
  },
  rows: {
    r1: {
      c1: {
        content: {
          "en-US": "Jasmine Wolf Sr.",
          fa: "فرشته فتاحی",
        },

        name: {
          "en-US": "Jasmine Wolf Sr.",
          fa: "فرشته فتاحی",
        },
        type: "avatar",

        image:
          "https://teams-admin.azurewebsites.net/assets/img/avatars/CecilyDeCrum.jpg",
      },
      c2: [
        {
          id: "asss",
          "en-US": "North Aidenborough",
          fa: "مهر آرابندرگاه",
        },

        {
          icon: "Location",
        },
      ],

      c3: [
        {
          "en-US": <h3>sdsdd</h3>,
        },
      ],

      actions: {
        share: {
          title: "Share",
          icon: "ShareGeneric",
        },
        manage: {
          title: "Edit",
          icon: "Edit",
        },
      },
    },
    r2: {
      c1: {
        content: {
          "en-US": "Jasmine Wolf Sr.",
          fa: "فرشته فتاحی",
        },

        name: {
          "en-US": "Jasmine Wolf Sr.",
          fa: "فرشته فتاحی",
        },
        type: "avatar",

        image:
          "https://teams-admin.azurewebsites.net/assets/img/avatars/CecilyDeCrum.jpg",
      },
      c2: [
        {
          id: "asss",
          "en-US": "North Aidenborough",
          fa: "مهر آرابندرگاه",
        },

        {
          icon: "Location",
        },
      ],

      c3: [
        {
          "en-US": <h3>sdsdd</h3>,
        },
      ],

      actions: {
        share: {
          title: "Share",
          icon: "ShareGeneric",
        },
        manage: {
          title: "Edit",
          icon: "Edit",
        },
      },
    },
    r3: {
      c1: {
        content: {
          "en-US": "Jasmine Wolf Sr.",
          fa: "فرشته فتاحی",
        },

        name: {
          "en-US": "Jasmine Wolf Sr.",
          fa: "فرشته فتاحی",
        },
        type: "avatar",

        image:
          "https://teams-admin.azurewebsites.net/assets/img/avatars/CecilyDeCrum.jpg",
      },
      c2: [
        {
          id: "asss",
          "en-US": "North Aidenborough",
          fa: "مهر آرابندرگاه",
        },

        {
          icon: "Location",
        },
      ],

      c3: [
        {
          "en-US": <h3>sdsdd</h3>,
        },
      ],

      actions: {
        share: {
          title: "Share",
          icon: "ShareGeneric",
        },
        manage: {
          title: "Edit",
          icon: "Edit",
        },
      },
    },
  } as any,
} as any;
type ListProps = {
  listData: any[];
};

class Listingg extends React.Component<ListProps> {
  constructor(props: ListProps) {
    super(props);
    console.log(props);
  }
  render(): React.ReactNode {
    return <List label="table" {...listConfig}></List>;
  }
}
enum StatusColor {
  "Approved" = "LightGreen",
  "In Progress" = "Yellow",
  "Rejected" = "Red",
}
export default Listing;