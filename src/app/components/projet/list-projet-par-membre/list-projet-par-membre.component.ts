import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/class/projet';
import { ProjetService } from 'src/app/services/projet.service';
@Component({
  selector: 'app-list-projet-par-membre',
  templateUrl: './list-projet-par-membre.component.html',
  styleUrls: ['./list-projet-par-membre.component.css']
})
export class ListProjetParMembreComponent implements OnInit {

  searchTerm: string = '';
  totalProjets: number = 0;
  searchQuery!: string;
  projects!: any[];
  searchDescription: string = '';

projet!:Projet;
    listProjetsParMembre!: Projet[];
    totalItems: any;
    page = 1;
    itemsPerPage = 2;
    projets: Projet[] = [];
  
    memberId = this.ac.snapshot.params['id'];
    
    constructor(private projetService: ProjetService, private ac: ActivatedRoute) { }
    
    
    
    ngOnInit(): void {
      
        this.getProjetListParMembre(this.page, this.itemsPerPage);
      
      
    }
    
    getProjetListParMembre(page: any, itemsPerPage: any) {
      this.projetService.getProjetListParMembre(page, itemsPerPage,this.memberId).subscribe((data: any) => {
        this.projets = data;
        this.listProjetsParMembre = this.projets;
        this.totalItems = data.totalProjet;
        this.totalProjets = data.length;

         // Filter projects by description
    if (this.searchDescription !== '') {
      this.listProjetsParMembre = this.listProjetsParMembre.filter((projet: Projet) =>
        projet.description.toLowerCase().includes(this.searchDescription.toLowerCase())
      );
    }
      });
    }

    
searchProjects() {
  const description = 'votre-description'; 
  this.projetService.searchProjectsByDescription(description)
    .subscribe((data) => {
      this.projets = data;
    });
}
    

search() {
  if (this.searchQuery) {
    this.projetService.searchProjects(this.searchQuery)
      .subscribe(listProjetsParMembre => this.listProjetsParMembre = listProjetsParMembre);
  } else {
    this.obtenirProjetsStatutFalse(); // Call a method to fetch the complete list of projects

  }
}



obtenirProjetsStatutFalse(){
  this.projetService.obtenirProjetsStatusFalse().subscribe ((d) => {
    //this.router.navigate(['Products'])
    this.projets=d;
    console.log(d);
   // alert("f");
  }
);
}

  }