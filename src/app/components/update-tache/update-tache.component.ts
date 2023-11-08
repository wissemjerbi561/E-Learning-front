import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tache } from 'src/app/class/tache';
import { TacheService } from 'src/app/services/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-tache',
  templateUrl: './update-tache.component.html',
  styleUrls: ['./update-tache.component.css']
})
export class UpdateTacheComponent implements OnInit {
  idTache:any;
  tache: Tache = new Tache();
  constructor(private tacheService :TacheService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {this.idTache = this.route.snapshot.params['id'];

  this.tacheService.getTacheById(this.idTache).subscribe(data => {
    this.tache = data;
  }, error => console.log(error));
}
onSubmit(){
  this.tacheService.updateTache(this.idTache, this.tache).subscribe( data =>{
    Swal.fire("Tache modifié avec succès",'','success');

    

  }
  , error => console.log(error));


}


goToProjetList(){
 this.router.navigate(['/projets']);
}

}