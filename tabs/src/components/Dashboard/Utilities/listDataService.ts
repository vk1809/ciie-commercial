type ListData = {
  "IRS Number": Value;
  "Requested Date": Value;
  "Project Name": Value;
  Group: Value;
  "Request Type": Value;
  Status: Value;
  "Request By": Value;
};
type Value = {
  text: string;
  value: string;
};

export class ListDataService {
  _data: any[];
  _elem;
  constructor(data: any, elem) {
    this._elem = elem;
    this._data = this.convertData(data.value);
    // this._data = data;
  }
  convertData(data) {
    var tempData = data.map((d) => {
      var temp: ListData = {
        "IRS Number": {
          text: "IRS Number",
          value: d.id,
        },
        "Requested Date": {
          text: "Requested Date",
          value: d.createdDateTime,
        },
        "Project Name": {
          text: "Project Name",
          value: d.Title,
        },
        Group: {
          text: "Group",
          value: d.fields.GroupTypeLookupId,
        },
        "Request Type": {
          text: "Request Type",
          value: d.fields.RequestTypeLookupId,
        },
        Status: {
          text: "Status",
          value: d.fields.Status,
        },
        "Request By": {
          text: "Request By",
          value: d.createdBy.user,
        },
      };
      return temp;
    });
    return tempData;
  }
  public getListData() {
    const columns = this.getColumns(Object.keys(this._data[0]));
    const rows = this.getRows(Object.keys(this._data[0]));
    return {
      find: true,
      filters: ["Status"],
      emptySelectionActionGroups: {
        g1: {
          a1: {
            title: "My IRS Request",
          },
        },
      },
      rows: rows,
      columns: columns,
    };
  }
  private getColumns(data: string[]) {
    let columns: any = {};
    data.map((d: any) => {
      var column = {
        title: d,

        minWidth: 100,
      };
      columns[d] = column;
    });

    return columns;
  }
  private getRows(columns: string[]) {
    let rows: any = {};
    this._data.forEach((d: any, index) => {
      let row: any = {};
      columns.forEach((column: string) => {
        if (column == "Request By") {
          row[column] = {
            content: {
              "en-US": d[column].value.displayName,
              fa: "فرشته فتاحی",
            },

            name: {
              "en-US": d[column].value.displayName,
              fa: "فرشته فتاحی",
            },
            type: "avatar",
          };
          return;
        }
        row[column] = {
          "en-US": this._elem(d[column].value),
        };

        row["actions"] = {
          share: {
            title: "Delete",
            icon: "Cancel",
          },
          manage: {
            title: "Edit",
            icon: "Edit",
          },
        };
      });
      rows[`r${(index + 1).toString()}`] = row;
    });
    return rows;
  }
}

export interface IListProps {
  filter: boolean;
  filters: string[];
  columns: {};
  rows: {};
}

//     const listConfig = {
//         find: true,
//         filters: ["c2", "c3"],
//         emptySelectionActionGroups: {
//           g1: {
//             a1: {
//               title: "Add",
//               icon: "Add",
//               subject: ["list", "add"],
//             },
//           },
//         },
//         columns: {
//           c1: {
//             title: "Member name",
//             sortable: "alphabetical" as TSortable,
//             icon: "ContactCard",
//           },
//           c2: {
//             title: "Location",
//             hideable: true,
//             minWidth: 100,
//           },
//           c3: {
//             title: "Role",
//             hideable: true,
//             hidePriority: 1,
//           },
//         },
//         rows: {
//           r1: {
//             c1: {
//               content: {
//                 "en-US": "Jasmine Wolf Sr.",
//                 fa: "فرشته فتاحی",
//               },

//               name: {
//                 "en-US": "Jasmine Wolf Sr.",
//                 fa: "فرشته فتاحی",
//               },
//               type: "avatar",

//               image:
//                 "https://teams-admin.azurewebsites.net/assets/img/avatars/CecilyDeCrum.jpg",
//             },
//             c2: [
//               {
//                 id: "asss",
//                 "en-US": "North Aidenborough",
//                 fa: "مهر آرابندرگاه",
//               },

//               {
//                 icon: "Location",
//               },
//             ],

//             c3: [
//               {
//                 "en-US": <h1>sdsdd</h1>,
//               },
//             ],

//             actions: {
//               share: {
//                 title: "Share",
//                 icon: "ShareGeneric",
//               },
//               manage: {
//                 title: "Edit",
//                 icon: "Edit",
//               },
//             },
//           },
//         } as any,
//       };
// }
export default {};
