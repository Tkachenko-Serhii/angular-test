import { Component, Input } from "@angular/core";
import { ICurrency } from "../../models/currency";

@Component({
    selector: "app-header",
    templateUrl: './header.component.html'
})

export class HeaderComponent{
    @Input() currencies: ICurrency;
};
