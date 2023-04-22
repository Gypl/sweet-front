import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderedConfectionery } from "../models/orderedConfectionery";

@Injectable()
export class OrderedConfectioneryService {

    private url = "http://localhost:8080//api//";
    private chosenOrderId: number = -1;
    private chosenShopName: string = ""
    constructor(private http: HttpClient) { }

    getOrderedConfectionerys() {
        return this.http.get<Array<OrderedConfectionery>>(this.url + this.chosenShopName + '//orderedConfectionery');
    }
    getOrderedConfectionerysByShop() {
        return this.http.get<OrderedConfectionery>(this.url + this.chosenShopName + '//orderedConfectionery//' + this.chosenOrderId);
    }

    createOrderedConfectionery(orderedConfectionery: OrderedConfectionery) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<OrderedConfectionery>(this.url + this.chosenShopName + '//orderedConfectionery//' + this.chosenOrderId + '//create', JSON.stringify(orderedConfectionery), { headers: myHeaders });
    }
    updateOrderedConfectionery(orderedConfectionery: OrderedConfectionery) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<OrderedConfectionery>(this.url + this.chosenShopName + '//orderedConfectionery//update', JSON.stringify(orderedConfectionery), { headers: myHeaders });
    }
    deleteOrderedConfectionery(id_: number) {
        return this.http.delete<OrderedConfectionery>(this.url + this.chosenShopName + '//orderedConfectionery//delete//' + id_);
    }
    countOrderedConfectionerys() {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<OrderedConfectionery>(this.url + this.chosenShopName + "//orderedConfectionery//count", JSON.stringify(""), { headers: myHeaders });
    }

    getShopName() {
        return this.chosenShopName;
    }
    setShopName(shopName_: string) {
        this.chosenShopName = shopName_;
    }

    getOrderedConfectioneryId() {
        return this.chosenOrderId;
    }
    setOrderedConfectioneryId(id_: number) {
        this.chosenOrderId = id_;
    }
}