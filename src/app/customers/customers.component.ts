import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";
import {catchError, map, Observable, throwError} from "rxjs";
import {AuthentificationService} from "../guards/authentification.service";
import {Customer} from "../model/customer.module";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!:Observable<Array<Customer>>;
  errorMessage!:string;
  searchformGroup!:FormGroup;
  constructor(private customerService:CustomerService, private fb:FormBuilder,
              public authService: AuthentificationService , private router : Router)  { }

  ngOnInit(): void {
    this.searchformGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handleSearchCustomers();
  }


  handleSearchCustomers() {
    let kw =this.searchformGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }
  handleDeleteCustomer(c: Customer) {

    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp) => {
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : err => {
        console.log(err);
      }
    })
  }
  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state :customer});
  }



}
