import { Identifiants } from './identifiants';


export interface checkAnswerInitial {
    valeurRetour: number;
    plnid?: number;
    arcid?: string;
    tabId?: Identifiants[];
}

export interface checkAnswer {
    analysePossible: boolean;
    plnid?: number;
    arcid?: string;
    checkLPLN?: checkAnswerInitial;
    checkVEMGSA?: checkAnswerInitial; 
}

