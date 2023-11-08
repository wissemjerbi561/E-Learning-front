import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { Phase } from 'src/app/class/phase';
import { Projet } from 'src/app/class/projet';
import { Page } from 'src/app/interface/page';
import { MemberService } from 'src/app/services/member.service';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projets!: Projet[];
  chart: any;
  pagedData!: any[];
  currentPage = 0;
  pageSize = 10;
  totalPages!: number;


  result!: any[];
  phases!: Phase[];
  phase: Phase = {
    idPhase: 0,
    etat: null,
    PhaseTypes: [],
    description: null,
    status: null,
    dateDebut: null,
    dateFin: null,
    phases: []
  };
  totalProjets!: number;
  totalApprenant!: number;

projectCount!: number;
apprenantCount!: number;
public doughnutChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    display: true,
  },
  cutoutPercentage: 80,
};
public doughnutChartLabels: Label[] = ["Les Projets Archivés", "Les Projets Encours"];
public doughnutChartLabels1: Label[] = ["Le nombre total des projets"];

public doughnutChartData: SingleDataSet = [];
public doughnutChartData1: SingleDataSet = [];

public doughnutChartType: ChartType = 'doughnut';
public doughnutChartType1: ChartType = 'doughnut';

public doughnutChartColor: Color[] = [
  { backgroundColor: ['#f68059', '#ffbf3a', '#4e3dc8'] },
  
];
public doughnutChartColor1: Color[] = [
  { backgroundColor: ['#4e3dc8'] },
  
];
  projet: any;


  constructor(private projetService:ProjetService ,private memberService:MemberService, private router:Router) { }
count:  any;

  ngOnInit(): void {
    this.countnombreApprenantt();

    this.countprojetdeactiver();
    this.countprojetactive();
    this.obtenirNombreProblemesParProjet();
    this.countnombretotalprojet();
    this.allprojets();
   //this.getProjetByIdPhase(this.projet.idProjet);
   
  }
  countprojetdeactiver(){
    this.doughnutChartData = [];
    this.projetService.countNotActiveProjects().subscribe(
      (d) => {
console.log("déactiver",d)  ;   
this.doughnutChartData.push(d) },
      (error: any) => {
        console.error('Une erreur s\'est produite :', error);
      }
    );
  

}
countnombretotalprojet(){
  this.projetService.countnombretotalprojet().subscribe(
    (projectCount) => {
      this.totalProjets = projectCount;

console.log("nb total",projectCount)  ; 
//this.doughnutChartData1.push(d);

} );
}

obtenirNombreProblemesParProjet(){
  this.projetService.obtenirNombreProblemesParProjet().subscribe(
   ( response )=> {
     // this.result = response;
      console.log("dd", response)
    },
    error => {
      console.error(error);
    }
  );
}
countprojetactive(){
  this.doughnutChartData = [];
  this.projetService.countActiveProjects().subscribe(
    (d) => {
console.log("en cours",d)  ;   
this.doughnutChartData.push(d) },
    (error: any) => {
      console.error('Une erreur s\'est produite :', error);
    }
  );

}
allprojets() {
  this.projetService.getProjetsWithTypePhasess(this.currentPage, this.pageSize).subscribe(
    (response: Object) => {
      const page: Page<Projet> = response as Page<Projet>;
      this.pagedData = page.content;
      this.totalPages = page.totalPages;
    }
  );}

nextPage() {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
    this.allprojets();
  }
}

previousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.allprojets();
  }
}
//getProjetByIdPhase(idProjet:any){
 // this.projetService.getProjetByIdPhase(idProjet).subscribe( data => {
   // console.log(data);
  

    //this.allprojets();
 // })
//}
  countnombreApprenantt(){
    this.memberService.countnombreApprenantt().subscribe(
      (apprenantCount) => {
        this.totalApprenant = apprenantCount;
  
  console.log("nb totallllll",apprenantCount)  ; 
  
  });
  }
 
  
}
