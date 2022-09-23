import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

  userFormGroup!:FormGroup;
  errorMessage :any;

  constructor(private fb:FormBuilder,
              private authService: AuthentificationService,
              private router :Router) { }

  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")

    });
  }

  handleLogin() {
    let username=this.userFormGroup.value.username;
    let password =this.userFormGroup.value.password
    this.authService.login(username,password).subscribe({
      next:(appUser)=>{
        this.authService.authenticateUser(appUser).subscribe({
          next:(data)=>{
            this.router.navigateByUrl("/admin").then(r => console.log(r));
          }
        })
      },
      error :(err)=>{
        this.errorMessage=err;
      }
    })
  }
}
