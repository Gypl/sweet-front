import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resource } from "../models/resource";
import { environment } from "src/environments/environment";

@Injectable()
export class ResourceService {

    private url = environment.apiUrl;
    private chosenResourceId: number = -1;
    private chosenShopName: string = " "
    constructor(private http: HttpClient) { }

    getResources() {
        return this.http.get<Array<Resource>>(this.url + this.chosenShopName + '/resource');
    }
    getResourcesByShop() {
        return this.http.get<Array<Resource>>(this.url + this.chosenShopName + '/resource/shop');
    }

    createResource(resource: Resource) {
        if (this.chosenShopName === " ") throw '404';
        return this.http.post<Resource>(this.url + this.chosenShopName + '/resource/create' , (resource)  );
    }
    updateResource(resource: Resource) {
        return this.http.put<Resource>(this.url + this.chosenShopName + '/resource/update' , (resource)  );
    }
    deleteResource(id_: number) {
        return this.http.delete<Resource>(this.url + this.chosenShopName + '/resource/delete/' + id_);
    }
    countResources() {
        return this.http.post<Resource>(this.url + this.chosenShopName + "/resource/count" , ("")  );
    }

    getShopName() {
        return this.chosenShopName;
    }
    setShopName(shopName_: string) {
        this.chosenShopName = shopName_;
    }

    getResourceId() {
        return this.chosenResourceId;
    }
    setResourceId(id_: number) {
        this.chosenResourceId = id_;
    }
}
