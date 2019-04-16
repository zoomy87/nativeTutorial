import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Config } from "../config";
import { Grocery } from "./grocery.model";

@Injectable()
export class GroceryService {
    baseUrl = Config.apiUrl + "appdata/" + Config.appKey + "/Groceries";

    constructor(private http: Http) { }

    load() {
        // Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.
        let params = new URLSearchParams();
        params.append("sort", "{\"_kmd.lmt\": 1}");

        return this.http.get(this.baseUrl, {
            headers: this.getCommonHeaders(),
            params: params
        }).pipe(
            map(res => res.json()),
            map(data => {
                let groceryList = [];
                data.forEach((grocery) => {
                    groceryList.push(new Grocery(grocery._id, grocery.Name));
                });
                return groceryList;
            }),
            catchError(this.handleErrors)
        );
    }

    getCommonHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Kinvey " + Config.token);
        return headers;
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}