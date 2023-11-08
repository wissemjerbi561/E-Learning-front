import { Cours } from "./cours";
import { Phase } from "./phase";
import { Probleme } from "./probleme";

export class Projet {

    idProjet!: any;
    description:any;
    name:any;

    dateDebut:any;
    dateFin:any;
    demarre!:boolean
    cours!:Cours;
    problemes: any;
    status:any;
    phases!: Phase[];
    memberId: any;
    theme!:any;
    themeId!:any;

}
