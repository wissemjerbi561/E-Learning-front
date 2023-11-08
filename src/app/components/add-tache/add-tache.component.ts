import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from 'src/app/class/activite';
import { Tache } from 'src/app/class/tache';
import { ActiviteService } from 'src/app/services/activite.service';
import { TacheService } from 'src/app/services/tache.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css']
})
export class AddTacheComponent implements OnInit {
  activite!:Activite
  idActivite:any
 // idActivite!:Activite
  id:any;
  tache: Tache = {
    idTache: 0,
    description: null,
    dateDebut: null,
    dateFin: null,
    dure:null
  };
  taches!: Tache[];
 // activite!: Activite ;
  constructor(private activiteService:ActiviteService,
    private activate: ActivatedRoute, private router:Router, private route: ActivatedRoute,private tacheService:TacheService) { }

  ngOnInit(): void {
    this.getById();

  }
  getById() {
    this.id = this.activate.snapshot.params['id'];
    this.activiteService.getActiviteById(this.id).subscribe((d) => {
      this.activite = d;
// this.afficherProblemes(d);

    });
  }
  onSubmit() {
    // Récupérer l'ID du probleme courant
    const idActivite = this.activite.idActivite;
  
    
  
    // Soumettre le formulaire
    this.tacheService.ajouterTache(this.tache, idActivite)
      .subscribe(() => {
        console.log('tache ajouté avec succès');
        //this.router.navigate(['/list-activity/',this.probleme.idProbleme]);
        Swal.fire("Tache ajouté avec succès",'','success');


       this.tache = {
        idTache: 0,
        description: '',
        dateDebut:null,
        dateFin:null,
        dure:null
       
        
      };
     
      });
  }
}


