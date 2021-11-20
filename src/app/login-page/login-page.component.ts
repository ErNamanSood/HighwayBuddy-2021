import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { DbService } from '../db.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  uid: string = "NA";
  authForm = new FormGroup(
    {
      email: new FormControl(''),
      password: new FormControl(''),
    }
  );

  constructor(private db: DbService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(){
    const auth = getAuth();
  
    signOut(auth).then(() => {
      console.log("Sign Out Successfully");
    })
    .catch((error) => {
      console.log("Can't Sign Out");   
    });
    this.router.navigate(['/signup']);
    
    signInWithEmailAndPassword(auth, this.authForm.value.email, this.authForm.value.password)
     .then((userCredential) => {
         console.log("User Login in Auth Module");
         const user = userCredential.user;
         this.uid = userCredential.user.uid;
         this.db.SetUserLogin(true);
     })
     .catch((error) =>{
       console.log("Something Went Wrong");
     });
     this.router.navigate(['/signup']);
  }

}
