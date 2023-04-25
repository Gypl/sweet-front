import { Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FlowSheet } from 'src/app/models/flowSheet';
import { OrderedConfectionery } from 'src/app/models/orderedConfectionery';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { FlowSheetService } from 'src/app/services/flowSheet.service';
import { OrderedConfectioneryService } from 'src/app/services/orderedConfectionery.service';
import { switchOnOffService } from 'src/app/services/switchOnOff.service';

@Component({
  selector: 'app-ordered-confectionery-overview',
  templateUrl: './ordered-confectionery-overview.component.html',
  styleUrls: ['./ordered-confectionery-overview.component.scss']
})
export class OrderedConfectioneryOverviewComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate!: TemplateRef<any> | null;
  @ViewChild('editTemplate', { static: false })
  editTemplate!: TemplateRef<any> | null;

  @ViewChild('dropTemplate', { static: false })
  dropTemplate!: TemplateRef<any> | null;

  public editedOrderedConfectionery: OrderedConfectionery = new OrderedConfectionery(0, "", 0, 0)
  orderedConfectionerys: Array<OrderedConfectionery>
  flowSheets: Array<FlowSheet>
  isNewRecord: boolean = false
  statusMessage: string = ""
  chosenNameFS: string = ""

  constructor(private serv: OrderedConfectioneryService, private servFS: FlowSheetService, private servShop: CandyShopService, private servSwitch: switchOnOffService) {
    this.orderedConfectionerys = new Array<OrderedConfectionery>()
    this.flowSheets = new Array<FlowSheet>()
    serv.setShopName(servShop.getShopName());
  }

  ngOnInit() {
    this.loadOrderedConfectionerys()
    this.loadFlowSheets()
  }

  //Загрузка рецептов
  private loadFlowSheets() {
    this.servFS.getFlowSheetsByShop().subscribe((data: Array<FlowSheet>) => {
      this.flowSheets = data
    })
    // if (!this.isNewRecord)
    //   this.servShop.getCandyShopsByShop().subscribe((data: Array<CandyShop>) => {
    //     this.flowSheets = data[0].flowSheets
    //   })
    // else
    //   this.servShop.getCandyShopsById(this.serv.getShopId()).subscribe((data: CandyShop) => {
    //     this.flowSheets = data.flowSheets
    //   })
    this.chosenNameFS = "______"
  }

  // загружаем один из двух шаблонов
  loadTemplateFS() {
    return this.dropTemplate;
  }

  //Загрузка студентов
  private loadOrderedConfectionerys() {
    this.serv.getOrderedConfectionerysByOrders().subscribe((data: Array<OrderedConfectionery>) => {
      this.orderedConfectionerys = data
    })
  }

  // добавление пользователя
  addOrderedConfectionery() {
    this.editedOrderedConfectionery = new OrderedConfectionery(0, "", 0, 0);
    if (this.isNewRecord === false)
      this.orderedConfectionerys.push(this.editedOrderedConfectionery);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editOrderedConfectionery(orderedConfectionery: OrderedConfectionery) {
    this.editedOrderedConfectionery = new OrderedConfectionery(orderedConfectionery.id, orderedConfectionery.confectioneryName, orderedConfectionery.number, orderedConfectionery.ordersId);
  }
  // загружаем один из двух шаблонов
  loadTemplate(orderedConfectionery: OrderedConfectionery) {
    if (this.editedOrderedConfectionery && this.editedOrderedConfectionery.id === orderedConfectionery.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveOrderedConfectionery() {
    if (this.isNewRecord) {
      // добавляем пользователя
      try {
        this.serv.createOrderedConfectionery(this.editedOrderedConfectionery as OrderedConfectionery).subscribe(_ => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadOrderedConfectionerys();
        });
        this.isNewRecord = false;
        this.editedOrderedConfectionery = new OrderedConfectionery(0, "", 0, 0);
      } catch (e) {
        console.log(e);
      }
    } else {
      // изменяем пользователя
      this.serv.updateOrderedConfectionery(this.editedOrderedConfectionery as OrderedConfectionery).subscribe(_ => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadOrderedConfectionerys();
      });
      this.editedOrderedConfectionery = new OrderedConfectionery(0, "", 0, 0);
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.orderedConfectionerys.pop();
      this.isNewRecord = false;
    }
    this.editedOrderedConfectionery = new OrderedConfectionery(0, "", 0, 0);
  }
  // удаление пользователя
  deleteOrderedConfectionery(orderedConfectionery: OrderedConfectionery) {
    this.serv.deleteOrderedConfectionery(orderedConfectionery.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadOrderedConfectionerys();
    });
  }
  // выбрана кондитерская
  chosenFlowSheet(flowSheet: FlowSheet) {
    this.chosenNameFS = flowSheet.confectioneryName;
    this.editedOrderedConfectionery.confectioneryName = this.chosenNameFS;
  }

  setShopId(orderedConfectionery: OrderedConfectionery) {
    this.serv.setOrderId(orderedConfectionery.ordersId);
  }

  public onAdd(): void {
    this.loadOrderedConfectionerys()
  }
}
