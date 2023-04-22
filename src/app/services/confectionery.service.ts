import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Confectionery } from "../models/confectionery";

@Injectable()
export class ConfectioneryService {

    private url = "http://localhost:8080//api//";
    private chosenConfectioneryId: number = -1;
    private chosenShopName: string = ""
    constructor(private http: HttpClient) { }

    getConfectionerys() {
        return this.http.get<Array<Confectionery>>(this.url + this.chosenShopName + '//confectionery');
    }
    getConfectionerysByShop() {
        return this.http.get<Confectionery>(this.url + this.chosenShopName + '//confectionery//shop//');
    }

    createConfectionery(confectionery: Confectionery) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<Confectionery>(this.url + this.chosenShopName + '//confectionery//create', JSON.stringify(confectionery), { headers: myHeaders });
    }
    updateConfectionery(confectionery: Confectionery) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<Confectionery>(this.url + this.chosenShopName + '//confectionery//update', JSON.stringify(confectionery), { headers: myHeaders });
    }
    deleteConfectionery(id_: number) {
        return this.http.delete<Confectionery>(this.url + this.chosenShopName + '//confectionery//delete//' + id_);
    }
    countConfectionerys() {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<Confectionery>(this.url + this.chosenShopName + "//confectionery//count", JSON.stringify(""), { headers: myHeaders });
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
}