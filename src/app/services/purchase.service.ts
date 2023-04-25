import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Purchase } from "../models/purchase";
import { environment } from "src/environments/environment";

@Injectable()
export class PurchaseService {

    private url = environment.apiUrl;
    private chosenPurchaseId: number = -1;
    private chosenShopName: string = " "
    constructor(private http: HttpClient) { }

    getPurchases() {
        return this.http.get<Array<Purchase>>(this.url + this.chosenShopName + '/purchase');
    }
    getPurchasesByShop() {
        return this.http.get<Array<Purchase>>(this.url + this.chosenShopName + '/purchase/shop');
    }

    createPurchase(purchase: Purchase) {
        if (this.chosenShopName === " ") throw '404';
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<Purchase>(this.url + this.chosenShopName + '/purchase/create', JSON.stringify(purchase), { headers: myHeaders });
    }
    updatePurchase(purchase: Purchase) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<Purchase>(this.url + this.chosenShopName + '/purchase/update', JSON.stringify(purchase), { headers: myHeaders });
    }
    deletePurchase(id_: number) {
        return this.http.delete<Purchase>(this.url + this.chosenShopName + '/purchase/delete/' + id_);
    }
    countPurchases() {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<Purchase>(this.url + this.chosenShopName + "/purchase/count", JSON.stringify(""), { headers: myHeaders });
    }

    getShopName() {
        return this.chosenShopName;
    }
    setShopName(shopName_: string) {
        this.chosenShopName = shopName_;
    }

    getPurchaseId() {
        return this.chosenPurchaseId;
    }
    setPurchaseId(id_: number) {
        this.chosenPurchaseId = id_;
    }
}