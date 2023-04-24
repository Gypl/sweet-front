import { Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FlowSheet } from 'src/app/models/flowSheet';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { FlowSheetService } from 'src/app/services/flowSheet.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { switchOnOffService } from 'src/app/services/switchOnOff.service';

@Component({
  selector: 'app-flow-sheet-overview',
  templateUrl: './flow-sheet-overview.component.html',
  styleUrls: ['./flow-sheet-overview.component.scss']
})
export class FlowSheetOverviewComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate!: TemplateRef<any> | null;
  @ViewChild('editTemplate', { static: false })
  editTemplate!: TemplateRef<any> | null;

  public editedFlowSheet: FlowSheet = new FlowSheet(0, "", [], 0)
  flowSheets: Array<FlowSheet>
  isNewRecord: boolean = false
  statusMessage: string = ""
  @Input()
  onOff: boolean = false

  constructor(private serv: FlowSheetService, private servIng: IngredientService, private servShop: CandyShopService, private servSwitch: switchOnOffService) {
    this.flowSheets = new Array<FlowSheet>()
    serv.setShopName(servShop.getShopName());
  }

  ngOnInit() {
    this.loadFlowSheets()
  }

  //Загрузка студентов
  private loadFlowSheets() {
    if (this.servSwitch.onOff ) {
      this.serv.getFlowSheetsByShop().subscribe((data: Array<FlowSheet>) => {
        this.flowSheets = data
      })
    } else {
      this.serv.getFlowSheets().subscribe((data: Array<FlowSheet>) => {
        this.flowSheets = data
      })
    }
  }

  // добавление пользователя
  addFlowSheet() {
    this.editedFlowSheet = new FlowSheet(0, "", [], 0);
    if (this.isNewRecord === false)
      this.flowSheets.push(this.editedFlowSheet);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editFlowSheet(flowSheet: FlowSheet) {
    this.editedFlowSheet = new FlowSheet(flowSheet.id, flowSheet.confectioneryName, flowSheet.ingredients, flowSheet.candyShopId);
  }
  // загружаем один из двух шаблонов
  loadTemplate(flowSheet: FlowSheet) {
    if (this.editedFlowSheet && this.editedFlowSheet.id === flowSheet.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveFlowSheet() {
    if (this.isNewRecord) {
      // добавляем пользователя
      try {
        this.serv.createFlowSheet(this.editedFlowSheet as FlowSheet).subscribe(_ => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadFlowSheets();
        });
        this.isNewRecord = false;
        this.editedFlowSheet = new FlowSheet(0, "", [], 0);
      } catch (e) {
        console.log(e);
      }
    } else {
      // изменяем пользователя
      this.serv.updateFlowSheet(this.editedFlowSheet as FlowSheet).subscribe(_ => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadFlowSheets();
      });
      this.editedFlowSheet = new FlowSheet(0, "", [], 0);
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.flowSheets.pop();
      this.isNewRecord = false;
    }
    this.editedFlowSheet = new FlowSheet(0, "", [], 0);
  }
  // удаление пользователя
  deleteFlowSheet(flowSheet: FlowSheet) {
    this.serv.deleteFlowSheet(flowSheet.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadFlowSheets();
    });
  }

  setFlowSheetId(flowSheet: FlowSheet) {
    this.serv.setFlowSheetId(flowSheet.id)
    this.servIng.setFlowSheetId(flowSheet.id)
  }
  
  public onAdd(): void { 
    this.loadFlowSheets()
  }
}
