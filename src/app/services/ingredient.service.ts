import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ingredient } from "../models/ingredient";
import { environment } from "src/environments/environment";

@Injectable()
export class IngredientService {

    private url = environment.apiUrl;
    private chosenFlowSheetId: number = -1;
    private chosenShopId: number = -1;
    private chosenShopName: string = " "
    constructor(private http: HttpClient) { }

    getIngredients() {
        return this.http.get<Array<Ingredient>>(this.url + this.chosenShopName + '/ingredient');
    }
    getIngredientsByFlowSheetId() {
        return this.http.get<Array<Ingredient>>(this.url + this.chosenShopName + '/ingredient/' + this.chosenFlowSheetId);
    }

    createIngredient(ingredient: Ingredient) {
        return this.http.post<Ingredient>(this.url + this.chosenShopName + '/ingredient/' + this.chosenFlowSheetId + '/create' , (ingredient)  );
    }
    updateIngredient(ingredient: Ingredient) {
        console.log(this.chosenFlowSheetId);

        return this.http.put<Ingredient>(this.url + this.chosenShopName + '/ingredient/update' , (ingredient)  );
    }
    deleteIngredient(id_: number) {
        return this.http.delete<Ingredient>(this.url + this.chosenShopName + '/ingredient/delete/' + id_);
    }
    countIngredients() {
        return this.http.post<Ingredient>(this.url + this.chosenShopName + "/ingredient/count" , ("")  );
    }

    getShopName() {
        return this.chosenShopName;
    }
    setShopName(shopName_: string) {
        this.chosenShopName = shopName_;
    }

    getFlowSheetId() {
        return this.chosenFlowSheetId;
    }
    setFlowSheetId(id_: number) {
        this.chosenFlowSheetId = id_;
    }
    getShopId() {
        return this.chosenShopId;
    }
    setShopId(id_: number) {
        this.chosenShopId = id_;
    }
}
