import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlowSheet } from "../models/flowSheet";
import { environment } from "src/environments/environment";

@Injectable()
export class FlowSheetService {

    private url = environment.apiUrl;
    private chosenFlowSheetId: number = -1;
    private chosenShopName: string = " "
    constructor(private http: HttpClient) { }

    getFlowSheets() {
        return this.http.get<Array<FlowSheet>>(this.url + this.chosenShopName + '/flowSheet');
    }
    getFlowSheetsByShop() {
        return this.http.get<Array<FlowSheet>>(this.url + this.chosenShopName + '/flowSheet/shop');
    }

    createFlowSheet(flowSheet: FlowSheet) {
        if (this.chosenShopName === " ") throw '404';
        return this.http.post<FlowSheet>(this.url + this.chosenShopName + '/flowSheet/create' , (flowSheet)  );
    }
    updateFlowSheet(flowSheet: FlowSheet) {
        return this.http.put<FlowSheet>(this.url + this.chosenShopName + '/flowSheet/update' , (flowSheet)  );
    }
    deleteFlowSheet(id_: number) {
        return this.http.delete<FlowSheet>(this.url + this.chosenShopName + '/flowSheet/delete/' + id_);
    }
    countFlowSheets() {
        return this.http.post<FlowSheet>(this.url + this.chosenShopName + "/flowSheet/count" , ("")  );
    }

    getShopName() {
        return this.chosenShopName;
    }
    setShopName(shopName_: string) {
        this.chosenShopName = shopName_;
    }

    getFlowSheetId() {
        return this.chosenFlowSheetId;
    }
    setFlowSheetId(id_: number) {
        this.chosenFlowSheetId = id_;
    }
}
