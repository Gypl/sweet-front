import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CandyShop } from "../models/candyShop";

@Injectable()
export class CandyShopService {

    private url = "http://localhost:8080/api/candyShop";
    private chosenCandyShopId: number = -1;
    private chosenShopName: string = "Выберите кондитерскую"
    constructor(private http: HttpClient) { }

    getCandyShops() {
        return this.http.get<Array<CandyShop>>(this.url);
    }
    getCandyShopsByShop() {
        return this.http.get<Array<CandyShop>>(this.url + '/' + this.chosenShopName);
    }
    getCandyShopsById(id_: number) {
        return this.http.get<CandyShop>(this.url + '/id/' + id_);
    }

    createCandyShop(candyShop: CandyShop) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<CandyShop>(this.url + '/create', JSON.stringify(candyShop), { headers: myHeaders });
    }
    updateCandyShop(candyShop: CandyShop) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<CandyShop>(this.url + '/update', JSON.stringify(candyShop), { headers: myHeaders });
    }
    deleteCandyShop(id_: number) {
        return this.http.delete<CandyShop>(this.url + '/delete/' + id_);
    }
    countCandyShops() {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<CandyShop>(this.url + "/count", JSON.stringify(""), { headers: myHeaders });
    }

    getShopName() {
        return this.chosenShopName;
    }
    setShopName(shopName_: string) {
        this.chosenShopName = shopName_;
    }

    getCandyShopId() {
        return this.chosenCandyShopId;
    }
    setCandyShopId(id_: number) {
        this.chosenCandyShopId = id_;
    }
}