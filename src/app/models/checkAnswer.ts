import { Identifiants } from './identifiants';
import { datesFile } from './date';


export interface checkAnswerInitial {
    valeurRetour: number;
    plnid?: number;
    arcid?: string;
    tabId?: Identifiants[]; //pour LPLN
    tabHoraires?: datesFile[]; //pour VEMGSA
    datesFichierVemgsa?: datesFile;
}

export interface checkAnswer {
    analysePossible: boolean;
    plnid?: number;
    arcid?: string;
    checkLPLN?: checkAnswerInitial;
    checkVEMGSA?: checkAnswerInitial; 
}

