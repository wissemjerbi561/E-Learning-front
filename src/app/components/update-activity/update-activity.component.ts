import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from 'src/app/class/activite';
import { ActiviteService } from 'src/app/services/activite.service';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent implements OnInit {

  idActivite:any;
  activite: Activite = new Activite();
  constructor(private activiteService :ActiviteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {this.idActivite = this.route.snapshot.params['id'];

  this.activiteService.getActiviteById(this.idActivite).subscribe(data => {
    this.activite = data;
  }, error => console.log(error));
}
onSubmit(){
  this.activiteService.updateActivite(this.idActivite, this.activite).subscribe( data =>{

  }
  , error => console.log(error));
}


goToProjetList(){
 this.router.navigate(['/projets']);
}

}