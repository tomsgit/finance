import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRouteGuardService } from 'app/core/auth/auth-route-guard.service';
import { AdminContainerComponent } from 'app/admin/admin-container/admin-container.component';
import { BatchLogListComponent } from 'app/admin/batch-log-list/batch-log-list.component';

const routes:Routes = [
  {path:'',
    component:AdminContainerComponent,
    canActivate:[AuthRouteGuardService],
    children:[
      {path:'batchlog',component:BatchLogListComponent},
      {path:'',pathMatch: 'full', redirectTo: 'batchlog'}
    ]
  }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
