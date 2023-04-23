import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/menu/page-not-found/page-not-found.component';

const routes: Routes = [
  // { path: 'groups/edit', component: GroupStudentsDialogComponent },
  // { path: 'groups', component: GroupOverviewComponent },
  // { path: 'students', component: StudentOverviewComponent },
  // { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
