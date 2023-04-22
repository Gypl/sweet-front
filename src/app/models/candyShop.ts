import { Confectionery } from "./confectionery"
import { FlowSheet } from "./flowSheet"
import { Orders } from "./orders"
import { Purchase } from "./purchase"
import { Resource } from "./resource"

export class CandyShop {
    id: number
    name: string
    flowSteets: {
        [index: number]: FlowSheet
    }
    resources: {
        [index: number]: Resource
    }
    confectioneries: {
        [index: number]: Confectionery
    }
    purchases: {
        [index: number]: Purchase
    }
    orders: {
        [index: number]: Orders
    }

    constructor(
        id_: number,
        name_: string,
        flowSteets_: { [index: number]: FlowSheet },
        resources_: { [index: number]: Resource },
        confectioneries_: { [index: number]: Confectionery },
        purchases_: { [index: number]: Purchase },
        orders_: { [index: number]: Orders }) {
            this.id = id_
            this.name = name_
            this.flowSteets = flowSteets_
            this.resources = resources_
            this.confectioneries = confectioneries_
            this.purchases = purchases_
            this.orders = orders_
    }
}