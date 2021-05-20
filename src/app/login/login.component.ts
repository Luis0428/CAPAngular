import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {
    this.formLogin = this.formBuilder.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
  }

  login(): void{
    const username = this.formLogin.get("username")?.value;
    const password = this.formLogin.get("password")?.value;

    const data = {
      email: username,
      password: password
    } as LoginRequest;

    console.log(data);
  }

}
