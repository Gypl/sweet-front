import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Orders } from "../models/orders";
import { environment } from "src/environments/environment";

@Injectable()
export class OrdersService {

    private url = environment.apiUrl;
    private chosenOrdersId: number = -1;
    private chosenShopName: string = " "
    constructor(private http: HttpClient) { }

    getOrderss() {
        return this.http.get<Array<Orders>>(this.url + this.chosenShopName + '/orders');
    }
    getOrderssByShop() {
        return this.http.get<Array<Orders>>(this.url + this.chosenShopName + '/orders/shop');
    }

    createOrders(orders: Orders) {
        if (this.chosenShopName === " ") throw '404';
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<Orders>(this.url + this.chosenShopName + '/orders/create', JSON.stringify(orders), { headers: myHeaders });
    }
    updateOrders(orders: Orders) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<Orders>(this.url + this.chosenShopName + '/orders/update', JSON.stringify(orders), { headers: myHeaders });
    }
    deleteOrders(id_: number) {
        return this.http.delete<Orders>(this.url + this.chosenShopName + '/orders/delete/' + id_);
    }
    countOrderss() {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<Orders>(this.url + this.chosenShopName + "/orders/count", JSON.stringify(""), { headers: myHeaders });
    }

    getShopName() {
        return this.chosenShopName;
    }
    setShopName(shopName_: string) {
        this.chosenShopName = shopName_;
    }

    getOrdersId() {
        return this.chosenOrdersId;
    }
    setOrdersId(id_: number) {
        this.chosenOrdersId = id_;
    }
}