import { Identifiants } from './identifiants';
import { creneauHoraire } from './date';
import { Etat } from './enumEtat';
import { Color } from '@amcharts/amcharts4/core';

export interface interfaceBdd {
    id: string;
    plnid: string;
    arcid: string;
    entree_date: string;
    vol_date: string;
    contexte:string;
  }
  
export interface checkAnswerInitial {
    valeurRetour: number;
    plnid?: number;
    arcid?: string;
    tabId?: Identifiants[]; //pour LPLN
    creneauHoraire?: creneauHoraire[]; //pour VEMGSA ou LPLN
    datesFichierVemgsa?: creneauHoraire;
}
  
export interface checkAnswer { 
    analysePossible: boolean; 
    plnid?: number; 
    arcid?: string; 
    creneauHoraire?: creneauHoraire;
    listeIdentifiants?: Identifiants[];
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
    deltaT?:number;
}

export interface etatLogonConnexion {  
    dateChgtEtat: string; 
    etat: Etat;
    infoEtat: string;
    log: string;
}

export interface etatLogonConnexionSimplifiee extends etatTransfertFrequence {  
    fromDate: string; 
    toDate: string;
    name: string; //connexion/logon/frequence
    infoEtat?: string; //logue, non logue , connecte, non connecte
    logs?:string[]
    color?:Color;
    typeLog?: string;
    typeFreq?: string;
    typeLogon? : string;
    typeConnexion? : string;
    typeEtat : string;
    icon : string;
    text: string;
    //logs:[etatLogonConnexion];
}

export interface erreurVol {
    date: string;
    heure ?: string[];
    type : string;
    infos : string;
}
