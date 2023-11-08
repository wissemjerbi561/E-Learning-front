export class Publication {
    id!: number;
    type!: string;
    contenu!: string;
    auteur!: string;
    userId!: any;
    username!: any;
    datePublication: Date | null;
    comments!: any[]; 
    likes!: number ;
    parentId!:number;
    parent:any;
    lstComments!:any[];

    constructor() {
      this.datePublication = null; 
    }

  }

  
 