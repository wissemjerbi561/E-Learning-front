import { Cours } from "./cours";
import { SousCategorie } from "./sousCategorie";

export class Categorie{
    idCategorie!:number;
    nom!:string;
    description!:string;
    cours!:Cours[];
    sousCategories!:SousCategorie[];
}