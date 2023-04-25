import { AfterViewInit, ChangeDetectorRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';
import { Resource } from 'src/app/models/resource';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ResourceService } from 'src/app/services/resource.service';
import { switchOnOffService } from 'src/app/services/switchOnOff.service';

@Component({
  selector: 'app-ingredient-overview',
  templateUrl: './ingredient-overview.component.html',
  styleUrls: ['./ingredient-overview.component.scss']
})
export class IngredientOverviewComponent implements OnInit {
  //типы шаблонов
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate!: TemplateRef<any> | null;
  @ViewChild('editTemplate', { static: false })
  editTemplate!: TemplateRef<any> | null;

  @ViewChild('dropTemplate', { static: false })
  dropTemplate!: TemplateRef<any> | null;

  public editedIngredient: Ingredient = new Ingredient(0, 0, "кг", 0, "")
  ingredients: Array<Ingredient>
  resources: Array<Resource>
  isNewRecord: boolean = false
  statusMessage: string = ""
  chosenNameR: string = ""

  constructor(private serv: IngredientService, private servR: ResourceService, private servShop: CandyShopService, private servSwitch: switchOnOffService) {
    this.ingredients = new Array<Ingredient>()
    this.resources = new Array<Resource>()
    serv.setShopName(servShop.getShopName());
  }

  ngOnInit() {
    this.loadIngredients()
    this.loadResources()
  }

  //Загрузка рецептов
  private loadResources() {
    this.servR.getResourcesByShop().subscribe((data: Array<Resource>) => {
      this.resources = data
    })
    // if (!this.isNewRecord)
    //   this.servShop.getCandyShopsByShop().subscribe((data: Array<CandyShop>) => {
    //     this.resources = data[0].resources
    //   })
    // else
    //   this.servShop.getCandyShopsById(this.serv.getShopId()).subscribe((data: CandyShop) => {
    //     this.resources = data.resources
    //   })
    this.chosenNameR = "______"
  }
  // загружаем один из двух шаблонов
  loadTemplateR() {
    return this.dropTemplate;
  }
  //Загрузка студентов
  private loadIngredients() {
    this.serv.getIngredientsByFlowSheetId().subscribe((data: Array<Ingredient>) => {
      this.ingredients = data
    })
  }

  // добавление пользователя
  addIngredient() {
    this.editedIngredient = new Ingredient(0, 0, "кг", 0, "");
    if (this.isNewRecord === false)
      this.ingredients.push(this.editedIngredient);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editIngredient(ingredient: Ingredient) {
    this.editedIngredient = new Ingredient(ingredient.id, ingredient.amount, ingredient.dimension, ingredient.flowShteetId, ingredient.ingredientName);
  }
  // загружаем один из двух шаблонов
  loadTemplate(ingredient: Ingredient) {
    if (this.editedIngredient && this.editedIngredient.id === ingredient.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveIngredient() {
    if (this.isNewRecord) {
      // добавляем пользователя
      try {
        this.serv.createIngredient(this.editedIngredient as Ingredient).subscribe(_ => {
          this.statusMessage = 'Данные успешно добавлены',
            this.loadIngredients();
        });
        this.isNewRecord = false;
        this.editedIngredient = new Ingredient(0, 0, "кг", 0, "");
      } catch (e) {
        console.log(e);
      }
    } else {
      // изменяем пользователя
      this.serv.updateIngredient(this.editedIngredient as Ingredient).subscribe(_ => {
        this.statusMessage = 'Данные успешно обновлены',
          this.loadIngredients();
      });
      this.editedIngredient = new Ingredient(0, 0, "кг", 0, "");
    }
  }
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.ingredients.pop();
      this.isNewRecord = false;
    }
    this.editedIngredient = new Ingredient(0, 0, "кг", 0, "");
  }
  // удаление пользователя
  deleteIngredient(ingredient: Ingredient) {
    this.serv.deleteIngredient(ingredient.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены',
        this.loadIngredients();
    });
  }

  // выбран ресурс
  chosenResource(resource: Resource) {
    this.chosenNameR = resource.resourceName;
    this.editedIngredient.ingredientName = this.chosenNameR;
    this.editedIngredient.dimension = resource.dimension;
  }

  setShopId(ingredient: Ingredient) {
    this.serv.setFlowSheetId(ingredient.flowShteetId);
  }
  public onAdd(): void {
    this.loadIngredients()
  }
}
