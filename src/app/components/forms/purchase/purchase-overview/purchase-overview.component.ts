import { Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { switchOnOffService } from 'src/app/services/switchOnOff.service';

@Component({
  selector: 'app-purchase-overview',
  templateUrl: './purchase-overview.component.html',
  styleUrls: ['./purchase-overview.component.scss']
})
export class PurchaseOverviewComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate!: TemplateRef<any> | null;
  @ViewChild('editTemplate', { static: false })
  editTemplate!: TemplateRef<any> | null;

  public editedPurchase: Purchase = new Purchase(0, "", 0, "кг", 0)
  purchases: Array<Purchase>
  isNewRecord: boolean = false
  statusMessage: string = ""
  @Input()
  onOff: boolean = false

  constructor(private serv: PurchaseService, private servShop: CandyShopService, private servSwitch: switchOnOffService) {
    this.purchases = new Array<Purchase>()
    serv.setShopName(servShop.getShopName());
  }

  ngOnInit() {
    this.loadPurchases()
  }

  //Загрузка студентов
  private loadPurchases() {
    if (this.servSwitch.onOff ) {
      this.serv.getPurchasesByShop().subscribe((data: Array<Purchase>) => {
        this.purchases = data
      })
    } else {
      this.serv.getPurchases().subscribe((data: Array<Purchase>) => {
        this.purchases = data
      })
    }
  }

  // добавление пользователя
  addPurchase() {
    this.editedPurchase = new Purchase(0, "", 0, "кг", 0);
    if (this.isNewRecord === false)
      this.purchases.push(this.editedPurchase);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editPurchase(purchase: Purchase) {
    this.editedPurchase = new Purchase(purchase.id, purchase.name, purchase.amount, purchase.dimension, purchase.candyShopId);
  }
  // загружаем один из двух шаблонов
  loadTemplate(purchase: Purchase) {
    if (this.editedPurchase && this.editedPurchase.id === purchase.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  savePurchase() {
    if (this.isNewRecord) {
      // добавляем пользователя
      try {
        this.serv.createPurchase(this.editedPurchase as Purchase).subscribe(_ => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadPurchases();
        });
        this.isNewRecord = false;
        this.editedPurchase = new Purchase(0, "", 0, "кг", 0);
      } catch (e) {
        console.log(e);
      }
    } else {
      // изменяем пользователя
      this.serv.updatePurchase(this.editedPurchase as Purchase).subscribe(_ => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadPurchases();
      });
      this.editedPurchase = new Purchase(0, "", 0, "кг", 0);
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.purchases.pop();
      this.isNewRecord = false;
    }
    this.editedPurchase = new Purchase(0, "", 0, "кг", 0);
  }
  // удаление пользователя
  deletePurchase(purchase: Purchase) {
    this.serv.deletePurchase(purchase.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadPurchases();
    });
  }

  public onAdd(): void { 
    this.loadPurchases()
  }
}
