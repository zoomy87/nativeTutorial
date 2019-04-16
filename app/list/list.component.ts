import { Component, OnInit } from "@angular/core";
import { Grocery } from "../shared/grocery/grocery.model";
import { GroceryService } from "../shared/grocery/grocery.service";

@Component({
    selector: "gr-list",
    templateUrl: "list/list.component.html",
    styleUrls: ["list/list.component.css"],
    providers: [GroceryService]
  })

export class ListComponent implements OnInit {
    groceryList: Array<Object> = [];

    constructor(private groceryService: GroceryService) {}

    ngOnInit(){
       this.groceryService.load()
       .subscribe(loadedGroceries => {
           loadedGroceries.forEach(groceryObject => {
               this.groceryList.unshift(groceryObject);
           });
       })
    }
}