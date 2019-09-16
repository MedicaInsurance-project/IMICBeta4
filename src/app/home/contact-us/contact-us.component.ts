import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contact: FormGroup;

  // tslint:disable-next-line:variable-name
  constructor(private formBuilder: FormBuilder, private routes: Router, private _authService: AuthService) { }

  ngOnInit() {
    this.contact = this.formBuilder.group({
      fullname : ['', Validators.required],
      email: ['', Validators.required],
      contact: [''],
      message: ['', Validators.required]

    });
  }

  submit() {
    this._authService.contactlogin(this.contact.value)
    .subscribe(res => {
      alert('submitted');
    });
      }



}
