import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { Phase } from 'src/app/class/phase';
import { Projet } from 'src/app/class/projet';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/interface/page';
import { MemberService } from 'src/app/services/member.service';
import { ProjetService } from 'src/app/services/projet.service';
import { Member } from '../class/member';
import { Cours } from '../class/cours';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard-projet',
  providers: [Projet],
  templateUrl: './dashboard-projet.component.html',
  styleUrls: ['./dashboard-projet.component.css']
})
export class DashboardProjetComponent implements OnInit {

members: Member[] = [];
projets: Projet[] = []; 

  
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
  cutoutPercentage: 60,
};
public doughnutChartLabels: Label[] = ["Projets Archivés", "Projets en cours"];
public doughnutChartLabels1: Label[] = ["Le nombre total des projets"];

public doughnutChartData: SingleDataSet = [];
public doughnutChartData1: SingleDataSet = [];

public doughnutChartType: ChartType = 'doughnut';
public doughnutChartType1: ChartType = 'doughnut';

public doughnutChartColor: Color[] = [
  { backgroundColor: ['#1E2E4F', '#53acd6', '#4E3DC8'] },
];

public doughnutChartColor1: Color[] = [
  { backgroundColor: ['#1E2E4F'] },
];




  listCoursParMembre!: Cours[];
  totalItems: any; 
  page = 1;
  itemsPerPage = 2;
  cours: any[] = [];
  memberId = this.ac.snapshot.params['id'];
  


 
    listProjetsParMembre!: Projet[];
   
  constructor(private projetService:ProjetService ,private coursService: ProjetService, private ac: ActivatedRoute,private memberService:MemberService,private projet: Projet, private router:Router) { }
count:  any;



memberString = localStorage.getItem('member');
member = JSON.parse(this.memberString ?? 'null');
memberIdLocal = this.member?.memberId ?? null;
  ngOnInit(): void {
   
      this.getCoursListParMembre(this.page, this.itemsPerPage);
    
 
    this.countprojetdeactiver();
    this.countprojetactive();
    this.obtenirNombreProblemesParProjet();
  
    this.allprojets();
   //this.getProjetByIdPhase(this.projet.idProjet);

  
    this.getProjetListParMembre(this.page, this.itemsPerPage);
  
   
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
  //  console.log(data);
  

   // this.allprojets();
  //})
//}
  


getCoursListParMembre(page: any, itemsPerPage: any) {
  this.coursService.getCoursListParMembre(page, itemsPerPage,this.memberId).subscribe((data: any) => {
    this.cours = data;
    this.listCoursParMembre = this.cours;
    this.totalCours = this.listCoursParMembre.length;
  });
}

totalCours: number = 0;
getProjetListParMembre(page: any, itemsPerPage: any) {
  this.projetService.getProjetListParMembre(page, itemsPerPage,this.memberId).subscribe((data: any) => {
    this.projets = data;
    this.listProjetsParMembre = this.projets;
    this.totalItems = data.totalProjet;
    this.totalProjets = data.length;
  });
}
  
}
