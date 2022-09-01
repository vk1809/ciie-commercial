export function submitIRS(data){
    return {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0", 
        "body": [
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `New IRS created - ${data?.id}`,
                                "wrap": true,
                                "style": "default",
                                "fontType": "Default",
                                "size": "Medium",
                                "weight": "Bolder",
                                "color": "Dark"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Executive Approvals pending",
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Submitted by:",
                                "wrap": true,
                                "color": "Dark",
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.submittedBy,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Submitted On:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.submittedOn,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Group:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.group,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "IRS Type:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.irsType,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "wrap": true,
                                "weight": "Bolder",
                                "text": "Project Owner:"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.projectOwner,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Data availablity:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.dataAvailablity,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Budget availability:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.budgetAvailablity,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "KPIs needed:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text":  data?.kpi,
                                "wrap": true
                            }
                        ]
                    }
                ],
                "spacing": "None"
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Are all KPIs IGovCo approved?",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.kpiApproved,
                                "wrap": true
                            }
                        ]
                    }
                ],
                "spacing": "Medium"
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "selectAction": {
                            "type": "Action.ToggleVisibility",
                            "targetElements": [
                                "cardContent4",
                                "showHistory",
                                "hideHistory"
                            ]
                        },
                        "verticalContentAlignment": "Center",
                        "items": [
                            {
                                "type": "TextBlock",
                                "id": "showHistory",
                                "horizontalAlignment": "Right",
                                "color": "Accent",
                                "text": "Show approval chain",
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "id": "hideHistory",
                                "horizontalAlignment": "Right",
                                "color": "Accent",
                                "text": "Hide approval chain",
                                "wrap": true,
                                "isVisible": false
                            }
                        ],
                        "width": 1
                    }
                ]
            },
            {
                "type": "Container",
                "id": "cardContent4",
                "isVisible": false,
                "items": [
                    {
                        "type": "Container",
                        "spacing": "Large",
                        "style": "emphasis",
                        "items": [
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "weight": "Bolder",
                                                "text": "SN"
                                            }
                                        ],
                                        "width": "auto"
                                    },
                                    {
                                        "type": "Column",
                                        "spacing": "Large",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "weight": "Bolder",
                                                "text": "Status"
                                            }
                                        ],
                                        "width": "stretch"
                                    },
                                    {
                                        "type": "Column",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "weight": "Bolder",
                                                "text": "Date"
                                            }
                                        ],
                                        "width": "auto"
                                    }
                                ]
                            },
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "1",
                                                "wrap": true
                                            }
                                        ],
                                        "width": "auto"
                                    },
                                    {
                                        "type": "Column",
                                        "spacing": "Medium",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Approved by chris naido",
                                                "wrap": true
                                            }
                                        ],
                                        "width": "stretch"
                                    },
                                    {
                                        "type": "Column",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "12-02",
                                                "wrap": true
                                            }
                                        ],
                                        "width": "auto"
                                    }
                                ]
                            }
                        ],
                        "bleed": true
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "Withdraw"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "Remind Approvers"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch"
                    }
                ],
                "spacing": "Medium"
            }
        ]
    }
}

