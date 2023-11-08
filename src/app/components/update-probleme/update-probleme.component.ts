import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Probleme } from 'src/app/class/probleme';
import { ProblemeService } from 'src/app/services/probleme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-probleme',
  templateUrl: './update-probleme.component.html',
  styleUrls: ['./update-probleme.component.css']
})
export class UpdateProblemeComponent implements OnInit {
  idProbleme:any;
  probleme: Probleme = new Probleme();
  constructor(private problemeService :ProblemeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {this.idProbleme = this.route.snapshot.params['id'];

  this.problemeService.getProblemeById(this.idProbleme).subscribe(data => {
    this.probleme = data;
  }, error => console.log(error));
}
onSubmit(){
  this.problemeService.updateProbleme(this.idProbleme, this.probleme).subscribe( data =>{
    Swal.fire("Proleme modifié avec succès",'','success');

  }
  , error => console.log(error));
}


goToProjetList(){
 this.router.navigate(['/projets']);
}

}