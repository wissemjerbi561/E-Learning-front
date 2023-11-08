import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/class/projet';
import { ProjetService } from 'src/app/services/projet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-projet',
  templateUrl: './update-projet.component.html',
  styleUrls: ['./update-projet.component.css']
})
export class UpdateProjetComponent implements OnInit {

  idProjet:any;
  projet: Projet = new Projet();
  constructor(private projetService :ProjetService , private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { this.idProjet = this.route.snapshot.params['id'];

  this.projetService.getProjetById(this.idProjet).subscribe(data => {
    this.projet = data;
  }, error => console.log(error));
}
  onSubmit(){
    this.projetService.updateProjet(this.idProjet, this.projet).subscribe( data =>{
      this.goToProjetList();
      Swal.fire("Projet modifié avec succès",'','success');

    }
    , error => console.log(error));
  }


  goToProjetList(){
    this.router.navigate(['/projets']);
  }

}
