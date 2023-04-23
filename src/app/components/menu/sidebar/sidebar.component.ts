import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  candyShopActive: string = 'nav-link text-white'
  flowSheetActive: string = 'nav-link text-white'
  confectioneryActive: string = 'nav-link text-white'
  resourceActive: string = 'nav-link text-white'
  purchaseActive: string = 'nav-link text-white'
  ordersActive: string = 'nav-link text-white'
  homeActive: string = 'nav-link text-white'

  mouseInShop() {
    this.candyShopActive = 'nav-link text-black'
    this.flowSheetActive = 'nav-link text-white'
    this.confectioneryActive = 'nav-link text-white'
    this.resourceActive = 'nav-link text-white'
    this.purchaseActive = 'nav-link text-white'
    this.ordersActive = 'nav-link text-white'
    this.homeActive = 'nav-link text-white'
  }
  mouseOutShop() {
    this.candyShopActive = 'nav-link text-white'
  }
  
  mouseInFlowSheet() {
    this.flowSheetActive = 'nav-link text-black'
  }
  mouseOutFlowSheet() {
    this.flowSheetActive = 'nav-link text-white'
  }
  
  mouseInConfectionery() {
    this.confectioneryActive = 'nav-link text-black'
  }
  mouseOutConfectionery() {
    this.confectioneryActive = 'nav-link text-white'
  }
  mouseInResource() {
    this.resourceActive = 'nav-link text-black'
  }
  mouseOutResource() {
    this.resourceActive = 'nav-link text-white'
  }
  mouseInPurchase() {
    this.purchaseActive = 'nav-link text-black'
  }
  mouseOutPurchase() {
    this.purchaseActive = 'nav-link text-white'
  }
  mouseInOrders() {
    this.ordersActive = 'nav-link text-black'
  }
  mouseOutOrders() {
    this.ordersActive = 'nav-link text-white'
  }
  mouseInHome() {
    this.homeActive = 'nav-link text-black'
  }
  mouseOutHome() {
    this.homeActive = 'nav-link text-white'
  }
}