import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TickerRoutingModule } from './ticker-routing.module';
import { TickerListComponent } from './ticker-list/ticker-list.component';
import { TickerContainerComponent } from './ticker-container/ticker-container.component';
import { TickerDetailComponent } from './ticker-detail/ticker-detail.component';
import { NewTickerComponent } from './new-ticker/new-ticker.component';
import { TickerBreadcrumbComponent } from './ticker-breadcrumb/ticker-breadcrumb.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TickerRoutingModule
  ],
  exports:[
  ],
  declarations: [TickerListComponent, TickerContainerComponent, TickerDetailComponent, NewTickerComponent, TickerBreadcrumbComponent],
  providers:[
  ]
})
export class TickerModule { }
