import { Component, OnInit,Input } from "@angular/core";
import { ViewportScroller } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";
import { Categorie } from "../class/categorie";
import { Cours } from "../class/cours";
import { Session } from "../class/session";
import { Tarif } from "../class/tarif";
import { GetCorsService } from "../services/get-cors.service";
import { Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-cours',
  templateUrl: './details-cours.component.html',
  styleUrls: ['./details-cours.component.css']
})


export class DetailsCoursComponent implements OnInit{

  listCours !:Cours[]; 
  coursSelectionne: Cours = new Cours();
  courssupp!:any; 
  tarif!: Tarif;
  showModalReplaceTarif = false;
  nouveauTarif: Tarif = new Tarif();
  sessions!: Session[];
  selectedSession!: Session;
  showModal = false;
  listCategories: Categorie[] = [];
  showDropdown: boolean = false;
  filteredCours!: Cours[];
  coursPlusnote!:Cours[];
  raw9sa0: string = ' '
  rawai7l: string = ' '
  rawsewm: string = ' '
  rawao8m: string = ' '
  raw99vd: string = ' '
  raw1ww4: string = ' '
  rawnr9p: string = ' '
  toutLesCoursHide:boolean=false;
  

  idCours!: number;
  cours!: Cours;
  
  constructor(private route: ActivatedRoute, private coursService: GetCorsService) { }
  courseDetails!: Cours; // Assuming you have retrieved and assigned the course details from a service

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
  this.idCours=params.idCours;
  this.cours= new Cours();
  this.coursService.getCourseById(this.idCours).subscribe( data => {
    this.cours = data;
  });    

  });
  }

  }




  
   
  
  
  
  
  
  
  
  
  
  