export function newSubmitIRSCard(data){
    return {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.5",
        "body": [
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "196px",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `New IRS created - ${data?.id}`,
                                "wrap": true,
                                "style": "default",
                                "fontType": "Default",
                                "size": "Medium",
                                "weight": "Bolder",
                                "color": "Dark"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "Image",
                                                "horizontalAlignment": "Left",
                                                "url": "https://messagecardplayground.azurewebsites.net/assets/CircleGreen.png",
                                                "altText": "Gray dot"
                                            }
                                        ],
                                        "verticalContentAlignment": "Center",
                                        "horizontalAlignment": "Center",
                                        "minHeight": "1px"
                                    },
                                    {
                                        "type": "Column",
                                        "width": "160px",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "wrap": true,
                                                "text": "Executve Approvals pending",
                                                "isSubtle": true
                                            }
                                        ],
                                        "minHeight": "2px"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Submitted by:",
                                "wrap": true,
                                "color": "Dark",
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.submittedBy,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Submitted On:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.submittedOn,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Group:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.group,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "IRS Type:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.irsType, 
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "wrap": true,
                                "weight": "Bolder",
                                "text": "Project Owner:"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.projectOwner,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Data availablity:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.dataAvailablity,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Budget availability:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.budgetAvailablity,
                                "wrap": true
                            }
                        ]
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "KPIs needed:",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text":  data?.kpi,
                                "wrap": true
                            }
                        ]
                    }
                ],
                "spacing": "None"
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "Are all KPIs IGovCo approved?",
                                "wrap": true,
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": data?.kpiApproved,
                                "wrap": true
                            }
                        ]
                    }
                ],
                "spacing": "Medium"
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "selectAction": {
                            "type": "Action.ToggleVisibility",
                            "targetElements": [
                                "cardContent4",
                                "showHistory",
                                "hideHistory"
                            ]
                        },
                        "verticalContentAlignment": "Center",
                        "items": [
                            {
                                "type": "TextBlock",
                                "id": "showHistory",
                                "horizontalAlignment": "Right",
                                "color": "Accent",
                                "text": "Show approval chain",
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "id": "hideHistory",
                                "horizontalAlignment": "Right",
                                "color": "Accent",
                                "text": "Hide approval chain",
                                "wrap": true,
                                "isVisible": false
                            }
                        ],
                        "width": 1
                    }
                ]
            },
            {
                "type": "Container",
                "id": "cardContent4",
                "isVisible": false,
                "items": [
                    {
                        "type": "Container",
                        "spacing": "Large",
                        "style": "emphasis",
                        "items": table(data),
                        "bleed": true
                    }
                ]
            },
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "Withdraw"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "ActionSet",
                                "actions": [
                                    {
                                        "type": "Action.Submit",
                                        "title": "Remind Approvers"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "stretch"
                    }
                ],
                "spacing": "Medium"
            }
        ],
        "msteams": {
            "width": "Full"
        }
    }
}

function table(data){
    var newData:any = [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "weight": "Bolder",
                            "text": "SN"
                        }
                    ],
                    "width": "20px"
                },
                {
                    "type": "Column",
                    "spacing": "Large",
                    "items": [
                        {
                            "type": "TextBlock",
                            "weight": "Bolder",
                            "text": "Status",
                            "horizontalAlignment": "Left"
                        }
                    ],
                    "width": "245px"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "weight": "Bolder",
                            "text": "Date"
                        }
                    ],
                    "width": "auto"
                }
            ]
        }
        // ,
        // {
        //     "type": "ColumnSet",
        //     "columns": [
        //         {
        //             "type": "Column",
        //             "items": [
        //                 {
        //                     "type": "TextBlock",
        //                     "text": "1",
        //                     "wrap": true
        //                 }
        //             ],
        //             "width": "30px",
        //             "minHeight": "2px"
        //         },
        //         {
        //             "type": "Column",
        //             "spacing": "Medium",
        //             "items": [
        //                 {
        //                     "type": "TextBlock",
        //                     "text": "Approved by chris naido",
        //                     "wrap": true,
        //                     "color": "Good"
        //                 }
        //             ],
        //             "width": "245px",
        //             "backgroundImage": {
        //                 "horizontalAlignment": "Center"
        //             }
        //         },
        //         {
        //             "type": "Column",
        //             "items": [
        //                 {
        //                     "type": "TextBlock",
        //                     "text": "12-02",
        //                     "wrap": true
        //                 }
        //             ],
        //             "width": "auto"
        //         }
        //     ]
        // }
    ]
    for(let i in data?.approver){
        let tableData:any = {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": i+1,
                            "wrap": true
                        }
                    ],
                    "width": "30px",
                    "minHeight": "2px"
                },
                {
                    "type": "Column",
                    "spacing": "Medium",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": data.approver[i]?.status == "Approved" ? `${data.approver[i]?.status} by ${data?.approver[i]?.actionBy}` : `${data.approver[i]?.status} from ${data?.approver[i]?.actionBy}`,
                            "wrap": true,
                            "color": data.approver[i]?.status == "Approved" ? "Good" : "Warning"
                        }
                    ],
                    "width": "245px",
                    "backgroundImage": {
                        "horizontalAlignment": "Center"
                    }
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": data?.approver[i]?.date,
                            "wrap": true
                        }
                    ],
                    "width": "auto"
                }
            ]
        }
        newData.push(tableData)

    }

    return newData
}