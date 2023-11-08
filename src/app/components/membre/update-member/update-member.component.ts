import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/class/member';
import { Position } from 'src/app/class/position';
import { MemberService } from 'src/app/services/member.service';
import { PositionService } from 'src/app/services/position.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.css']
})
export class UpdateMemberComponent {
  selectedFile: File | undefined;
  member !:any;
  listPositions: any[]=[];
  positionId:any;
  memberId!:any;
  id!:any;
  

  constructor(private memberService:MemberService, private positionService :PositionService,private activeRoute: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
    this.id = Number(localStorage.getItem('memberId'));

    
    
     
      this.memberService.getMemberById(this.id).subscribe((data) => {
        this.member = data;
      });
    }
    
   // memberId = Number(localStorage.getItem('memberId'));
    onFileChange(event: any) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        this.selectedFile = fileList[0];
      }
    }
    getPosition():void{
      this.listPositions=[];
      this.positionService.getListPositions().subscribe(data=>{
  
        this.listPositions.push(...data);
      },error=>{
        console.log(error)
      })
    }

    showModalPostion:boolean=false
    postion:Position=new Position()
    openModalPostion(){
      this.showModalPostion=true;
    }
    ajouterPostion(){
      this.positionService.postPositions(this.postion).subscribe((pos:any)=>{
        
        this.getPosition();
      });
      this.showModalPostion=false
    }
    updateMember(){
      this.memberService.updateMember(this.id, this.member).subscribe( data =>{
        
        Swal.fire("Profil modifié avec succès",'','success');
        this.redirectToProfil();
  
      }
      , error => console.log(error));
    }
    private redirectToProfil() {
      this.router.navigate(['/mon-profil']);
    }


}
