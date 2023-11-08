import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    this.authService.getUserById().subscribe(
      (response: any) => {
        // Handle successful user retrieval
        this.user = response;
        console.log('User details:', this.user);
           var userJson = JSON.stringify(this.user);
           localStorage.setItem('user Signed on', userJson);
        // You can perform any further actions with the user data here
      },
      (error) => {
        console.error('Error fetching user by ID:', error);
        // You can display an error message or perform any other error handling here
      }
    );
  }
}
