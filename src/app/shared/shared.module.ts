import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TickerTypeaheadComponent } from './ticker-typeahead/ticker-typeahead.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AuthNavBarComponent } from 'app/shared/auth-nav-bar/auth-nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild([])
  ],
  declarations: [
    NavbarComponent,
    AuthNavBarComponent,
    TickerTypeaheadComponent
  ],
  exports:[
    NavbarComponent,
    TickerTypeaheadComponent
  ]
})
export class SharedModule { }
