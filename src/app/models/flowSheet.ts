import { Ingredient } from "./ingredient"

export class FlowSheet {
    id: number
    confectioneryName: string
    ingredients: Ingredient[]
    candyShopId: number

    constructor(id_: number, confectioneryName_: string, ingredients_: Ingredient[], candyShopId_: number) {
        console.log(ingredients_);
        
        this.id = id_
        this.confectioneryName = confectioneryName_
        this.ingredients = ingredients_
        this.candyShopId = candyShopId_
    }
}