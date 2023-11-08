import { AviCours } from "./avi-cours";
import { Categorie } from "./categorie";
import { Chapitre } from "./chapitre";
import { Session } from "./session";
import { SousCategorie } from "./sousCategorie";
import { Tarif } from "./tarif";

export class Cours {
    idCours!:number;
    nom!:string;
    description!:string;
    nbreDesInscrits!:number;
    nbreDesCertifies!:number;
    dateDebut!:Date;
    dateFin!:Date;
    noteMoyenneSatisfaction!:number;
    idTheme!:number;
    idCategorie!:number;
    idSousCategorie!:number;
    ImageFile!: File;
    chapitres!:Chapitre[];
    aviCours!:AviCours[];
    sessions!:Session[];
    tarif!:Tarif[];
    categorie!:Categorie;
    sousCategorie!:SousCategorie;

    price!:number;
    name!:string;
    
  
}
