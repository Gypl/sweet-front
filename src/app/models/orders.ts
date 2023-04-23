import { OrderedConfectionery } from "./orderedConfectionery"

export class Orders {
    id: number
    orderNumber: number
    orderedConfectioneries: OrderedConfectionery[]
    startReady: boolean
    serveReady: boolean
    candyShopId: number

    constructor(id_: number, orderNumber_: number, orderConfectioneries_: OrderedConfectionery[], startReady_: boolean, serveReady_: boolean, candyShopId_: number) {
        this.id = id_
        this.orderNumber = orderNumber_
        this.orderedConfectioneries = JSON.parse(JSON.stringify(orderConfectioneries_))
        this.startReady = startReady_
        this.serveReady = serveReady_
        this.candyShopId = candyShopId_
    }
}