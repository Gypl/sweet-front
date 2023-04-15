import { IOrderedConfectionery } from "./orderedConfectionery"

export interface IOrders {
    id: number
    orderNumber: number
    orderedConfectioneries: {
        [index: number]: IOrderedConfectionery
    }
    startReady: boolean
    serveReady: boolean
    candyShopId:number
}