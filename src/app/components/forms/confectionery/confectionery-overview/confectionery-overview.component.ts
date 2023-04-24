import { Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CandyShop } from 'src/app/models/candyShop';
import { Confectionery } from 'src/app/models/confectionery';
import { FlowSheet } from 'src/app/models/flowSheet';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { ConfectioneryService } from 'src/app/services/confectionery.service';
import { FlowSheetService } from 'src/app/services/flowSheet.service';
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

  @ViewChild('dropTemplate', { static: false })
  dropTemplate!: TemplateRef<any> | null;

  public editedConfectionery: Confectionery = new Confectionery(0, "", 0, 0)
  confectionerys: Array<Confectionery>
  flowSheets: Array<FlowSheet>
  isNewRecord: boolean = false
  statusMessage: string = ""
  chosenNameFS: string = ""

  constructor(private serv: ConfectioneryService, private servFS: FlowSheetService, private servShop: CandyShopService, private servSwitch: switchOnOffService) {
    this.confectionerys = new Array<Confectionery>()
    this.flowSheets = new Array<FlowSheet>()
    serv.setShopName(servShop.getShopName());
  }

  ngOnInit() {
    this.loadConfectionerys()
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

  //Загрузка изделий
  private loadConfectionerys() {
    if (this.servSwitch.onOff) {
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

  // выбрана кондитерская
  chosenFlowSheet(flowSheet: FlowSheet) {
    this.chosenNameFS = flowSheet.confectioneryName;
    this.editedConfectionery.confectioneryName = this.chosenNameFS;
  }

  setShopId(confectionery: Confectionery) {
    this.serv.setShopId(confectionery.candyShopId);
  }

  public onAdd(): void {
    this.loadConfectionerys()
  }
}
