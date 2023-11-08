import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../class/role';
import { User } from '../class/user';
import { RegisterService } from '../register-service/register.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  roles!: Role[];

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  onSubmit() {
    this.registerService.addUser(this.user).subscribe((response) => {
      // Handle successful registration response
      console.log('user added successful:', response);
     
    });
  }

  getRoles(): void {
  
    this.registerService. getRoles().subscribe(
      (response) => {
        this.roles = response;
        console.log(this.roles);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
