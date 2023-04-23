import { Ingredient } from "./ingredient"

export class FlowSheet {
    id: number
    confectioneryName: string
    ingredients: Ingredient[]
    candyShopId: number

    constructor(id_: number, confectioneryName_: string, ingredients_: { [index: number]: Ingredient }, candyShopId_: number) {
        this.id = id_
        this.confectioneryName = confectioneryName_
        this.ingredients = JSON.parse(JSON.stringify(ingredients_))
        this.candyShopId = candyShopId_
    }
}