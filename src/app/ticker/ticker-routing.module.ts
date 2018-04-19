import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRouteGuardService } from '../core/auth/auth-route-guard.service';
import { TickerContainerComponent } from 'app/ticker/ticker-container/ticker-container.component';
import { TickerListComponent } from 'app/ticker/ticker-list/ticker-list.component';
import { TickerDetailComponent } from 'app/ticker/ticker-detail/ticker-detail.component';
import { NewTickerComponent } from 'app/ticker/new-ticker/new-ticker.component';

const routes:Routes = [
  {path:'',
    component:TickerContainerComponent,
    canActivate:[AuthRouteGuardService],
    children:[
      {path:'list',component:TickerListComponent},
      {path:'new',component:NewTickerComponent},
      {path:':tickercode',component:TickerDetailComponent},
      {path:'',pathMatch: 'full', redirectTo: 'list'}
    ]
  }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TickerRoutingModule { }
