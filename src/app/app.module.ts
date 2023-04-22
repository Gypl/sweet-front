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

@NgModule({
  declarations: [
    AppComponent
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
