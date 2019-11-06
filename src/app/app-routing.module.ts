import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdzSearchComponent } from './adzComponent/adz-search/adz-search.component';
import { AdzResultComponent } from './adzComponent/adz-result/adz-result.component';


const routes: Routes = [
  {path: '', component: AdzSearchComponent},
  {path: 'search/:query', component: AdzResultComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
