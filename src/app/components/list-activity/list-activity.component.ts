import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from 'src/app/class/activite';
import { Probleme } from 'src/app/class/probleme';
import { ActiviteService } from 'src/app/services/activite.service';
import { ProblemeService } from 'src/app/services/probleme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit {

  probleme!:Probleme
  idProbleme:any
  activites!: Activite[];
  id:any
  constructor(private problemeService:ProblemeService, private activate:ActivatedRoute, private activiteService:ActiviteService, private router:Router) { }

  ngOnInit(): void {
    this.getById();


  }
  getById() {
    this.id = this.activate.snapshot.params['id'];
    this.problemeService.getProblemeById(this.id).subscribe((d) => {
      this.probleme = d;
      this.afficherActivites(d);

    });
  }
  deactiverActivite(idActivite: any) {
    this.activiteService.deactiverActivite(idActivite).subscribe(
      (response) => {
        console.log('activite désactivé avec succès !');
        // Effectuez les actions nécessaires après la désactivation du projet
        // Exemple : rafraîchir la liste des projets
        // this.fetchProjets();
        Swal.fire("l'activite est deactivé ",'','success');
      //  this.obtenirProjetsStatutFalse();
     // this.afficherActivites(this.probleme.idProbleme);
      location.reload();


  
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la désactivation du probleme :', error);
        // Gérez les erreurs ou affichez un message d'erreur à l'utilisateur
      }
    );
    

  }


  afficherActivites(probleme: Probleme): void {
    this.problemeService.getActivites(probleme.idProbleme)
      .subscribe(activites => this.activites = activites);
  }
  deleteActivite(idActivite: any){
    this.activiteService.deleteActivite(idActivite).subscribe( data => {
      console.log(data);
      this.getById();

      this.afficherActivites(this.probleme.idProbleme);
    })
  }

  updateActivite(idActivite:any){
    this.router.navigate(['update-activity', idActivite]);
  
   }
   addtache(idTache:any){
    this.router.navigate(['add-tache', idTache]);

  }
  
  
}
