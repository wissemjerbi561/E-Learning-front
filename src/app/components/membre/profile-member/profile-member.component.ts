import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/class/member';
import { MemberService } from 'src/app/services/member.service';
import { PositionService } from 'src/app/services/position.service';
import { ProjetService } from 'src/app/services/projet.service';
import { Projet } from 'src/app/class/projet';
import { ChartType } from 'chart.js';
import { Badge } from 'src/app/class/badge';
@Component({
  selector: 'app-profile-member',
  templateUrl: './profile-member.component.html',
  styleUrls: ['./profile-member.component.css']
})
export class ProfileMemberComponent implements OnInit {
  projets: Projet[] = [];

  doughnutChartData: any[] = [];
  doughnutChartLabels: string[] = [];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartOptions: any;
  doughnutChartColor: any[] = [];

  totalProjets: number = 0;
  totalApprenant: number = 0;
  pagedData: any[] = [];

  currentPage: number = 1;
  totalPages: number = 0;
  listPositions: any[]=[];
  positionId:any;
  member !:Member;
  id:any;
  showPaymentList=false ;
  showProjectList=false ;
  showCoursList=false ;
  constructor(private httpClient: HttpClient,private projetService:ProjetService,private memberService:MemberService,private route:ActivatedRoute,private router:Router,
    private positionService :PositionService) { }

  ngOnInit(): void {
    this.getById();
    
    this.assignBadges();
  }

  showPayments(): void{
  this.showPaymentList = !this.showPaymentList
  }

  
  showCours(): void{
    this.showCoursList = !this.showCoursList
    }
  

  showProjects(): void{
    this.showProjectList = !this.showProjectList
    }
  getById() {
    
  this.id= this.route.snapshot.paramMap.get('id');
  this.memberService.getMemberById(this.id).subscribe((data) => {
    this.member = data;
  });
}
updateMember(member:any){
  let route = '/ajout-membre';
      this.router.navigate([route], { queryParams: { member:member.memberId } });
      
}

getAllProjets() {
  this.projetService.allProjets().subscribe(
    (projets: Projet[]) => {
      this.projets = projets;

      this.doughnutChartData = this.extractChartData();
      this.doughnutChartLabels = this.extractChartLabels();
      this.doughnutChartColor = this.generateChartColors();

      this.totalProjets = this.getTotalProjets();
      this.totalApprenant = this.getTotalApprenant();

      this.pagedData = this.paginateData();
      this.currentPage = 1;
      this.totalPages = this.calculateTotalPages();
    },
    (error) => {
      console.log(error);
    }
  );
}

private extractChartData(): any[] {
  // Logique pour extraire les données du projet
  // Retourne un tableau des données du graphique
  return [];
}

private extractChartLabels(): string[] {
  // Logique pour extraire les libellés
  // Retourne un tableau des libellés du graphique
  return [];
}

private generateChartColors(): any[] {
  // Logique pour générer les couleurs du graphique
  // Retourne un tableau des couleurs du graphique
  return [];
}

private getTotalProjets(): number {
  // Logique pour obtenir le nombre total de projets
  // Retourne le nombre total de projets
  return 0;
}

private getTotalApprenant(): number {
  // Logique pour obtenir le nombre total d'apprenants
  // Retourne le nombre total d'apprenants
  return 0;
}

private paginateData(): any[] {
  // Logique pour paginer les données
  // Retourne un tableau des données paginées
  return [];
}

private calculateTotalPages(): number {
  // Logique pour calculer le nombre total de pages
  // Retourne le nombre total de pages
  return 0;
}

getProjetsEnCoursCount(): number {
  return this.projets.filter((projet) => projet.status === 'En cours').length;
}

previousPage() {
  // Logique pour passer à la page précédente
}

nextPage() {
  // Logique pour passer à la page suivante
}

// Autres méthodes et logique




searchProjects() {
  const description = 'votre-description'; 
  this.projetService.searchProjectsByDescription(description)
    .subscribe((data) => {
      this.projets = data;
    });
}

assignBadges() {
 
  if (this.member.positions.length > 0) {
    const activeParticipationBadge: Badge = {
      name: 'Active Participation',
      description: 'Earned for active participation',
      imageUrl: 'path/to/active-participation-badge.png'
    };
    this.member.badges.push(activeParticipationBadge);
  }

  const certificationThreshold = 80;
  if (this.member.finalNote >= certificationThreshold) {
    const certificationBadge: Badge = {
      name: 'Certification',
      description: 'Earned for achieving high score',
      imageUrl: 'path/to/certification-badge.png'
    };
    this.member.badges.push(certificationBadge);
  }

  
}

}


