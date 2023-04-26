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
        return this.http.post<Orders>(this.url + this.chosenShopName + '/orders/create' , (orders)  );
    }
    updateOrders(orders: Orders) {
        return this.http.put<Orders>(this.url + this.chosenShopName + '/orders/update' , (orders)  );
    }
    deleteOrders(id_: number) {
        return this.http.delete<Orders>(this.url + this.chosenShopName + '/orders/delete/' + id_);
    }
    countOrderss() {
        return this.http.post<Orders>(this.url + this.chosenShopName + "/orders/count" , ("")  );
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
