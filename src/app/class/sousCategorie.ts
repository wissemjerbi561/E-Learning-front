import { Categorie } from "./categorie";
import { Cours } from "./cours";

export class SousCategorie{
    idSousCategorie!:number;
    nom!:string;
    description!:string;
    idCategorie!:number;
    cours!:Cours[];
    categorie!:Categorie;
}