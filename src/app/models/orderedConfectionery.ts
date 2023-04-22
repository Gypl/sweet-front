export class OrderedConfectionery {
    id: number
    confectioneryName: string
    number: number
    ordersId: number

    constructor(id_: number, confectioneryName_: string, number_: number, ordersId: number) {
        this.id = id_
        this.confectioneryName = confectioneryName_
        this.number = number_
        this.ordersId = ordersId
    }
}