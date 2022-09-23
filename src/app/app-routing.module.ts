import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {LogonComponent} from "./logon/logon.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {AuthenticationGuard} from "./guards/authentification.guard";

const routes: Routes = [

      { path :"customers",component :CustomersComponent},
      { path :"accounts",component :AccountsComponent },
  { path :"admin",component :NavbarComponent,canActivate :[AuthenticationGuard], children:[
  { path :"",component :LogonComponent},
  { path :"logon",component :LogonComponent},
  { path :"new-customer",component :NewCustomerComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
