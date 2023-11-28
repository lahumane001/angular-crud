import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { UserDataService } from '../shared/userService.service';
import { UserDataType } from '../shared/userModel.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit , OnDestroy{
userSubscription : Subscription|undefined
allUserData!:UserDataType[];  
  constructor(private userServ : UserDataService ,private route : Router){}
  
  
  ngOnInit(): void {
  this.fetchData()
  }
  fetchData(){
  this.userSubscription = this.userServ.getData().subscribe((res =>{
      console.log(res)
      this.allUserData = res;
     }))
  }

  OnDelete(id:number){
    this.userSubscription = this.userServ.deleteUser(id).subscribe(()=>{
      console.log('delete this user')
      this.fetchData()
    })

 console.log(id)
  }

  editData(id : number){
    // console.log(id)
    // this.userServ.getDataById(id).subscribe((res) => {
    //   console.log(res)
    //   // this.route.navigate(['edit' , res])
    // })

  }
  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription?.unsubscribe();
    }
  }
}
