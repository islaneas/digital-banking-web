import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {UUID} from "angular2-uuid";
import {AppUser} from "../model/user.module";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  users:AppUser[]=[];
  autheticatedUser: AppUser| undefined;

  constructor() {
    this.users.push({userId:UUID.UUID(),username:"user1",password:"1234",roles:["USER"]});
    this.users.push({userId:UUID.UUID(),username:"user2",password:"1234",roles:["USER"]});
    this.users.push({userId:UUID.UUID(),username:"admin",password:"1234",roles:["USER","ADMIN"]});

  }

  public login(username:string,password:string):Observable<AppUser>{
    let appUser= this.users.find(u=> u.username==username);
    if(!appUser)return throwError(()=>new Error("User Not Found"));
    if(appUser.password!=password){
      return throwError(()=>new Error("Bad credentials"));
    }
    return of(appUser);
  }

  public authenticateUser(appUser:AppUser):Observable<boolean>{
    this.autheticatedUser=appUser;
    localStorage.setItem("authuser",JSON.stringify(
      {username:appUser.username,roles:appUser.roles,jwt:"JWT_TOKEN"}));
    return of(true);
  }

  public hasRole(role:string) :boolean{
    return this.autheticatedUser!.roles.includes(role);
  }

  public isAuthenticated() {
    return this.autheticatedUser!=undefined;
  }
  public logout():Observable<boolean> {
    this.autheticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }

}
