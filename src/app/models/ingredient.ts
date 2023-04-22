export class Ingredient {
    id: number
    amount: number
    dimension: string
    flowShteetId: number
    ingredientName: string

    constructor(id_: number, amount_: number, dimension_: string, flowShteetId_: number, ingredientName_: string) {
        this.id = id_
        this.amount = amount_
        this.dimension = dimension_
        this.flowShteetId = flowShteetId_
        this.ingredientName = ingredientName_
    }
}