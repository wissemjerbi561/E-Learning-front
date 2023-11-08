import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from 'src/app/class/activite';
import { Tache } from 'src/app/class/tache';
import { ActiviteService } from 'src/app/services/activite.service';
import { TacheService } from 'src/app/services/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-tache',
  templateUrl: './list-tache.component.html',
  styleUrls: ['./list-tache.component.css']
})
export class ListTacheComponent implements OnInit {
  id:any
  activite!:Activite
  taches!: Tache[];

  constructor(private tacheService:TacheService, private activate:ActivatedRoute, private activiteService:ActiviteService, private router:Router) { }

  ngOnInit(): void {
    this.getById();

  }
  getById() {
    this.id = this.activate.snapshot.params['id'];
    this.activiteService.getActiviteById(this.id).subscribe((d) => {
      this.activite = d;
      this.afficherTaches(d);

    });
  }
  afficherTaches(Activite: Activite): void {
    this.activiteService.getTaches(this.activite.idActivite)
      .subscribe(taches => this.taches = taches);
  }
  deleteTache(idTache: any){
    this.tacheService.deleteTache(idTache).subscribe( data => {
      console.log(data);
      this.getById();

      this.afficherTaches(this.activite.idActivite);
    })
  }

  deactiverTache(idTache: any) {
    this.tacheService.deactiverTache(idTache).subscribe(
      (response) => {
        console.log('TACHE désactivé avec succès !');
        // Effectuez les actions nécessaires après la désactivation du projet
        // Exemple : rafraîchir la liste des projets
        // this.fetchProjets();
        Swal.fire("TACHE est deactivé ",'','success');
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

  updateTache(idTache:any){
    this.router.navigate(['update-tache', idTache]);
  
   }

}
