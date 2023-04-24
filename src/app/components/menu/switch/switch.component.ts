import { Component, EventEmitter, Output } from '@angular/core';
import { CandyShop } from 'src/app/models/candyShop';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { switchOnOffService } from 'src/app/services/switchOnOff.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  shopName: string = " "
  oooN: boolean = false
  @Output() buttonClick = new EventEmitter();

  constructor(private serv: CandyShopService, private swServ: switchOnOffService) {
    this.shopName = serv.getShopName();
    this.oooN = this.swServ.onOff;
  }

  public add(): void {
    this.swServ.onOff 
    if (this.swServ.onOff ) {
      this.swServ.onOff  = false
    } else this.swServ.onOff  = true
    this.buttonClick.emit();
  }
}
