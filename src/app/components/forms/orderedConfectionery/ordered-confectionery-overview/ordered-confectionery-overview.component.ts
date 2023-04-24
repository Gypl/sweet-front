import { Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OrderedConfectionery } from 'src/app/models/orderedConfectionery';
import { CandyShopService } from 'src/app/services/candyShop.service';
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

  public editedOrderedConfectionery: OrderedConfectionery = new OrderedConfectionery(0, "", 0, 0)
  orderedConfectionerys: Array<OrderedConfectionery>
  isNewRecord: boolean = false
  statusMessage: string = ""
  @Input()
  onOff: boolean = false

  constructor(private serv: OrderedConfectioneryService, private servShop: CandyShopService, private servSwitch: switchOnOffService) {
    this.orderedConfectionerys = new Array<OrderedConfectionery>()
    serv.setShopName(servShop.getShopName());
  }

  ngOnInit() {
    this.loadOrderedConfectionerys()
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

  public onAdd(): void {
    this.loadOrderedConfectionerys()
  }
}
