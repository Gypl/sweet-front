import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CandyShopService } from './services/candyShop.service';
import { ConfectioneryService } from './services/confectionery.service';
import { FlowSheetService } from './services/flowSheet.service';
import { IngredientService } from './services/ingredient.service';
import { OrderedConfectioneryService } from './services/orderedConfectionery.service';
import { OrdersService } from './services/orders.service';
import { PurchaseService } from './services/purchase.service';
import { ResourceService } from './services/resource.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/menu/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/menu/sidebar/sidebar.component';
import { FlowSheetOverviewComponent } from './components/forms/flowSheet/flow-sheet-overview/flow-sheet-overview.component';
import { IngredientOverviewComponent } from './components/forms/ingredient/ingredient-overview/ingredient-overview.component';
import { ConfectioneryOverviewComponent } from './components/forms/confectionery/confectionery-overview/confectionery-overview.component';
import { OrderedConfectioneryOverviewComponent } from './components/forms/orderedConfectionery/ordered-confectionery-overview/ordered-confectionery-overview.component';
import { OrdersOverviewComponent } from './components/forms/orders/orders-overview/orders-overview.component';
import { PurchaseOverviewComponent } from './components/forms/purchase/purchase-overview/purchase-overview.component';
import { ResourceOverviewComponent } from './components/forms/resource/resource-overview/resource-overview.component';
import { CandyShopOverviewComponent } from './components/forms/candyShop/candy-shop-overview/candy-shop-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SidebarComponent,
    FlowSheetOverviewComponent,
    IngredientOverviewComponent,
    ConfectioneryOverviewComponent,
    OrderedConfectioneryOverviewComponent,
    OrdersOverviewComponent,
    PurchaseOverviewComponent,
    ResourceOverviewComponent,
    CandyShopOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    CandyShopService,
    ConfectioneryService,
    FlowSheetService,
    IngredientService,
    OrderedConfectioneryService,
    OrdersService,
    PurchaseService,
    ResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
