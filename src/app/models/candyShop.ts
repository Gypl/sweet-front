import { Confectionery } from "./confectionery"
import { FlowSheet } from "./flowSheet"
import { Orders } from "./orders"
import { Purchase } from "./purchase"
import { Resource } from "./resource"

export class CandyShop {
    id: number
    name: string
    flowSheets: FlowSheet[]
    resources: Resource[]
    confectioneries: Confectionery[]
    purchases: Purchase[]
    orders: Orders[]

    constructor(
        id_: number,
        name_: string,
        flowSheets_: { [index: number]: FlowSheet },
        resources_: { [index: number]: Resource },
        confectioneries_: { [index: number]: Confectionery },
        purchases_: { [index: number]: Purchase },
        orders_: { [index: number]: Orders }) {
            this.id = JSON.parse(JSON.stringify(id_))
            this.name = JSON.parse(JSON.stringify(name_))
            this.flowSheets = JSON.parse(JSON.stringify(flowSheets_))
            this.resources = JSON.parse(JSON.stringify(resources_))
            this.confectioneries = JSON.parse(JSON.stringify(confectioneries_))
            this.purchases = JSON.parse(JSON.stringify(purchases_))
            this.orders = JSON.parse(JSON.stringify(orders_))
    }
}