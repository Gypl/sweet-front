import { IConfectionery } from "./confectionery"
import { IFlowSheet } from "./flowSheet"
import { IOrders } from "./orders"
import { IPurchase } from "./purchase"
import { IResource } from "./resource"

export interface ICandyShop {
    id: number
    name: string
    flowSteets: {
        [index: number]: IFlowSheet
    }
    resources: {
        [index: number]: IResource
    }
    confectioneries: {
        [index: number]: IConfectionery
    }
    purchases: {
        [index: number]: IPurchase
    }
    orders: {
        [index: number]: IOrders
    }
}