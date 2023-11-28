import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserDataService } from '../shared/userService.service';
import { UserDataType } from '../shared/userModel.model';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit ,OnDestroy{
  // val!:UserDataType[];
  val:any;
  userData!:UserDataType;
  userSubscription : Subscription|undefined
  editFormData !:FormGroup;
  constructor(private activateroute : ActivatedRoute , private userServ : UserDataService,private route : Router){}
  
  ngOnInit(): void {
    this.editFormData = new FormGroup({
      fName : new FormControl('', [Validators.required , Validators.minLength(3)]),
      lName : new FormControl('' , [Validators.required , Validators.minLength(3)]),
      email : new FormControl('' , [Validators.required , Validators.email]),
      age : new FormControl('', [Validators.required , Validators.min(18) , Validators.max(75)]),
    });

   this.userSubscription =  this.userServ.getData().subscribe((res=>{
      this.userData = res.find((res:any)=>{
        return res.id == this.val.id
      })
      console.log(this.userData)
      this.editFormData.patchValue(this.userData)
    }))
    this.userSubscription = this.activateroute.params.subscribe((param:Params)=>{
      this.val = param;
      console.log(this.val.id)
    })
  }
  OnUpdate(){
    this.userSubscription =  this.userServ.updateUser(this.editFormData.value ,this.val.id).subscribe(res=>{
      console.log(res)
      
    })
    console.log(this.editFormData.value)
    this.route.navigate([''])
  }
  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription?.unsubscribe();
    }
  }
}
