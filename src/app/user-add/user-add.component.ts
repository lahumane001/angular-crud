import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDataType } from '../shared/userModel.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../shared/userService.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit , OnDestroy{
  userSubscription : Subscription|undefined
userFormData !: FormGroup;
constructor(private userserv : UserDataService , private router : Router){}

ngOnInit(): void {

    this.userFormData = new FormGroup({
      fName : new FormControl('' , [Validators.required , Validators.minLength(3)]),
      lName : new FormControl('' , [Validators.required , Validators.minLength(3)]),
      email : new FormControl('' , [Validators.required , Validators.email]),
      age : new FormControl(null , [Validators.required , Validators.min(18) , Validators.max(75) ]),
    })
}
onSubmit(){
  
  this.userSubscription = this.userserv.postData(this.userFormData.value)
  .subscribe((res =>{
    console.log(res)
    
  }))
  this.router.navigate([''])
}
ngOnDestroy(): void {
  if(this.userSubscription){
    this.userSubscription?.unsubscribe();
  }
}
}
