import { Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/models/orders';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { OrdersService } from 'src/app/services/orders.service';
import { switchOnOffService } from 'src/app/services/switchOnOff.service';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.scss']
})
export class OrdersOverviewComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate!: TemplateRef<any> | null;
  @ViewChild('editTemplate', { static: false })
  editTemplate!: TemplateRef<any> | null;

  public editedOrders: Orders = new Orders(0, 0, [], false, false, 0)
  orderss: Array<Orders>
  isNewRecord: boolean = false
  statusMessage: string = ""
  @Input()
  onOff: boolean = false

  constructor(private serv: OrdersService, private servShop: CandyShopService, private servSwitch: switchOnOffService) {
    this.orderss = new Array<Orders>()
    serv.setShopName(servShop.getShopName());
  }

  ngOnInit() {
    this.loadOrderss()
  }

  //Загрузка студентов
  private loadOrderss() {
    if (this.servSwitch.onOff ) {
      this.serv.getOrderssByShop().subscribe((data: Array<Orders>) => {
        this.orderss = data
      })
    } else {
      this.serv.getOrderss().subscribe((data: Array<Orders>) => {
        this.orderss = data
      })
    }
  }

  // добавление пользователя
  addOrders() {
    this.editedOrders = new Orders(0, 0, [], false, false, 0);
    if (this.isNewRecord === false)
      this.orderss.push(this.editedOrders);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editOrders(orders: Orders) {
    this.editedOrders = new Orders(orders.id, orders.orderNumber, orders.orderedConfectioneries, orders.startReady, orders.serveReady, orders.candyShopId);
  }
  // загружаем один из двух шаблонов
  loadTemplate(orders: Orders) {
    if (this.editedOrders && this.editedOrders.id === orders.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveOrders() {
    if (this.isNewRecord) {
      // добавляем пользователя
      try {
        this.serv.createOrders(this.editedOrders as Orders).subscribe(_ => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadOrderss();
        });
        this.isNewRecord = false;
        this.editedOrders = new Orders(0, 0, [], false, false, 0);
      } catch (e) {
        console.log(e);
      }
    } else {
      // изменяем пользователя
      this.serv.updateOrders(this.editedOrders as Orders).subscribe(_ => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadOrderss();
      });
      this.editedOrders = new Orders(0, 0, [], false, false, 0);
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.orderss.pop();
      this.isNewRecord = false;
    }
    this.editedOrders = new Orders(0, 0, [], false, false, 0);
  }
  // удаление пользователя
  deleteOrders(orders: Orders) {
    this.serv.deleteOrders(orders.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadOrderss();
    });
  }

  public onAdd(): void { 
    this.loadOrderss()
  }
}
