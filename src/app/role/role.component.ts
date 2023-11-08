import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../class/role';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  role: any = {};
  constructor(private roleService: RoleService, private http:HttpClient) {}

  ngOnInit(): void {}

  onSubmit() {
    this.roleService.createRole(this.role).subscribe((response) => {
      console.log(response, 'role added');
   
    });
  }

 
}
