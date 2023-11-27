import { Component, OnInit } from '@angular/core';
import { UserDataType } from '../shared/userModel.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../shared/userService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit{
id:any;
userFormData !: FormGroup;
constructor(private userserv : UserDataService , private router : Router){}

ngOnInit(): void {

    this.userFormData = new FormGroup({
      fName : new FormControl('' , [Validators.required , Validators.min(5)]),
      lName : new FormControl('' , [Validators.required , Validators.min(5)]),
      email : new FormControl('' , [Validators.required , Validators.email]),
      age : new FormControl(null , [Validators.required] ),
    })
}
onSubmit(){
  const newObj= {
    
    fName : this.userFormData.value.fName,
    lName : this.userFormData.value.lName,
    email : this.userFormData.value.email,
    age : this.userFormData.value.age,

  }
  this.userserv.postData(newObj).subscribe((res =>{
    console.log(res)
   
    this.userserv.getData().subscribe(res=>{
      console.log(res)
    })
  }))
  this.router.navigate([''])
}
}
