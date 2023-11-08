import { PhaseType } from "./phase-type";

export class Phase {
    idPhase: any;
    etat:any;
    description:any;
    status:any;
    dateDebut:any;
   dateFin:any;
   //idTypePhase:any;
   PhaseTypes!: PhaseType[];
   phases!: Phase[];
//idProjet:any;
}
