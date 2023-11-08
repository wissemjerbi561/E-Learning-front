import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Affectationtache } from 'src/app/class/affectationtache';
import { Demandeaide } from 'src/app/class/demandeaide';
import { Demandeverif } from 'src/app/class/demandeverif';
import { Member } from 'src/app/class/member';
import { Projet } from 'src/app/class/projet';
import { Skills } from 'src/app/class/skills';
import { Tache } from 'src/app/class/tache';
import { AffectationtacheService } from 'src/app/services/affectationtache.service';
import { DemandeaideService } from 'src/app/services/demandeaide.service';
import { DemandeverifService } from 'src/app/services/demandeverif.service';
import { MemberService } from 'src/app/services/member.service';
import { PositionService } from 'src/app/services/position.service';
import { TacheService } from 'src/app/services/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})
export class MonProfilComponent {
  member !:Member;
  skills!:Skills;

  demandeaide:Demandeaide=new Demandeaide();
demandeverif:Demandeverif=new Demandeverif();
selectedTask!:any;
selectedTaskDescription!: string;
tache!:Tache[];
  tachesAvecProjet: any[] = []; 
  taches!: Affectationtache[];
affectation!:Affectationtache[];
projet!:Projet[];
idProjet!:Projet[];
task!: Affectationtache[];
tasks !: Affectationtache[];
  constructor(private httpClient: HttpClient,private memberService:MemberService,private route:ActivatedRoute,private router:Router,
    private positionService :PositionService, private tacheService: TacheService, private demandeverifService :DemandeverifService  ,private demandeaideService : DemandeaideService, public dialog: MatDialog, private affectationtacheService:AffectationtacheService) { }

  ngOnInit(): void {
    this.getById();
    this.tachesbymemeber(this.memberId);

   
  }
  memberId = Number(localStorage.getItem('memberId'));
  getById() {
    
    
    this.memberService.getMemberById(this.memberId).subscribe((data) => {
      this.member = data;
    });
  }
  updateMember(memberId:any){
    this.router.navigate(['update-member', memberId]);
  

}

tachesbymemeber(memberId:any){

this.affectationtacheService.getTasksForMember(memberId)
    .subscribe((tasks: Affectationtache[]) => {
      this.tasks = tasks;
      console.log("tasks",tasks);

      console.log("M",memberId);

    });
}


openModal(task:any) {
  this.selectedTask = task; 
      this.demandeaide = new Demandeaide();
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


envoyer(task:any) {
  console.log("slelected task egale", this.selectedTask);
  console.log("projet task egale", this.selectedTask.projet.idProjet);
//1 get position by code valeur r positon id    position service by code
//2 get affectation projet by idprojet and positionid and sessionid
//
  console.log(" task egale", this.task);

  if (!this.selectedTask || !this.selectedTask.idAffectationTache) {
    console.error('ID d\'affectation de tâche non défini.');
  
    return;
  }
///  affectationtacheId: this.selectedTask.idAffectationTache
 this.demandeaide.affectationtacheId=this.selectedTask.idAffectationTache;

////  this.demandeaide.affectationtacheId = this.demandeaide.idAffectationTache; 

 //// this.demandeaide.affectationtacheId = task.idAffectationTache;
  this.demandeaide.senderId = this.memberId; 
console.log("before create", this.demandeaide)
  this.demandeaideService.addDemandeaide(this.demandeaide).subscribe(
    (response) => {
     /// this.demandeaide.affectationtacheId = this.selectedTask.idAffectationTache; 

     
      console.log('Demande d\'aide envoyée avec succès');
      console.log('Réponse de la demande d\'aide :', response);
      ///

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
  addskills(){

}}