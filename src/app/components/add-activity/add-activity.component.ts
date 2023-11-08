import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from 'src/app/class/activite';
import { Probleme } from 'src/app/class/probleme';
import { ActiviteService } from 'src/app/services/activite.service';
import { ProblemeService } from 'src/app/services/probleme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  probleme!:Probleme
  idProbleme:any
 // idActivite!:Activite
  id:any;
  activite: Activite = {
    idActivite: 0,
    description: null,
    dateDebut: null,
    dateFin: null,
    dure:null,
    idProbleme: undefined,
    taches: undefined
  };
  Activites!: Activite[];
 // activite!: Activite ;
  constructor(private activiteService:ActiviteService,
    private activate: ActivatedRoute, private router:Router, private route: ActivatedRoute,private problemeService:ProblemeService) { }

  ngOnInit(): void {
    this.getById();

  }

  
  getById() {
    this.id = this.activate.snapshot.params['id'];
    this.problemeService.getProblemeById(this.id).subscribe((d) => {
      this.probleme = d;
// this.afficherProblemes(d);

    });
  }
  
  onSubmit() {
    // Récupérer l'ID du probleme courant
    const idProbleme = this.probleme.idProbleme;
  
    
  
    // Soumettre le formulaire
    this.activiteService.ajouterActivity(this.activite, idProbleme)
      .subscribe(() => {
        console.log('activite ajouté avec succès');
        this.router.navigate(['/list-activity/',this.probleme.idProbleme]);
        Swal.fire("Activité ajouté avec succès",'','success');


       this.activite = {
        idActivite: 0,
        description: '',
        dateDebut:null,
        dateFin:null,
        dure:null,
        idProbleme: undefined,
        taches:undefined
        
      };
     
      });
  }
}
