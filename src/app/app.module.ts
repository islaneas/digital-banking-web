import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomerComponent } from './services/customer/customer.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ServicesComponent } from './services/services.component';
import { LogonComponent } from './logon/logon.component';
import { GuardsComponent } from './guards/guards.component';
import { ModelComponent } from './model/model.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AccountsComponent,
    NavbarComponent,
    CustomerComponent,
    NewCustomerComponent,
    ServicesComponent,
    LogonComponent,
    GuardsComponent,
    ModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
