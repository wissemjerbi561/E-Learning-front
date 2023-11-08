import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phase } from 'src/app/class/phase';
import { Probleme } from 'src/app/class/probleme';
import { Projet } from 'src/app/class/projet';
import { ProjetService } from 'src/app/services/projet.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projets!: Projet[];
  problemes !:Probleme[];
  searchQuery!: string;
  projects!: any[];


projet!:Projet;
  demarre = false;
  isProjectStarted = false;


  constructor(private projetService:ProjetService , private router:Router) { }

  ngOnInit(): void {
  // this.allprojets();
   this.obtenirProjetsStatutFalse();
   //this.obtenirProjetsStatutFalse();
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
  

  allprojets(){
    this.projetService.allProjets().subscribe(
     (d) => {
        //this.router.navigate(['Products'])
        this.projets=d;
        console.log(d);
       // alert("f");
      }
    );
 }
 updateProjet(idProjet:any){
  this.router.navigate(['update-projet', idProjet]);

 }
 suiviProjet(idProjet:any){
  this.router.navigate(['suivi', idProjet]);

 }
 listProbleme(idProjet:any){
  this.router.navigate(['listproblemes', idProjet]);

 }
 addprobleme(idProjet:any){
  this.router.navigate(['add-probleme', idProjet]);

 }
 deleteProjet(idProjet: any){
  this.projetService.deleteProjet(idProjet).subscribe( data => {
    console.log(data);
    
    this.allprojets();
  })
}

//deactivereProjet(idProjet:any ){
 // this.projetService.deactiverProjet(idProjet).subscribe( data => {
   // console.log(data);
    //Swal.fire("le projet est deactiver ",'','success');

    
    //this.allprojets();

//})}
deactiverProjet(idProjet: number) {
  this.projetService.deactiverProjet(idProjet).subscribe(
    (response) => {
      console.log('Projet désactivé avec succès !');
      // Effectuez les actions nécessaires après la désactivation du projet
      // Exemple : rafraîchir la liste des projets
      // this.fetchProjets();
      Swal.fire("le projet est deactivé ",'','success');
      this.obtenirProjetsStatutFalse();


    },
    (error) => {
      console.error('Une erreur s\'est produite lors de la désactivation du projet :', error);
      // Gérez les erreurs ou affichez un message d'erreur à l'utilisateur
    }
  );
}




startProjet(idProjet: any): void {
  // const projet= this.projets.find(p => p.idProjet === idProjet);
   //projet.demarre = true;
  this.demarre = true;

 
   this.projetService.affecterPhaseProjet(idProjet).subscribe(data => {
     Swal.fire("le projet est dans la phase de Initialisation ",'vous pouvez faire le suivi maintenant','success');
 
     this.obtenirProjetsStatutFalse();

 
   });
 }


 search() {
  if (this.searchQuery) {
    this.projetService.searchProjects(this.searchQuery)
      .subscribe(projets => this.projets = projets);
  } else {
    this.obtenirProjetsStatutFalse(); // Call a method to fetch the complete list of projects

  }
}


}