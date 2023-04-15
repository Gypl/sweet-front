import { IIngredient } from "./ingredient"

export interface IFlowSheet {
    id: number
    confectioneryName: string
    ingredients: {
        [index: number]: IIngredient
    }
    candyShopId: number
}