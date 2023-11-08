import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../class/role';
import { User } from '../class/user';
import { RegisterService } from '../register-service/register.service';
import { MemberService } from '../services/member.service';
import { Member } from '../class/member';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  member !:Member;
  roles!: Role[];
  user: User = new User();
  constructor(
    private registerService: RegisterService,
    private httpClient: HttpClient,
    private router:Router,
    private memberService:MemberService

  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  onSubmit() {
    this.registerService.register(this.user).subscribe(
      (response) => {
        

        const member = {
          userId: response.id,
          firstName: response.firstname,
          lastName: response.lastname,
          username: response.username,
          email: response.email,
          password: response.password,
          //positions:"Apprenant"
        };

        this.memberService.ajoutMember(member).subscribe
        (data=>{console.log(data);})

        // Handle successful registration response
        console.log('Registration successful:', response);
        // You can navigate to a success page or perform any other actions here
        this.router.navigateByUrl('/login')
      },
      (error) => {
        // Handle registration error
        console.error('Registration error:', error);
        // You can display an error message or perform any other error handling here
      }
    );
  }

  getRoles(): void {
   this.registerService.getRoles().subscribe(
      (response) => {
        this.roles = response;
        console.log(this.roles);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  /*saveMember(){
    
    console.log("membre",this.member);

    //user=NewUser;  user.firstname 
    //this.register(firstname,lastname'email)
    //this.member.userId=response.user.id
    this.memberService.createMember(this.member).subscribe(data =>{
      
      const user = {
        userId: data.memberId,
        firstname: data.firstName,
        lastname: data.lastName,
        username: data.username,
        enabled:true,
        roles:data.position,
        email: data.email,
        password: data.password,
        //positions:"Apprenant"
      };
        this.registerService.ajoutUser(user).subscribe(
          (response) => {
            
    
            // Handle successful registration response
            console.log('Registration successful:', response);
            // You can navigate to a success page or perform any other actions here
            this.router.navigateByUrl('/login')
          },
          (error) => {
            // Handle registration error
            console.error('Registration error:', error);
            // You can display an error message or perform any other error handling here
          }
        );
      


      console.log(data);



    },
    error => console.log(error));
      
  }*/
}
