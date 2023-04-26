import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderedConfectionery } from "../models/orderedConfectionery";
import { environment } from "src/environments/environment";

@Injectable()
export class OrderedConfectioneryService {

    private url = environment.apiUrl;
    private chosenOrderId: number = -1;
    private chosenShopName: string = " "
    constructor(private http: HttpClient) { }

    getOrderedConfectionerys() {
        return this.http.get<Array<OrderedConfectionery>>(this.url + this.chosenShopName + '/orderedConfectionery');
    }
    getOrderedConfectionerysByOrders() {
        return this.http.get<Array<OrderedConfectionery>>(this.url + this.chosenShopName + '/orderedConfectionery/' + this.chosenOrderId);
    }

    createOrderedConfectionery(orderedConfectionery: OrderedConfectionery) {
        return this.http.post<OrderedConfectionery>(this.url + this.chosenShopName + '/orderedConfectionery/' + this.chosenOrderId + '/create' , (orderedConfectionery)  );
    }
    updateOrderedConfectionery(orderedConfectionery: OrderedConfectionery) {
        return this.http.put<OrderedConfectionery>(this.url + this.chosenShopName + '/orderedConfectionery/update' , (orderedConfectionery)  );
    }
    deleteOrderedConfectionery(id_: number) {
        return this.http.delete<OrderedConfectionery>(this.url + this.chosenShopName + '/orderedConfectionery/delete/' + id_);
    }
    countOrderedConfectionerys() {
        return this.http.post<OrderedConfectionery>(this.url + this.chosenShopName + "/orderedConfectionery/count" , ("")  );
    }

    getShopName() {
        return this.chosenShopName;
    }
    setShopName(shopName_: string) {
        this.chosenShopName = shopName_;
    }

    getOrderId() {
        return this.chosenOrderId;
    }
    setOrderId(id_: number) {
        this.chosenOrderId = id_;
    }
}
