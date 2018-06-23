import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title:string;
  collapsed = true;
     
  constructor() {
    this.title = 'Personal Finance';
  }
  toggleNavBar(): void {
    this.collapsed = !this.collapsed;
  }
  
  ngOnInit() {
    
  }

}
