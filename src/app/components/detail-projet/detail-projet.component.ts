import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from 'src/app/class/activite';
import { Probleme } from 'src/app/class/probleme';
import { Projet } from 'src/app/class/projet';
import { ActiviteService } from 'src/app/services/activite.service';
import { ProblemeService } from 'src/app/services/probleme.service';
import { ProjetService } from 'src/app/services/projet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {
  projet!:Projet
  idProjet:any
  selectedFile!: File;

  idActivite!:Activite
  id:any;
  problemes!: Probleme[];
  afficherFormulaire = false;
  activite: Activite = {
    idActivite: 0,
    description: null,
    dateDebut: null,
    dateFin: null,
    dure:null,
    idProbleme: undefined,
    taches: undefined
  };
  
  probleme: Probleme = {
    idProbleme: 0,
    description: null,
    dateDebut: null,
    dateFin: null,
    dure: null,
    nom: null,
    projet: new Projet,
    activites: [],
    idProjet: null,
  };
  
    constructor(private projetService: ProjetService,private problemeService:ProblemeService, private activiteService:ActiviteService,
      private activate: ActivatedRoute, private router:Router, private route: ActivatedRoute) { }
  
      
    ngOnInit(): void {
      this.getById();
      this.afficherProblemes(this.projet.idProjet);
  
     // this.getProblemesByProjetId(this.idProjet);
    
    
    }
  
    getById() {
      this.id = this.activate.snapshot.params['id'];
      this.projetService.getProjetById(this.id).subscribe((d) => {
        this.projet = d;
        this.afficherProblemes(d);
  
      });
    }
    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }
    
    onUpload(): void {
      this.problemeService.uploadFile(this.selectedFile)
        .subscribe(
          () => {
            console.log('Fichier uploadé avec succès.');
            // Réalisez les actions supplémentaires après l'upload réussi, si nécessaire.
          },
          (error) => {
            console.error('Erreur lors de l\'upload du fichier :', error);
            // Traitez les erreurs d'upload, si nécessaire.
          }
        );
    }
   
  
  
    onSubmit() {
      // Récupérer l'ID du projet courant
      const idProjet = this.projet.idProjet;
    
      
    
      // Soumettre le formulaire
      this.problemeService.ajouterProjett(this.probleme, idProjet)
        .subscribe(() => {
          console.log('probleme ajouté avec succès');
          Swal.fire("Probleme ajouté avec succès",'','success');

       //  this.router.navigate(['/detail/',this.projet.idProjet]);
  
          this.probleme = {
            idProbleme: 0,
            description: '',
            dateDebut:null,
            dateFin:null,
            dure:null,
            nom: null,
         

            projet: new Projet,
            activites : [],
            idProjet:null
          };
          this.afficherFormulaire = false;
       //   this.router.navigate(['/detail/',this.projet.idProjet]);
       location.reload();


        });
    }
    deactiverProbleme(idProbleme: any) {
      this.problemeService.deactiverProbleme(idProbleme).subscribe(
        (response) => {
          console.log('probleme désactivé avec succès !');
          // Effectuez les actions nécessaires après la désactivation du projet
          // Exemple : rafraîchir la liste des projets
          // this.fetchProjets();
          Swal.fire("le probleme est deactivé ",'','success');
        //  this.obtenirProjetsStatutFalse();
        location.reload();

    
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la désactivation du probleme :', error);
          // Gérez les erreurs ou affichez un message d'erreur à l'utilisateur
        }
      );

    }
   
  
    afficherProblemes(projet: Projet): void {
      this.projetService.getProblemes(projet.idProjet)
        .subscribe(problemes => this.problemes = problemes);
    }
    addactivity(idActivite:any){
      this.router.navigate(['add-activity', idActivite]);

    }
    deleteProbleme(idProbleme: any){
      this.problemeService.deleteProbleme(idProbleme).subscribe( data => {
        console.log(data);
        this.getById();

        this.afficherProblemes(this.projet.idProjet);
      })
    }
    updateProbleme(idProbleme:any){
      this.router.navigate(['update-probleme', idProbleme]);
    
     }
    
    
    }
  