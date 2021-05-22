import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/login.model';
import { DataService } from '../services/data.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = this.formBuilder.group({});
  disableButton = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private dataService: DataService) {
    this.formLogin = this.formBuilder.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(3)]]
    });

    this.dataService.isLoading.subscribe(isLoading =>{
      this.disableButton = isLoading
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

    this.dataService.isLoading.next(true);

    this.loginService.login(data).subscribe((res)=>{
      this.dataService.isLoading.next(false);
      this.router.navigate(['home'])
    }, (err) =>{
      this.dataService.isLoading.next(false);
      this.dataService.message.next(err.error.error);
    });
  }

}
