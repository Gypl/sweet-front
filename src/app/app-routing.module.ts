import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandyShopOverviewComponent } from './components/forms/candyShop/candy-shop-overview/candy-shop-overview.component';
import { ConfectioneryOverviewComponent } from './components/forms/confectionery/confectionery-overview/confectionery-overview.component';
import { FlowSheetOverviewComponent } from './components/forms/flowSheet/flow-sheet-overview/flow-sheet-overview.component';
import { IngredientOverviewComponent } from './components/forms/ingredient/ingredient-overview/ingredient-overview.component';
import { OrderedConfectioneryOverviewComponent } from './components/forms/orderedConfectionery/ordered-confectionery-overview/ordered-confectionery-overview.component';
import { OrdersOverviewComponent } from './components/forms/orders/orders-overview/orders-overview.component';
import { PurchaseOverviewComponent } from './components/forms/purchase/purchase-overview/purchase-overview.component';
import { ResourceOverviewComponent } from './components/forms/resource/resource-overview/resource-overview.component';
import { HomeComponent } from './components/menu/home/home.component';
import { PageNotFoundComponent } from './components/menu/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'candyShop', component: CandyShopOverviewComponent },
  { path: 'flowSheet', component: FlowSheetOverviewComponent },
  { path: 'flowSheet/ingredient', component: IngredientOverviewComponent },
  { path: 'confectionery', component: ConfectioneryOverviewComponent },
  { path: 'resource', component: ResourceOverviewComponent },
  { path: 'purchase', component: PurchaseOverviewComponent },
  { path: 'orders', component: OrdersOverviewComponent },
  { path: 'orders/orderedConfectionery', component: OrderedConfectioneryOverviewComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
