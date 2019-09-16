import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private routes: Router) { }

  ngOnInit() {
  }

  submitLogout(){
    localStorage.removeItem('token');
    this.routes.navigate(['home/agent-login']);
  }

}
