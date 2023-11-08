import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-service/login.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MemberService } from '../services/member.service';
import { Member } from '../class/member';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private memberS: MemberService
  ) {}

  ngOnInit(): void {}

  loginError = false;
  username!: string;
  password!: string;
  
  getUserId() {
    const id = localStorage.getItem('userId');
    const userId = Number(id);

    this.memberS.getMemberByUserId(userId).subscribe((data) => {
      if (data) {
        console.log(data, 'member');
        console.log(userId);
        // Save the data in localStorage
        localStorage.setItem('member', JSON.stringify(data));
        localStorage.setItem("memberId",data.memberId);

      } else {
        console.log("member doesn't exist");
        console.log(userId);
      }
    });
  }



  submitForm() {
    this.authService
      .login(this.username, this.password)
      .then((success) => {
        if (success) {

          this.getUserId();
          // Authentication successful, navigate to protected route
          this.router.navigateByUrl('/home');
        } else {
          this.loginError = true; // Set the loginError flag to true
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        this.loginError = true; // Set the loginError flag to true
      });
  }
  //logout() {
  // this.authService.logout();
  // }
}
