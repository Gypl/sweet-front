export class Purchase {
    id: number
    name: string
    amount: number
    dimension: string
    candyShopId: number

    constructor(id_: number, name_: string, amount_: number, dimension_: string, candyShopId_: number) {
        this.id = id_
        this.name = name_
        this.amount = amount_
        this.dimension = dimension_
        this.candyShopId = candyShopId_
    }
}