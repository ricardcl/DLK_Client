import { Identifiants } from './identifiants';
import { datesFile } from './date';
import { Etat } from './enumEtat';
import { Color } from '@amcharts/amcharts4/core';


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

export interface etatTransfertFrequence { 
    frequence: string; 
    dateTransfert: string; 
    positionTransfert?: string; 
    isFinTRFDL?: boolean; 
    dateFinTRFDL ?:string;
    isTRARTV?: boolean; 
    dateTRARTV ?:string;
    isTransfertAcq?: boolean; 
    dateTranfertAcq ?:string;  
}

export interface etatLogonConnexion {  
    dateChgtEtat: string; 
    etat: Etat;
    infoEtat: string;
    log: string;
}

export interface etatLogonConnexionSimplifiee {  
    fromDate: string; 
    toDate: string;
    name: string; //connexion/logon/frequence
    infoEtat: string; //logue, non logue , connecte, non connecte
    color?:Color;
    //logs:[etatLogonConnexion];
}