import { Component, OnInit } from "@angular/core";
import { AviCours } from "../class/avi-cours";
import { GetCorsService } from "../services/get-cors.service";
import { Cours } from "../class/cours";
import { ActivatedRoute } from "@angular/router";



@Component({
  selector: 'app-avi-cours',
  templateUrl: './avi-cours.component.html',
  styleUrls: ['./avi-cours.component.css']
})
export class AviCoursComponent implements OnInit {
avicours!:AviCours;
  constructor(private getcoursService:GetCorsService,
    private activeRoute: ActivatedRoute,) { }
  listCours !:Cours[];
  coursSelectionne!: string;
  note: number = 0;
  ngOnInit(): void {
    this.avicours=new AviCours();
    this.getcoursService.getCours().subscribe((data:any)=> this.listCours=data);
    
this.activeRoute.queryParams.subscribe((params:any) => {
  console.log(params)
  this.avicours.idCours=params.coursId;
  this.coursSelectionne=params.coursNom;
})

  }
save(){
  this.avicours.noteSatisfaction = this.note;
    this.getcoursService.postAvi(this.avicours).subscribe();
  this.getcoursService.getCours().subscribe((data:any)=> this.listCours=data);
}

  rate(value: number) {
    this.note = value;
  }
}