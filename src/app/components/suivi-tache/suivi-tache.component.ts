import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Affectationtache } from 'src/app/class/affectationtache';
import { Projet } from 'src/app/class/projet';
import { Tache } from 'src/app/class/tache';
import { Demandeaide } from 'src/app/class/demandeaide';


import { AffectationtacheService } from 'src/app/services/affectationtache.service';
import { ProjetService } from 'src/app/services/projet.service';
import { TacheService } from 'src/app/services/tache.service';
import { DemandeAideComponent } from '../demande-aide/demande-aide.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Member } from 'src/app/class/member';
import { DemandeaideService } from 'src/app/services/demandeaide.service';
import { Demandeverif } from 'src/app/class/demandeverif';
import { DemandeverifService } from 'src/app/services/demandeverif.service';



@Component({
  selector: 'app-suivi-tache',
  templateUrl: './suivi-tache.component.html',
  styleUrls: ['./suivi-tache.component.css']
})
export class SuiviTacheComponent implements OnInit {

demandeaide:Demandeaide=new Demandeaide();
demandeverif:Demandeverif=new Demandeverif();

selectedTaskDescription!: string;
tache!:Tache[];
  tachesAvecProjet: any[] = []; 
  taches!: Affectationtache[];
affectation!:Affectationtache[];
projet!:Projet[];
member!:Member[];
idProjet!:Projet[];
task!: Affectationtache[];
tasks !: Affectationtache[];
//memberId!:any;


  constructor(private tacheService: TacheService, private demandeverifService :DemandeverifService  ,private demandeaideService : DemandeaideService, public dialog: MatDialog, private affectationtacheService:AffectationtacheService) {}

  ngOnInit() {
    this.affectationtacheService.allAffectationTache().subscribe(
      (data) => {
        this.taches = data;
        console.log("eee",data);
      },
      (error) => {
        console.log('Une erreur est survenue lors de la récupération des données : ', error);
      }
    );
    this.tachesbymemeber(this.memberId);

  }
   memberId = Number(localStorage.getItem('memberId'));

  tachesbymemeber(memberId:any){

  this.affectationtacheService.getTasksForMember(memberId)
      .subscribe((tasks: Affectationtache[]) => {
        this.tasks = tasks;
        console.log("tasks",tasks);

        console.log("M",memberId);

      });
  }


  openModal() {

    // Récupérer le modal par son ID
    const modal = document.getElementById('myModal');

  
    // Afficher le modal
    if (modal) {
      modal.style.display = 'block';
    }
  }
  openModal2() {

    // Récupérer le modal par son ID
    const modal1 = document.getElementById('myModal1');

  
    // Afficher le modal
    if (modal1) {
      modal1.style.display = 'block';
    }
  }
  closeModal() {
    // Récupérer le modal par son ID
    const modal = document.getElementById('myModal');

    
    // Masquer le modal
    if (modal) {
      modal.style.display = 'none';
    }
  }
  closeModal1() {
    // Récupérer le modal par son ID
    const modal = document.getElementById('myModal1');

    
    // Masquer le modal
    if (modal) {
      modal.style.display = 'none';
    }
  }

    envoyer() {
      this.demandeaideService.addDemandeaide(this.demandeaide).subscribe(
        (response) => {
          console.log(this.demandeaide)

          console.log('Demande d\'aide envoyée avec succès');
          console.log('Réponse de la demande d\'aide :', response);
          this.demandeaide = new Demandeaide();

      }
      );
    }
    send() {
      this.demandeverifService.addDemandeverif(this.demandeverif).subscribe(
        (response) => {
          console.log(this.demandeverif)

          console.log('Demande affectation envoyée avec succès');
          console.log('Réponse de la demande affectation :', response);
          this.demandeverif = new Demandeverif();

      }
      );
    }
  
  }

