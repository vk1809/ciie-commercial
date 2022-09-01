import { IGlobalSvc } from "./IGlobalSvc";

export class GlobalSvc implements IGlobalSvc {
    public async getAllColumns(graphClient: any) {
        const sites = await graphClient.api("/sites/00b8cf0a-6443-4d7a-8c1f-9d1538c6a061/lists/aa367958-f2c6-49b3-b994-5e7057a1bd35/items?expand=fields").get();
        console.table(sites);
    }
}