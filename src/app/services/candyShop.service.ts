import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CandyShop } from "../models/candyShop";
import { environment } from "src/environments/environment";

@Injectable()
export class CandyShopService {

    private url = environment.apiUrl + "candyShop";
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
        return this.http.post<CandyShop>(this.url + '/create' , (candyShop)  );
    }
    updateCandyShop(candyShop: CandyShop) {
        return this.http.put<CandyShop>(this.url + '/update' , (candyShop)  );
    }
    deleteCandyShop(id_: number) {
        return this.http.delete<CandyShop>(this.url + '/delete/' + id_);
    }
    countCandyShops() {
        return this.http.post<CandyShop>(this.url + "/count" , ("")  );
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
