import { Component, EventEmitter, Output } from '@angular/core';
import { CandyShop } from 'src/app/models/candyShop';
import { CandyShopService } from 'src/app/services/candyShop.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  shopName: string = " "
  @Output() buttonClick = new EventEmitter();
  
  constructor(private serv: CandyShopService) {
    this.shopName = serv.getShopName();
  }

  public add(): void {
    this.buttonClick.emit();
  }
}
