import { Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Confectionery } from 'src/app/models/confectionery';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { ConfectioneryService } from 'src/app/services/confectionery.service';
import { switchOnOffService } from 'src/app/services/switchOnOff.service';

@Component({
  selector: 'app-confectionery-overview',
  templateUrl: './confectionery-overview.component.html',
  styleUrls: ['./confectionery-overview.component.scss']
})
export class ConfectioneryOverviewComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate!: TemplateRef<any> | null;
  @ViewChild('editTemplate', { static: false })
  editTemplate!: TemplateRef<any> | null;

  public editedConfectionery: Confectionery = new Confectionery(0, "", 0, 0)
  confectionerys: Array<Confectionery>
  isNewRecord: boolean = false
  statusMessage: string = ""
  @Input()
  onOff: boolean = false

  constructor(private serv: ConfectioneryService, private servShop: CandyShopService, private servSwitch: switchOnOffService) {
    this.confectionerys = new Array<Confectionery>()
    serv.setShopName(servShop.getShopName());
  }

  ngOnInit() {
    this.loadConfectionerys()
  }

  //Загрузка студентов
  private loadConfectionerys() {
    if (this.servSwitch.onOff ) {
      this.serv.getConfectionerysByShop().subscribe((data: Array<Confectionery>) => {
        this.confectionerys = data
      })
    } else {
      this.serv.getConfectionerys().subscribe((data: Array<Confectionery>) => {
        this.confectionerys = data
      })
    }
  }

  // добавление пользователя
  addConfectionery() {
    this.editedConfectionery = new Confectionery(0, "", 0, 0);
    if (this.isNewRecord === false)
      this.confectionerys.push(this.editedConfectionery);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editConfectionery(confectionery: Confectionery) {
    this.editedConfectionery = new Confectionery(confectionery.id, confectionery.confectioneryName, confectionery.number, confectionery.candyShopId);
  }
  // загружаем один из двух шаблонов
  loadTemplate(confectionery: Confectionery) {
    if (this.editedConfectionery && this.editedConfectionery.id === confectionery.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveConfectionery() {
    if (this.isNewRecord) {
      // добавляем пользователя
      try {
        this.serv.createConfectionery(this.editedConfectionery as Confectionery).subscribe(_ => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadConfectionerys();
        });
        this.isNewRecord = false;
        this.editedConfectionery = new Confectionery(0, "", 0, 0);
      } catch (e) {
        console.log(e);
      }
    } else {
      // изменяем пользователя
      this.serv.updateConfectionery(this.editedConfectionery as Confectionery).subscribe(_ => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadConfectionerys();
      });
      this.editedConfectionery = new Confectionery(0, "", 0, 0);
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.confectionerys.pop();
      this.isNewRecord = false;
    }
    this.editedConfectionery = new Confectionery(0, "", 0, 0);
  }
  // удаление пользователя
  deleteConfectionery(confectionery: Confectionery) {
    this.serv.deleteConfectionery(confectionery.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadConfectionerys();
    });
  }

  public onAdd(): void { 
    this.loadConfectionerys()
  }
}
