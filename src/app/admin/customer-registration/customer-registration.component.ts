import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentserviceService } from '../agentservice.service';
@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    // tslint:disable-next-line:variable-name
    private routes: Router,
    // tslint:disable-next-line:variable-name
    private _agentService: AgentserviceService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required],
      adhar: ['', [Validators.required, Validators.minLength(12)]],
      policy: ['', Validators.required],
      nominie: ['', Validators.required],
      relation: ['', Validators.required],

      // alternateEmails: this.fb.array([]),
      // acceptTerms: [false, Validators.requiredTrue]
    }, {


    });
    // tslint:disable-next-line:align




  }
  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }// display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this._agentService.registeration(this.registerForm.value)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );

   

  }


  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
