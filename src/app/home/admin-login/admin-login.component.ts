import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { adminLogin } from './admin';
// import { AdminserviceService } from './adminservice.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  login: FormGroup;

  
  constructor(private formBuilder: FormBuilder, private routes: Router, private _authService: AuthService) {
    
   }

  ngOnInit() {
    this.login = this.formBuilder.group({
      seviceUsername: ['', Validators.required],
      sevicePassword: ['', Validators.required]
    });
  }
  onAdminSubmit() {
    this._authService.adminlogin(this.login.value)
      .subscribe(res => {

        this.routes.navigate(['admin/dashboard'], { replaceUrl: true });
      });
  }
}
