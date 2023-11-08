import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from 'src/app/class/member';
import { Position } from 'src/app/class/position';
import { User } from 'src/app/class/user';
import { RegisterService } from 'src/app/register-service/register.service';
import { MemberService } from 'src/app/services/member.service';
import { PositionService } from 'src/app/services/position.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-membre',
  templateUrl: './add-membre.component.html',
  styleUrls: ['./add-membre.component.css']
})
export class AddMembreComponent implements OnInit {
  submitted:boolean=false;

  listPositions: any[]=[];
  positionId:any;
  positions:Position[] =[];

  

  myimage!: Observable<any>;
  base64code!: any

  member !:Member;

  //user:User=new User();

  selectedFile: File | undefined;
  
 
  

  constructor(private memberService:MemberService, private positionService :PositionService,private activeRoute: ActivatedRoute,
    private router: Router,private registerService:RegisterService) { }

    /*onFileChange(event: any) {
      this.selectedFile = event.target.files[0] as File;
    }*/
    onFileChange(event: any) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        this.selectedFile = fileList[0];
      }
    }

  private redirectToListMembres() {
    this.router.navigate(['/membres']);
  }

  ngOnInit(): void {
    //this.saveMember();
    
    this.getPosition();
    this.member=new Member()
    this.activeRoute.queryParams.subscribe((params:any) => {
      console.log(params.member)
      if(params.member){
          //this.memberService.getById(params.member);
          this.memberService.getMemberById(params.member).subscribe((data:any)=>{
            this.member = data;
            console.log('getbyId',data)
            
          });
        
      }
    })


  }


  
  saveMember(){
    var lst:any[]=[];
    if(this.positionId){

    lst.push(this.positionId)
    this.member.lstPositionId=lst;
  }
    
    
    console.log("membre",this.member);

    //user=NewUser;  user.firstname 
    //this.register(firstname,lastname'email)
    //this.member.userId=response.user.id
    this.memberService.createMember(this.member).subscribe(data =>{
      
      const user = {
        userId: data.memberId,
        firstname: data.firstName,
        lastname: data.lastName,
        username: data.username,
        enabled:true,
        roles:data.position,
        email: data.email,
        password: data.password,
        //positions:"Apprenant"
      };
        this.registerService.ajoutUser(user).subscribe(
          (response) => {
            
    
            // Handle successful registration response
            console.log('Registration successful:', response);
            // You can navigate to a success page or perform any other actions here
            
          },
          (error) => {
            // Handle registration error
            console.error('Registration error:', error);
            // You can display an error message or perform any other error handling here
          }
        );
      


      console.log(data);


      Swal.fire("Membre ajouté avec succès",'','success');
      this.redirectToListMembres();
    },
    error => console.log(error));
      //})
  }




  getPosition():void{
    //this.listPositions=[];
    this.positionService.obtenirPositionsStatusFalse().subscribe(data=>{

      this.positions.push(...data);
    },error=>{
      console.log(error)
    })
  }
  /*onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file)
  };
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      console.log(d)
      this.myimage = d
      this.base64code = d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }*/
  //testing
  savem() {
    var lst:any[]=[];
    if(this.positionId){
    lst.push(this.positionId)
    this.member.lstPositionId=lst;
  }
    if (this.selectedFile) {
      console.log("membre",this.member,this.selectedFile);
      this.memberService.createM(this.member, this.selectedFile).subscribe(data => {
          console.log(data);
          this.redirectToListMembres();
        },
        error => console.log(error));
      }
    else {
      console.log("Aucun fichier sélectionné");
    }
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
}
