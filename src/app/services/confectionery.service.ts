import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Confectionery } from "../models/confectionery";
import {environment } from "src/environments/environment";

@Injectable()
export class ConfectioneryService {

    private url = environment.apiUrl;
    private chosenConfectioneryId: number = -1;
    private chosenShopId: number = -1;
    private chosenShopName: string = " "
    constructor(private http: HttpClient) { }

    getConfectionerys() {
        return this.http.get<Array<Confectionery>>(this.url + this.chosenShopName + '/confectionery');
    }
    getConfectionerysByShop() {
        return this.http.get<Array<Confectionery>>(this.url + this.chosenShopName + '/confectionery/shop');
    }

    createConfectionery(confectionery: Confectionery) {
        if (this.chosenShopName === " ") throw '404';
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<Confectionery>(this.url + this.chosenShopName + '/confectionery/create', JSON.stringify(confectionery), { headers: myHeaders });
    }
    updateConfectionery(confectionery: Confectionery) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<Confectionery>(this.url + this.chosenShopName + '/confectionery/update', JSON.stringify(confectionery), { headers: myHeaders });
    }
    deleteConfectionery(id_: number) {
        return this.http.delete<Confectionery>(this.url + this.chosenShopName + '/confectionery/delete/' + id_);
    }
    countConfectionerys() {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<Confectionery>(this.url + this.chosenShopName + "/confectionery/count", JSON.stringify(""), { headers: myHeaders });
    }

    getShopName() {
        return this.chosenShopName;
    }
    setShopName(shopName_: string) {
        this.chosenShopName = shopName_;
    }

    getConfectioneryId() {
        return this.chosenConfectioneryId;
    }
    setConfectioneryId(id_: number) {
        this.chosenConfectioneryId = id_;
    }
    getShopId() {
        return this.chosenShopId;
    }
    setShopId(id_: number) {
        this.chosenShopId = id_;
    }
}