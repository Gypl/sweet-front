import { Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CandyShop } from 'src/app/models/candyShop';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { switchOnOffService } from 'src/app/services/switchOnOff.service';

@Component({
  selector: 'app-candy-shop-overview',
  templateUrl: './candy-shop-overview.component.html',
  styleUrls: ['./candy-shop-overview.component.scss']
})
export class CandyShopOverviewComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate!: TemplateRef<any> | null;
  @ViewChild('editTemplate', { static: false })
  editTemplate!: TemplateRef<any> | null;

  public editedCandyShop: CandyShop = new CandyShop(0, "", [], [], [], [], [])
  candyShops: Array<CandyShop>
  currentCandyShop: CandyShop = new CandyShop(0, "", [], [], [], [], [])
  isNewRecord: boolean = false
  statusMessage: string = ""
  @Input()
  onOff: boolean = false

  constructor(private serv: CandyShopService, private servSwitch: switchOnOffService) {
    this.candyShops = new Array<CandyShop>()
  }

  ngOnInit() {
    this.loadCandyShops()
  }

  //Загрузка студентов
  private loadCandyShops() {
    this.serv.getCandyShops().subscribe((data: Array<CandyShop>) => {
      this.candyShops = data
    })
  }

  // добавление пользователя
  addCandyShop() {
    this.editedCandyShop = new CandyShop(0, "", [], [], [], [], []);
    if (this.isNewRecord === false)
      this.candyShops.push(this.editedCandyShop);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editCandyShop(candyShop: CandyShop) {
    this.editedCandyShop = new CandyShop(candyShop.id, candyShop.name, candyShop.flowSheets, candyShop.resources, candyShop.confectioneries, candyShop.purchases, candyShop.orders);
  }
  // загружаем один из двух шаблонов
  loadTemplate(candyShop: CandyShop) {
    if (this.editedCandyShop && this.editedCandyShop.id === candyShop.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveCandyShop() {
    if (this.isNewRecord) {
      // добавляем пользователя
      try {
        this.serv.createCandyShop(this.editedCandyShop as CandyShop).subscribe(_ => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadCandyShops();
        });
        this.isNewRecord = false;
        this.editedCandyShop = new CandyShop(0, "", [], [], [], [], []);
      } catch (e) {
        console.log(e);
      }
    } else {
      // изменяем пользователя
      this.serv.updateCandyShop(this.editedCandyShop as CandyShop).subscribe(_ => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadCandyShops();
      });
      this.editedCandyShop = new CandyShop(0, "", [], [], [], [], []);
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.candyShops.pop();
      this.isNewRecord = false;
    }
    this.editedCandyShop = new CandyShop(0, "", [], [], [], [], []);
  }
  // удаление пользователя
  deleteCandyShop(candyShop: CandyShop) {
    this.serv.deleteCandyShop(candyShop.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadCandyShops();
    });
  }

  public onAdd(): void {
    this.loadCandyShops()
  }
}
