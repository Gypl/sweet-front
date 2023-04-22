export class Resource {
    id: number
    resourceName: string
    amount: number
    dimension: string
    candyShopId: number

    constructor(id_: number, resourceName_: string, amount_: number, dimension_: string, candyShopId_: number) {
        this.id = id_
        this.resourceName = resourceName_
        this.amount = amount_
        this.dimension = dimension_
        this.candyShopId = candyShopId_
    }
}