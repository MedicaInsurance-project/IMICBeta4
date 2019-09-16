import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';



@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css']
})
export class AgentLoginComponent implements OnInit {

  login: FormGroup;

  constructor( private formBuilder: FormBuilder, private routes: Router, private _authService: AuthService) { }

  ngOnInit() {
    if(this._authService.agentLoggedIn())
      this.routes.navigate(['agent/dashboard'])

    this.login = this.formBuilder.group({
      agentUsername: ['', Validators.required],
      agentPassword: ['', Validators.required]
    });
  }

  onAgentSubmit(){
    console.log(this.login.value);
    this._authService.agentlogin(this.login.value)
      .subscribe(
        res=> {
          localStorage.setItem('token',res.token);          
          this.routes.navigate(['agent/dashboard'])
        
        },
        err=> console.log("error",err)
      )
      // this.routes.navigate(['admin/dashboard'], { replaceUrl: true });

  }

  }


