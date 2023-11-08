import { Cours } from "./cours";
import { Inscription } from "./inscription";
import { Seance } from "./seance";

export class Session {
    idSession!:number;
    nbrDesInscrits!:number;
    nbrDesCertifiés!:number;
    dateDebut!:Date;
    dateFin!:Date;
    active!:boolean;
    capacite!:number;
    courss!:Cours[];
    seances!:Seance[];
    inscriptions!:Inscription[];
}
