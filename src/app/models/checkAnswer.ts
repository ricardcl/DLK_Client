

export interface checkAnswerInitial {
    valeurRetour: number;
    messageRetour: string
    plnid?: number;
    arcid?: string;
    
}

export interface checkAnswer {
    analysePossible: boolean;
    plnid?: number;
    arcid?: string;
    checkLPLN?: checkAnswerInitial;
    checkVEMGSA?: checkAnswerInitial;   
 
}

export interface checkAnswerSimplifie {
    analysePossible: boolean;
    plnid?: number;
    arcid?: string;
    messageLPLN?: string;
    messageVEMGSA?: string;   
 
}