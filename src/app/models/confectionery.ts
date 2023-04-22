export class Confectionery {
    id: number
    confectioneryName: string
    number: number
    candyShopId: number

    constructor(id_: number, confectioneryName_: string, number_: number, candyShopId_: number) {
        this.id = id_
        this.confectioneryName = confectioneryName_
        this.number = number_
        this.candyShopId = candyShopId_
    }
}