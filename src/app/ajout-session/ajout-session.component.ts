import { Component, OnInit } from '@angular/core';
import { GetCorsService } from '../services/get-cors.service';
import { Session } from '../class/session';

@Component({
  selector: 'app-ajout-session',
  templateUrl: './ajout-session.component.html',
  styleUrls: ['./ajout-session.component.css']
})
export class AjoutSessionComponent implements OnInit {
  session: Session = new Session();
  constructor(private getcoursService:GetCorsService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.session); // vérifier que les données du formulaire sont correctement récupérées
    this.getcoursService.postSession(this.session).subscribe(
      (response) => {
        console.log(response); // vérifier que la réponse du serveur est bien reçue
      },
      (error) => {
        console.log(error); // afficher les erreurs éventuelles
      }
    );
  }
  
  
  
  
  
  
  
  

}
