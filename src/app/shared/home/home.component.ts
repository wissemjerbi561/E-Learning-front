import { Component, OnInit } from '@angular/core';
import { GetCorsService } from 'src/app/services/get-cors.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private coursServicee:GetCorsService) {}
  listCours:any[]=[]
  ngOnInit(): void {
    this.coursServicee.getCours().subscribe((data: any) => {
      this.listCours = data;
      
    });
  }

 
}
