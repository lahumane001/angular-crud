import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserDataService } from '../shared/userService.service';
import { UserDataType } from '../shared/userModel.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{
  // val!:UserDataType[];
  val:any;
  userData!:UserDataType;
  // userData:any;
  editFormData !:FormGroup;
  constructor(private activateroute : ActivatedRoute , private userServ : UserDataService,private route : Router){}
  
  ngOnInit(): void {
    this.editFormData = new FormGroup({
      fName : new FormControl('', Validators.required),
      lName : new FormControl('' , Validators.required),
      email : new FormControl('' , Validators.required),
      age : new FormControl('', Validators.required),
    });

    this.userServ.getData().subscribe((res=>{
      this.userData = res.filter((res:any)=>{
        return res.id == this.val.id
      })
      console.log(this.userData)
    }))
    this.activateroute.params.subscribe((param:Params)=>{
      this.val = param;
      console.log(this.val.id)
    })
this.editFormData.setValue({
  fName : this.userData.fName,
  lName : this.userData.lName,
  email : this.userData.email,
  age : this.userData.age
})
    // this.activateroute.queryParams.subscribe((param:Params)=>{
    //   // console.log(param);
    //   // this.userData = param
    //   // this.editFormData.patchValue(param)
    //   // console.log('query params',abc)
    //   // console.log(this.userData)
      
    // })
  

    
  }
  OnUpdate(){
    // this.userServ.updateuser(this.editData).subscribe(res=>{
    //   console.log(res)
      
    // })
    // console.log(this.editData.value)
    // this.route.navigate([''])
  }
}
