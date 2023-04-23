import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlowSheet } from "../models/flowSheet";

@Injectable()
export class FlowSheetService {

    private url = "http://localhost:8080/api/";
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
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<FlowSheet>(this.url + this.chosenShopName + '/flowSheet/create', JSON.stringify(flowSheet), { headers: myHeaders });
    }
    updateFlowSheet(flowSheet: FlowSheet) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<FlowSheet>(this.url + this.chosenShopName + '/flowSheet/update', JSON.stringify(flowSheet), { headers: myHeaders });
    }
    deleteFlowSheet(id_: number) {
        return this.http.delete<FlowSheet>(this.url + this.chosenShopName + '/flowSheet/delete/' + id_);
    }
    countFlowSheets() {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<FlowSheet>(this.url + this.chosenShopName + "/flowSheet/count", JSON.stringify(""), { headers: myHeaders });
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