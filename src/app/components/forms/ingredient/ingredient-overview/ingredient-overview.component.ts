import { Input, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient';
import { CandyShopService } from 'src/app/services/candyShop.service';
import { IngredientService } from 'src/app/services/ingredient.service';
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

  public editedIngredient: Ingredient = new Ingredient(0, 0, "кг", 0, "")
  ingredients: Array<Ingredient>
  isNewRecord: boolean = false
  statusMessage: string = ""
  @Input()
  onOff: boolean = false

  constructor(private serv: IngredientService, private servShop: CandyShopService, private servSwitch: switchOnOffService) {
    this.ingredients = new Array<Ingredient>()
    serv.setShopName(servShop.getShopName());
  }

  ngOnInit() {
    this.loadIngredients()
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

  public onAdd(): void {
    this.loadIngredients()
  }
}
