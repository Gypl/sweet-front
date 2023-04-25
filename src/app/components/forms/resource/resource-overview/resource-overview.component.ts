import { Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CandyShop } from 'src/app/models/candyShop';
import { Resource } from 'src/app/models/resource';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { FlowSheetService } from 'src/app/services/flowSheet.service';
import { ResourceService } from 'src/app/services/resource.service';
import { switchOnOffService } from 'src/app/services/switchOnOff.service';

@Component({
  selector: 'app-resource-overview',
  templateUrl: './resource-overview.component.html',
  styleUrls: ['./resource-overview.component.scss']
})
export class ResourceOverviewComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate!: TemplateRef<any> | null;
  @ViewChild('editTemplate', { static: false })
  editTemplate!: TemplateRef<any> | null;

  public editedResource: Resource = new Resource(0, "", 0, "кг", 0)
  resources: Array<Resource>
  isNewRecord: boolean = false
  statusMessage: string = ""
  @Input()
  onOff: boolean = false

  constructor(private serv: ResourceService, private servShop: CandyShopService, private servSwitch: switchOnOffService, private servFS: FlowSheetService) {
    this.resources = new Array<Resource>()
    serv.setShopName(servShop.getShopName());
  }

  ngOnInit() {
    this.loadResources()
  }

  //Загрузка студентов
  private loadResources() {
    if (this.servSwitch.onOff ) {
      this.serv.getResourcesByShop().subscribe((data: Array<Resource>) => {
        this.resources = data
      })
    } else {
      this.serv.getResources().subscribe((data: Array<Resource>) => {
        this.resources = data
      })
    }
  }

  // добавление пользователя
  addResource() {
    this.editedResource = new Resource(0, "", 0, "кг", 0);
    if (this.isNewRecord === false)
      this.resources.push(this.editedResource);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editResource(resource: Resource) {
    this.editedResource = new Resource(resource.id, resource.resourceName, resource.amount, resource.dimension, resource.candyShopId);
  }
  // загружаем один из двух шаблонов
  loadTemplate(resource: Resource) {
    if (this.editedResource && this.editedResource.id === resource.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveResource() {
    if (this.isNewRecord) {
      // добавляем пользователя
      try {
        this.serv.createResource(this.editedResource as Resource).subscribe(_ => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadResources();
        });
        this.isNewRecord = false;
        this.editedResource = new Resource(0, "", 0, "кг", 0);
      } catch (e) {
        console.log(e);
      }
    } else {
      // изменяем пользователя
      this.serv.updateResource(this.editedResource as Resource).subscribe(_ => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadResources();
      });
      this.editedResource = new Resource(0, "", 0, "кг", 0);
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.resources.pop();
      this.isNewRecord = false;
    }
    this.editedResource = new Resource(0, "", 0, "кг", 0);
  }
  // удаление пользователя
  deleteResource(resource: Resource) {
    this.serv.deleteResource(resource.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadResources();
    });
  }


  public onAdd(): void { 
    this.loadResources()
  }
}
