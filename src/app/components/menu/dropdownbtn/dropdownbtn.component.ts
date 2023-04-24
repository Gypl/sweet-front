
import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CandyShop } from 'src/app/models/candyShop';
import { CandyShopService } from 'src/app/services/candyShop.service';

@Component({
  selector: 'app-dropdownbtn',
  templateUrl: './dropdownbtn.component.html',
  styleUrls: ['./dropdownbtn.component.scss']
})
export class DropdownbtnComponent  implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate!: TemplateRef<any> | null;
  @ViewChild('editTemplate', { static: false })
  editTemplate!: TemplateRef<any> | null;

  public editedCandyShop: CandyShop = new CandyShop(0, "", [], [], [], [], [])
  candyShops: Array<CandyShop>
  isNewRecord: boolean = false
  chosenName: string = "Выберите кондитерскую"
  statusMessage: string = ""

  constructor(private serv: CandyShopService) {
    this.candyShops = new Array<CandyShop>()
  }

  ngOnInit() {
    this.loadCandyShops()
  }

  //Загрузка кондитерских
  private loadCandyShops() {
    this.serv.getCandyShops().subscribe((data: Array<CandyShop>) => {
      this.candyShops = data
    })
    this.chosenName = this.serv.getShopName()
  }

  // добавление кондитерской
  addCandyShop() {
    this.editedCandyShop = new CandyShop(0, "", [], [], [], [], []);
    if (this.isNewRecord === false)
      this.candyShops.push(this.editedCandyShop);
    this.isNewRecord = true;
  }

  // редактирование кондитерской
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
  // сохраняем кондитерской
  saveCandyShop() {
    if (this.isNewRecord) {
      // добавляем кондитерской
      this.serv.createCandyShop(this.editedCandyShop as CandyShop).subscribe(_ => {
        this.statusMessage = 'Данные успешно добавлены',
          this.loadCandyShops();
      });
      this.isNewRecord = false;
      this.editedCandyShop = new CandyShop(0, "", [], [], [], [], []);
    } else {
      // изменяем кондитерской
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
  // удаление кондитерской
  deleteCandyShop(candyShop: CandyShop) {
    this.serv.deleteCandyShop(candyShop.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadCandyShops();
    });
  }
  // выбрана кондитерская
  chosenShop(candyShop: CandyShop) {
    this.serv.setShopName(candyShop.name);
    this.serv.setCandyShopId(candyShop.id);
    this.chosenName = candyShop.name;
  }
}
