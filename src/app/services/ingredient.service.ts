import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ingredient } from "../models/ingredient";

@Injectable()
export class IngredientService {

    private url = "http://localhost:8080//api//";
    private chosenFlowSheetId: number = -1;
    private chosenShopName: string = ""
    constructor(private http: HttpClient) { }

    getIngredients() {
        return this.http.get<Array<Ingredient>>(this.url + this.chosenShopName + '//ingredient');
    }
    getIngredientsByFlowSheetId() {
        return this.http.get<Ingredient>(this.url + this.chosenShopName + '//ingredient//' + this.chosenFlowSheetId);
    }

    createIngredient(ingredient: Ingredient) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<Ingredient>(this.url + this.chosenShopName + '//ingredient//' + this.chosenFlowSheetId + '//create', JSON.stringify(ingredient), { headers: myHeaders });
    }
    updateIngredient(ingredient: Ingredient) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<Ingredient>(this.url + this.chosenShopName + '//ingredient//update', JSON.stringify(ingredient), { headers: myHeaders });
    }
    deleteIngredient(id_: number) {
        return this.http.delete<Ingredient>(this.url + this.chosenShopName + '//ingredient//delete//' + id_);
    }
    countIngredients() {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<Ingredient>(this.url + this.chosenShopName + "//ingredient//count", JSON.stringify(""), { headers: myHeaders });
    }

    getShopName() {
        return this.chosenShopName;
    }
    setShopName(shopName_: string) {
        this.chosenShopName = shopName_;
    }

    getIngredientId() {
        return this.chosenFlowSheetId;
    }
    setIngredientId(id_: number) {
        this.chosenFlowSheetId = id_;
    }
}