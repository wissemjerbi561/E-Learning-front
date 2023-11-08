import { Activite } from "./activite";
import { Projet } from "./projet";

export class Probleme {

    idProbleme: any;
    description!:any;
    nom:any;
    dateDebut:any;
    dateFin:any;
   // projet!:Projet;
     // Ajouter la propriété problèmes
     projet?: any;
     idProjet: any;
 dure:any;
    
    activites!: Activite[];
    }

