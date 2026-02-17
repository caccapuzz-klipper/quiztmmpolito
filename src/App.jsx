import React, { useState, useEffect } from 'react';
import {
  BookOpen, CheckCircle2, XCircle, Layout, Trophy, Shuffle,
  ChevronLeft, ChevronRight, Check, Clock, Home, Settings2, RotateCcw
} from 'lucide-react';

// --- IL TUO DATABASE GLOBALE DELLE DOMANDE ---
// Aggiungi qui le tue domande. Tutti gli utenti vedranno queste.
const GLOBAL_QUESTIONS = [
  {
    id: 1,
    text: "Materiale con più deformabilità tra Mn,Nb,Si,Be,Sn?",
    options: ["Sn", "Mn", "Nb", "Si", "Be"],
    correctAnswer: 0
  },
  {
    id: 2,
    text: "Quale dei seguenti è uno stabilizzante per l’austenite?",
    options: ["Rh", "Cs", "Ta", "Sb", "O"],
    correctAnswer: 0
  },
  {
    id: 3,
    text: "Perchè lo Zn viene utilizzato per proteggere il Fe dall’ossidazione?",
    options: ["Zn cede e- ad O al posto del Fe (cioè si ossida lo zinco al posto del ferro)", "Zn funge da barriera puramente meccanica senza reazioni elettrochimiche", "Zn riduce il Fe ossidato riportandolo allo stato metallico", "Zn cede protoni all'acqua inibendo la corrosione acida", "Zn forma un ossido nobile che passiva il ferro sottostante"],
    correctAnswer: 0
  },
  {
    id: 4,
    text: "Struttura cristallina della martensite rinvenuta 150-230 °C?",
    options: ["Tetragonale", "Cubica a corpo centrato (CCC)", "Cubica a facce centrate (CFC)", "Esagonale compatta (EC)", "Ortorombica"],
    correctAnswer: 0
  },
  {
    id: 5,
    text: "Quale di questi è un materiale diamagnetico?",
    options: ["Zn", "Na", "Mo", "Ti", "Cr"],
    correctAnswer: 0
  },
  {
    id: 6,
    text: "Alligante che rende le leghe a base di Al induribili per invecchiamento?",
    options: ["Si", "V", "Bi", "W", "Sb"],
    correctAnswer: 0
  },
  {
    id: 7,
    text: "Negli acciai basso legati, il ruolo principale del Mn risulta essere:",
    options: ["Aumenta durezza dopo bonifica", "Affina il grano austenitico", "Previene la fragilità da rinvenimento", "Migliora la lavorabilità alle macchine utensili", "Aumenta la resistenza alla corrosione intergranulare"],
    correctAnswer: 0
  },
  {
    id: 8,
    text: "36NiCrMo16 è un acciaio:",
    options: ["Autotemprante", "Da cementazione", "Da nitrurazione", "Inossidabile martensitico", "Da utensili per lavorazioni a freddo"],
    correctAnswer: 0
  },
  {
    id: 9,
    text: "Temperatura per nitrurazione in NaCN:",
    options: ["570 °C (nitrurazione liquida)", "720 °C (nitrurazione gassosa)", "950 °C (cianurazione profonda)", "400 °C (nitrurazione ionica bassa temperatura)", "850 °C (carbonitrurazione)"],
    correctAnswer: 0
  },
  {
    id: 10,
    text: "Dato l’acciaio AISI 1080, struttura dopo la normalizzazione:",
    options: ["Perlitica fine", "Martensitica", "Bainitica superiore", "Sferoidale", "Ferritica e perlitica grossolana"],
    correctAnswer: 0
  },
  {
    id: 11,
    text: "Alfageni:",
    options: ["Aumentano Ac1 e diminuiscono Ac3", "Diminuiscono Ac1 e aumentano Ac3", "Abbassano sia Ac1 che Ac3", "Innalzano sia Ac1 che Ac3", "Non hanno alcun effetto pratico sui punti critici"],
    correctAnswer: 0
  },
  {
    id: 12,
    text: "Ghise: durante solidificazione:",
    options: ["Hanno arresto eutettico", "Hanno solo arresto peritettico", "Subiscono una trasformazione eutettoidica isoterma", "Non presentano alcun arresto termico", "Solidificano in un intervallo di temperatura senza arresti"],
    correctAnswer: 0
  },
  {
    id: 13,
    text: "Negli acciai maraging è FALSO che:",
    options: ["Ni forma composti con Mo", "Il carbonio è presente in tracce (<0.03%)", "Si raffreddano in aria ottenendo martensite", "L'indurimento è dovuto a precipitati intermetallici", "Il cobalto abbassa la solubilità del molibdeno"],
    correctAnswer: 0
  },
  {
    id: 14,
    text: "Temperatura di ricottura per le ghise sferoidali:",
    options: ["(850-920)°C", "(600-700)°C", "(1000-1100)°C", "(720-780)°C", "(450-550)°C"],
    correctAnswer: 0
  },
  {
    id: 15,
    text: "Negli acciai per molle, chi aumenta il limite elastico?",
    options: ["Si (Silicio)", "Cr (Cromo)", "Ni (Nichel)", "Cu (Rame)", "Al (Alluminio)"],
    correctAnswer: 0
  },
  {
    id: 16,
    text: "Struttura martensitica post normalizzazione:",
    options: ["Maraging (iniziano con 18Ni) oppure Alto Legati", "Acciai al carbonio ipoeutettoidici", "Acciai da cementazione basso legati", "Acciai inossidabili austenitici", "Ghise bianche"],
    correctAnswer: 0
  },
  {
    id: 17,
    text: "Per %C gli acciai Hadfield sono considerati:",
    options: ["Extraduri", "Extradolci", "Semiduri", "Dolci", "Ipoeutettoidici a basso carbonio"],
    correctAnswer: 0
  },
  {
    id: 18,
    text: "Quale dei seguenti acciai può arrivare ad una T= 193 K (-80 °C)?",
    options: ["15NiMn6", "C45", "Fe360", "100Cr6", "AISI 1020"],
    correctAnswer: 0
  },
  {
    id: 19,
    text: "Secondo la normativa AISI per gli acciai basso-legati 13xx principale alligante:",
    options: ["Mn (1,75 %)", "Ni (3,50 %)", "Cr (1,00 %)", "Mo (0,25 %)", "Si (2,00 %)"],
    correctAnswer: 0
  },
  {
    id: 20,
    text: "Struttura AISI 446 dopo tempra in aria da T=1050°C?",
    options: ["Ferritica", "Martensitica", "Austenitica", "Bainitica", "Perlitica"],
    correctAnswer: 0
  },
  {
    id: 21,
    text: "%Si nelle ghise al Si resistenti al calore?",
    options: ["4-6%", "1-2%", "10-14%", "0.5-1%", "8-10%"],
    correctAnswer: 0
  },
  {
    id: 22,
    text: "Negli acciai HSLA quale elemento ha sostituito B per struttura bainitica?",
    options: ["Nb (ma anche Mo)", "V (Vanadio)", "Ti (Titanio)", "Cr (Cromo)", "W (Tungsteno)"],
    correctAnswer: 0
  },
  {
    id: 23,
    text: "L’acciaio 41CrAlMo7 è:",
    options: ["Da nitrurazione", "Da cementazione", "Autotemprante", "Per molle", "Inossidabile ferritico"],
    correctAnswer: 0
  },
  {
    id: 24,
    text: "A che T viene effettuato l’invecchiamento dei maraging?",
    options: ["T=480°C", "T=150°C", "T=300°C", "T=650°C", "T=850°C"],
    correctAnswer: 0
  },
  {
    id: 25,
    text: "Nel calcolo del PREN per i duplex, quali altri elementi entrano in gioco oltre al Cr?",
    options: ["Mo e N", "Ni e C", "Si e Mn", "Ti e Nb", "Cu e S"],
    correctAnswer: 0
  },
  {
    id: 26,
    text: "Nel rinvenimento in quale intervallo di Temp. si genera SORBITE?",
    options: ["150-230 °C", "300-400 °C", "500-650 °C", "700-720 °C", "50-100 °C"],
    correctAnswer: 0
  },
  {
    id: 27,
    text: "Quale parametro viene definito k dalla formula di Harris?",
    options: ["Nessuna (k è il fattore di profondità)", "Il coefficiente di diffusione del carbonio", "Il tempo di mantenimento a temperatura", "La concentrazione superficiale di carbonio", "L'energia di attivazione del processo"],
    correctAnswer: 0
  },
  {
    id: 28,
    text: "Quale metallo NON presenta la stessa struttura cristallina del Ti?",
    options: ["Sn", "Zr", "Cd", "Ru", "Mg"],
    correctAnswer: 0
  },
  {
    id: 29,
    text: "A quale T avviene eutettoide in Fe-C?",
    options: ["740°C", "912°C", "1147°C", "1495°C", "1000°C"],
    correctAnswer: 0
  },
  {
    id: 30,
    text: "Gli acciai per funi presentano una struttura:",
    options: ["Perlitica fine", "Martensitica", "Bainitica", "Austenitica", "Sferoidale"],
    correctAnswer: 0
  },
  {
    id: 31,
    text: "Nell’acciaio AISI 347 quale elemento esercita protezione per la corrosione intergranulare?",
    options: ["Nb", "Ti", "Mo", "V", "Ta"],
    correctAnswer: 0
  },
  {
    id: 32,
    text: "Nelle leghe al Ti quale elemento stabilizza la fase beta fino a T ambiente?",
    options: ["Al", "Mo", "V", "Sn", "Zr"],
    correctAnswer: 0
  },
  {
    id: 33,
    text: "Negli acciai inox ferritici l’intervallo di T in cui si verifica la precipitazione della fase sigma è:",
    options: ["550-850°C", "200-400°C", "900-1050°C", "400-500°C", "1100-1250°C"],
    correctAnswer: 0
  },
  {
    id: 34,
    text: "Concentrazione di Al in un acciaio da nitrurazione?",
    options: ["0,8%", "0,2%", "1,5%", "2,0%", "0,05%"],
    correctAnswer: 0
  },
  {
    id: 35,
    text: "Nelle leghe di Al serie 4xxx l’alligante principale è:",
    options: ["Si", "Cu", "Mg", "Zn", "Mn"],
    correctAnswer: 0
  },
  {
    id: 36,
    text: "Quale dei seguenti acciai presenta la maggiore temprabilità?",
    options: ["AISI 4340 (o AISI 410)", "AISI 1045", "AISI 1020", "AISI 1080", "AISI 304"],
    correctAnswer: 0
  },
  {
    id: 37,
    text: "A parità di concentrazione quale alligante riduce maggiormente la conducibilità elettrica del Cu?",
    options: ["Al", "Cd", "Ni", "Zn", "Sn"],
    correctAnswer: 0
  },
  {
    id: 38,
    text: "T eutettica del diagramma Al-Mg2Si:",
    options: ["595°C", "548°C", "660°C", "450°C", "505°C"],
    correctAnswer: 0
  },
  {
    id: 39,
    text: "Quali acciai vengono utilizzati fino a T=520°C?",
    options: ["C(0,14%) Cr(1%), Mo (0,5%)", "C(0,40%) Cr(13%)", "C(0,20%) Ni(3%) Cr(1%)", "C(0,80%) W(18%) Cr(4%) V(1%)", "C(0,05%) Cr(18%) Ni(8%)"],
    correctAnswer: 0
  },
  {
    id: 40,
    text: "Gli acciai da profondo stampaggio hanno struttura:",
    options: ["Austenitica", "Ferritica", "Martensitica", "Bainitica", "Perlitica"],
    correctAnswer: 0
  },
  {
    id: 41,
    text: "Nel diagramma Fe-C il contenuto di C nell’eutettoide risulta essere:",
    options: ["0,65%", "0,77%", "0,80%", "2,11%", "4,30%"],
    correctAnswer: 0
  },
  {
    id: 42,
    text: "Quale lega di Al non può essere trattata termicamente?",
    options: ["Al-Cu-Mg-Zr", "Al-Mg-Si", "Al-Zn-Mg-Cu", "Al-Cu-Mg", "Al-Li-Cu-Mg"],
    correctAnswer: 0
  },
  {
    id: 43,
    text: "La struttura cristallina di Fe3C è:",
    options: ["Ortorombica", "Cubica a corpo centrato (CCC)", "Cubica a facce centrate (CFC)", "Esagonale compatta (EC)", "Tetragonale a corpo centrato"],
    correctAnswer: 0
  },
  {
    id: 44,
    text: "Nel trattamento termico di patentamento, il mezzo temprante è:",
    options: ["Metallo fuso (Pb tra 500-550°C)", "Acqua agitata a 20°C", "Olio minerale a 60°C", "Aria calma a temperatura ambiente", "Soluzione salina (salamoia) al 10%"],
    correctAnswer: 0
  },
  {
    id: 45,
    text: "Quale metallo ha la stessa struttura cristallina del Ti:",
    options: ["Co", "W", "Rh", "Sn", "V"],
    correctAnswer: 0
  },
  {
    id: 46,
    text: "Quale INOX ha struttura martensitica post tempra?",
    options: ["AISI 440", "AISI 304", "AISI 316", "AISI 430", "AISI 201"],
    correctAnswer: 0
  },
  {
    id: 47,
    text: "Temperatura di Curie del Ni?",
    options: ["335°C (347,345) (768°C Fe ; 1120°C Co)", "768°C", "1120°C", "1043°C", "550°C"],
    correctAnswer: 0
  },
  {
    id: 48,
    text: "Quale materiale viene usato nell’intervallo di temp. -80 / -45°C?",
    options: ["Acciaio 1,5% Ni", "Acciaio 9% Ni", "Acciaio al carbonio C45", "Ghisa grigia", "Acciaio rapido HSS"],
    correctAnswer: 0
  },
  {
    id: 49,
    text: "In lega con quale elemento Mg viene utilizzato per il trattamento della sferoidizzazione delle ghise?",
    options: ["Ni (il Cerio (Ce) si usa da solo, è un alternativa)", "Cu", "Si", "Al", "Mn"],
    correctAnswer: 0
  },
  {
    id: 50,
    text: "L’acciaio 39CrNiMo3:",
    options: ["Da bonifica", "Da cementazione", "Da nitrurazione", "Per molle", "Autotemprante"],
    correctAnswer: 0
  },
  {
    id: 51,
    text: "T di rinvenimento acciai autotempranti:",
    options: ["200°C", "400°C", "600°C", "800°C", "150°C"],
    correctAnswer: 0
  },
  {
    id: 52,
    text: "Struttura acciai TWIP:",
    options: ["Austenitica", "Ferritica", "Martensitica", "Bainitica", "Duplex (Austenitica+Ferritica)"],
    correctAnswer: 0
  },
  {
    id: 53,
    text: "Chi ha lo stesso grado di deformabilità del Cromo?",
    options: ["Be", "Cu", "Al", "Pb", "Sn"],
    correctAnswer: 0
  },
  {
    id: 54,
    text: "Quale metallo protegge AISI 321 da corrosione?",
    options: ["Ti", "Nb", "Mo", "V", "Ta"],
    correctAnswer: 0
  },
  {
    id: 55,
    text: "%Si ghisa sferoidale:",
    options: ["2,3%", "1,5%", "0,8%", "4,5%", "3,8%"],
    correctAnswer: 0
  },
  {
    id: 56,
    text: "Negli INOX austenitici indurenti per precipitazione qual’è la T di invecchiamento?",
    options: ["700-740 °C", "450-500 °C", "850-900 °C", "150-200 °C", "1000-1050 °C"],
    correctAnswer: 0
  },
  {
    id: 57,
    text: "Struttura acciai TRIP:",
    options: ["Austenitica+ferritica+bainitica", "Solo martensitica", "Austenitica+perlitica", "Ferritica+perlitica", "Sferoiditica"],
    correctAnswer: 0
  },
  {
    id: 58,
    text: "Negli acciai INOX austenitici, qual’è la T di precipitazione della fase sigma?",
    options: ["NON precipita", "400-500°C", "600-850°C", "900-1050°C", "200-300°C"],
    correctAnswer: 0
  },
  {
    id: 59,
    text: "Dopo la tempra in aria di AISI 430 da T=1000°C, la struttura cristallina ottenuta è:",
    options: ["Ferritica", "Martensitica", "Austenitica", "Bainitica", "Perlitica"],
    correctAnswer: 0
  },
  {
    id: 60,
    text: "Rinvenimento acciai per molle a T?:",
    options: ["400-450 °C", "150-200 °C", "550-600 °C", "250-300 °C", "650-700 °C"],
    correctAnswer: 0
  },
  {
    id: 61,
    text: "Quale elemento si inserisce in lega con Fe per i lamierini magnetici/automatici?:",
    options: ["Si", "Mn", "Cr", "Ni", "Cu"],
    correctAnswer: 0
  },
  {
    id: 62,
    text: "%S negli acciai automatici:",
    options: ["0,20-0,26%", "0,01-0,05%", "0,50-0,80%", "1,0-1,5%", "0,08-0,13%"],
    correctAnswer: 0
  },
  {
    id: 63,
    text: "Negli acciai HSLA quale elemento ha sostituito B al fine di ottenere struttura bainitica?:",
    options: ["Mo", "V", "Ti", "Nb", "W"],
    correctAnswer: 0
  },
  {
    id: 64,
    text: "Quale parametro viene definito dalla formula di Harris?:",
    options: ["Profondità di cementazione", "Durezza superficiale", "Tempo di austenitizzazione", "Concentrazione di carbonio al cuore", "Velocità di raffreddamento critico"],
    correctAnswer: 0
  },
  {
    id: 65,
    text: "Sulla base del tenore medio di C gli acciai da bonifica sono classificati come:",
    options: ["Semiduri", "Extraduri", "Dolci", "Extradolci", "Duri"],
    correctAnswer: 0
  },
  {
    id: 66,
    text: "I dual-phase presentano struttura:",
    options: ["Martensitica + ferritica", "Austenitica + ferritica", "Perlitica + ferritica", "Bainitica + martensitica", "Austenitica + martensitica"],
    correctAnswer: 0
  },
  {
    id: 67,
    text: "In riferimento al DDS Al-Cu, la trasformazione eutettica avviene a:",
    options: ["T=550°C", "T=660°C", "T=595°C", "T=450°C", "T=723°C"],
    correctAnswer: 0
  },
  {
    id: 68,
    text: "Nella corrosione in fessura dell’acciaio AISI 316 in ambiente biologico, quale ione subisce idrolisi?:",
    options: ["Fe2+ (o Cr3+)", "Ni2+", "Mo6+", "Ti4+", "Cl-"],
    correctAnswer: 0
  },
  {
    id: 69,
    text: "Negli acciai basso legati il ruolo principale del Ni risulta essere:",
    options: ["Stabilizza l’austenite a T ambiente", "Aumenta la temprabilità", "Affina il grano", "Previene la corrosione intergranulare", "Forma carburi duri"],
    correctAnswer: 0
  },
  {
    id: 70,
    text: "La concentrazione di Silicio (Si) in una ghisa bianca è all’incirca:",
    options: ["0,5%", "2,5%", "4,0%", "1,5%", "3,2%"],
    correctAnswer: 0
  },
  {
    id: 71,
    text: "Quale dei seguenti metalli presenta lo stesso reticolo cristallino dell’Alluminio:",
    options: ["Pb", "Nb", "Cr", "Mo", "Mg"],
    correctAnswer: 0
  },
  {
    id: 72,
    text: "Negli acciai automatici, l’alligante che consente miglior lavorabilità è:",
    options: ["S", "W", "Si", "Sb", "Ta"],
    correctAnswer: 0
  },
  {
    id: 73,
    text: "Struttura 1045 dopo ricottura di distensione:",
    options: ["Ferrite + perlite", "Martensite rinvenuta", "Sferoidite", "Bainite inferiore", "Austenite residua"],
    correctAnswer: 0
  },
  {
    id: 74,
    text: "In acciai per molle quale alligante provoca, in opportune concentrazioni, una sensibile diminuzione della duttilità?",
    options: ["Silicio", "Manganese", "Vanadio", "Nichel", "Molibdeno"],
    correctAnswer: 0
  },
  {
    id: 75,
    text: "Cu in lega AA2090:",
    options: ["2.7%", "4.4%", "1.2%", "5.5%", "0.8%"],
    correctAnswer: 0
  },
  {
    id: 76,
    text: "Sulla base del tenore di C gli acciai maraging possono definirsi:",
    options: ["Extradolci", "Extraduri", "Semiduri", "Duri", "Ipoeutettoidici ad alto carbonio"],
    correctAnswer: 0
  },
  {
    id: 77,
    text: "Quale acciaio per ingranaggi motori a reazione?",
    options: ["4140", "4340", "8620", "52100", "1045"],
    correctAnswer: 0
  },
  {
    id: 78,
    text: "Negli acciai HSLA quale elemento sostituisce il boro al fine di avere struttura aciculare?",
    options: ["Nb", "Mo", "V", "Ti", "W"],
    correctAnswer: 0
  },
  {
    id: 79,
    text: "Stato termico lega AA7075:",
    options: ["T6", "T3", "T8", "H112", "O"],
    correctAnswer: 0
  },
  {
    id: 80,
    text: "Temp invecchiamento 17-4 ph:",
    options: ["425-675 °C", "150-250 °C", "700-850 °C", "300-400 °C", "900-1050 °C"],
    correctAnswer: 0
  },
  {
    id: 81,
    text: "Struttura dopo tempra in aria di acciaio 420:",
    options: ["Martensitico", "Austenitico", "Perlitica", "Bainitico", "Perlitica fine"],
    correctAnswer: 0
  },
  {
    id: 82,
    text: "Quale acciaio utilizzato fino a temp di 793K?",
    options: ["Cr 1% e Mo 0.5%", "Cr 13% e Ni 4%", "W 18% e V 1%", "Ni 9% e Mn 1%", "Si 2% e Cr 5%"],
    correctAnswer: 0
  },
  {
    id: 83,
    text: "La struttura di AISI 4340 dopo austenitizzazione + tempra in aria è:",
    options: ["Martensitica + bainitica", "Austenitica", "Perlitica fine", "Bainitica + ferritica", "Esclusivamente martensitica"],
    correctAnswer: 0
  },
  {
    id: 84,
    text: "Nelle leghe di Al della serie 7xxx gli alliganti principali sono:",
    options: ["Mg-Zn", "Cu-Mg", "Si-Mg", "Mn-Cu", "Li-Cu"],
    correctAnswer: 0
  },
  {
    id: 85,
    text: "Il rame può essere purificato per via elettrica utilizzando soluzione acquose, vale anche per Al?:",
    options: ["No, perché usando soluzioni contenenti Al3+ gli anioni presenti non permetterebbero la riduzione del catione.", "Sì, il processo Bayer sfrutta proprio l'elettrolisi in soluzione acquosa per l'alluminio.", "No, perché l'alluminio in soluzione acquosa sublima a temperatura ambiente.", "Sì, ma solo se si utilizzano elettrodi in platino anziché in grafite.", "No, perché l'alluminio passiva immediatamente l'anodo impedendo il flusso di corrente."],
    correctAnswer: 0
  },
  {
    id: 86,
    text: "Quale dei seguenti metalli è PARAMAGNETICO?:",
    options: ["Zr", "Cu", "Si", "Zn", "Hg"],
    correctAnswer: 0
  },
  {
    id: 87,
    text: "Quale dei seguenti elementi è stabilizzante della ferrite:",
    options: ["Sn", "Ni", "Mn", "Cu", "Co"],
    correctAnswer: 0
  },
  {
    id: 88,
    text: "In quale dei seguenti accoppiamenti Galvanici il Cu costituisce l’anodo?:",
    options: ["Nessuno", "Cu - Zn", "Cu - Fe", "Cu - Al", "Cu - Mg"],
    correctAnswer: 0
  },
  {
    id: 89,
    text: "Struttura AISI 1055 dopo normalizzazione?:",
    options: ["Perlitica fine", "Martensitica", "Bainitica", "Sferoidale", "Austenitica"],
    correctAnswer: 0
  },
  {
    id: 90,
    text: "Quale acciaio per T<520 °C?:",
    options: ["1%Cr 0,5% Mo", "18%Cr 8%Ni", "5%Cr 1%V", "13%Cr", "0.2%C 1.5%Mn"],
    correctAnswer: 0
  },
  {
    id: 91,
    text: "A quale T vengono riscaldati gli Hadfield per solubizzare i carburi di Fe e Mn?:",
    options: ["1050°C", "720°C", "850°C", "1250°C", "500°C"],
    correctAnswer: 0
  },
  {
    id: 92,
    text: "Quale composto viene utilizzato per la decarburazione superficiale delle ghise malleabili a cuore bianco?:",
    options: ["Fe2O3", "CaCO3", "SiO2", "NaCl", "NaCN"],
    correctAnswer: 0
  },
  {
    id: 93,
    text: "T di rinvenimento acciai lavorati a freddo:",
    options: ["180°C", "350°C", "550°C", "700°C", "850°C"],
    correctAnswer: 0
  },
  {
    id: 94,
    text: "Quale materiale viene utilizzato tra -45°C e -25°C?:",
    options: ["Acciaio 1% Mn normalizzato", "Acciaio 9% Ni tempra e rinvenimento", "Ghisa sferoidale", "Acciaio inossidabile martensitico", "Acciaio rapido HSS"],
    correctAnswer: 0
  },
  {
    id: 95,
    text: "L’acciaio 100Cr6 è un acciaio:",
    options: ["Per cuscinetti a rotolamento", "Da costruzione generica", "Inossidabile austenitico", "Per molle", "Da profondo stampaggio"],
    correctAnswer: 0
  },
  {
    id: 96,
    text: "T di trattamento della cementazione gassosa:",
    options: ["900°C", "700°C", "550°C", "1100°C", "400°C"],
    correctAnswer: 0
  },
  {
    id: 97,
    text: "Struttura della martensite nei maraging e Hadfield:",
    options: ["CCC", "CFC", "Tetragonale", "Esagonale", "Ortorombica"],
    correctAnswer: 0
  },
  {
    id: 98,
    text: "Quale acciaio viene sottoposto a tempra martensitica:",
    options: ["Dual Phase", "TRIP", "TWIP", "IF (Interstitial Free)", "HSLA al Niobio"],
    correctAnswer: 0
  },
  {
    id: 99,
    text: "Quale elemento viene aggiunto alla lega fusa per ottenere ghise sferoidali?:",
    options: ["Mg", "Si", "Mn", "S", "P"],
    correctAnswer: 0
  },
  {
    id: 100,
    text: "Quali elementi incidono sul PREN di un INOX ferritico?:",
    options: ["Cr, Mo", "Ni, Cu", "Ti, Nb", "Si, Mn", "C, S"],
    correctAnswer: 0
  },
  {
    id: 101,
    text: "Cosa indica la lettera E secondo la nomenclatura UNI EN 10027?:",
    options: ["Acciai per costruzioni meccaniche", "Acciai per impieghi a pressione", "Acciai da bonifica", "Acciai inossidabili", "Acciai per utensili"],
    correctAnswer: 0
  },
  {
    id: 102,
    text: "Quale elemento NON è alfageno?:",
    options: ["Cu (gammageno)", "Cr", "Mo", "Si", "V"],
    correctAnswer: 0
  },
  {
    id: 103,
    text: "Quale acciaio presenta nella microstruttura austenite residua che conferisce resistenza agli urti?:",
    options: ["TRIP", "Dual Phase", "Maraging", "Acciai IF", "Acciai da nitrurazione"],
    correctAnswer: 0
  },
  {
    id: 104,
    text: "L’acciaio 177PH in quale intervallo di temperatura viene invecchiato?:",
    options: ["480-650°C", "150-250°C", "800-950°C", "300-400°C", "1000-1100°C"],
    correctAnswer: 0
  },
  {
    id: 105,
    text: "In quale acciaio inox è presente Mo:",
    options: ["AISI 316", "AISI 304", "AISI 430", "AISI 410", "AISI 201"],
    correctAnswer: 0
  },
  {
    id: 106,
    text: "Acciaio che ha struttura martensitica dopo normalizzazione?:",
    options: ["36NiCrMo16", "C45", "100Cr6", "AISI 304", "Fe360"],
    correctAnswer: 0
  },
  {
    id: 107,
    text: "Negli acciai HSLA quale materiale ha parzialmente sostituito il Mn al fine di ottenere struttura bainitica fine?:",
    options: ["Cr", "Ni", "Cu", "Si", "Al"],
    correctAnswer: 0
  },
  {
    id: 108,
    text: "L’acciaio 31CrMoV10 è un acciaio da:",
    options: ["Nitrurazione", "Cementazione", "Costruzione di base", "Profondo stampaggio", "Getti"],
    correctAnswer: 0
  },
  {
    id: 109,
    text: "L’acciaio 52CrMoV4 è un acciaio:",
    options: ["Per molle", "Da cuscinetti", "Autotemprante", "Inossidabile austenitico", "Da costruzione di base"],
    correctAnswer: 0
  },
  {
    id: 110,
    text: "Sulla base del tenore di carbonio gli acciai maraging si classificano come:",
    options: ["Extradolci", "Semiduri", "Duri", "Extraduri", "Eutettoidici"],
    correctAnswer: 0
  },
  {
    id: 111,
    text: "Fino a 450°C quale acciaio può essere impiegato?:",
    options: ["16Mo5", "AISI 316L", "100Cr6", "C10", "AISI 430"],
    correctAnswer: 0
  },
  {
    id: 112,
    text: "Secondo la normativa AISI per acciai basso-legati qual’è l’alligante principale per la serie 50xx:",
    options: ["Cr", "Ni", "Mo", "Mn", "Si"],
    correctAnswer: 0
  },
  {
    id: 113,
    text: "L’acciaio 1710PH a che temperatura viene invecchiato?:",
    options: ["700-740°C", "480-650°C", "150-200°C", "900-1000°C", "300-400°C"],
    correctAnswer: 0
  },
  {
    id: 114,
    text: "L’acciaio 174PH a che temperatura viene invecchiato?:",
    options: ["425-675°C (Acciai indurenti per precipitazione martensitici)", "100-200°C", "850-950°C", "1050-1150°C", "700-800°C"],
    correctAnswer: 0
  },
  {
    id: 115,
    text: "In quale acciaio inox austenitico è presente Nb?:",
    options: ["AISI 347 (stabilizzato al niobio)", "AISI 304", "AISI 316", "AISI 430", "AISI 440C"],
    correctAnswer: 0
  },
  {
    id: 116,
    text: "Secondo la normativa UNI EN 10027 la lettera B indica:",
    options: ["Acciai per CEMENTO ARMATO", "Acciai per recipienti a pressione", "Acciai per tubi", "Acciai per impieghi magnetici", "Acciai da bonifica"],
    correctAnswer: 0
  },
  {
    id: 117,
    text: "Gli acciai duplex in quale intervallo di temperatura sono sottoposti a ricottura per stabilizzazione?:",
    options: ["1050-1150°C", "600-700°C", "850-950°C", "400-500°C", "1250-1350°C"],
    correctAnswer: 0
  },
  {
    id: 118,
    text: "Negli acciai HSLA quale elemento NON viene utilizzato al fine di ottenere una struttura bainitica (aciculare)?:",
    options: ["V", "Mo", "Cr", "Nb", "B"],
    correctAnswer: 0
  },
  {
    id: 119,
    text: "Quale lega viene utilizzata per il trattamento di sferoidizzazione delle ghise?:",
    options: ["Mg-Ni", "Fe-Si", "Cu-Zn", "Al-Cu", "Pb-Sn"],
    correctAnswer: 0
  },
  {
    id: 120,
    text: "In quale intervallo di temperatura viene austenitizzato l’acciaio 40CrNiMo3:",
    options: ["830-850°C (tempra superficiale)", "1000-1050°C", "720-740°C", "950-1000°C", "650-680°C"],
    correctAnswer: 0
  },
  {
    id: 121,
    text: "Quale affermazione sui maraging è falsa?:",
    options: ["Hanno un tenore di Mo inferiore al 2% (è >= 2%)", "Contengono elevate percentuali di Nichel (es. 18%)", "L'indurimento avviene per precipitazione di composti intermetallici", "Il carbonio è presente in quantità bassissime (<0.03%)", "Si raffreddano in aria per ottenere martensite"],
    correctAnswer: 0
  },
  {
    id: 122,
    text: "Gli acciai da tempra superficiale in base al tenore di carbonio si possono classificare come:",
    options: ["SEMIDURI", "Extradolci", "Extraduri", "Eutettoidici", "Duri"],
    correctAnswer: 0
  },
  {
    id: 123,
    text: "Struttura acciai per funi dopo patentamento:",
    options: ["Perlitica fine", "Martensitica", "Bainitica", "Austenitica", "Sferoidale"],
    correctAnswer: 0
  },
  {
    id: 124,
    text: "Quale acciaio NON assume struttura martensitica dopo normalizzazione:",
    options: ["X35CrWMoV5", "36NiCrMo16", "Maraging 18Ni", "Acciai autotempranti", "AISI 420"],
    correctAnswer: 0
  },
  {
    id: 125,
    text: "Nelle ghise al Cr resistenti alla corrosione la % max di Cu è pari a :",
    options: ["3%", "0.5%", "1.5%", "5%", "8%"],
    correctAnswer: 0
  },
  {
    id: 126,
    text: "L’acciaio 45NiCrMo16 è:",
    options: ["Acciaio per lavorazioni a freddo / acciaio da utensili", "Acciaio da cementazione", "Acciaio per molle", "Acciaio inossidabile ferritico", "Acciaio per profondo stampaggio"],
    correctAnswer: 0
  },
  {
    id: 127,
    text: "Temperatura limite e di utilizzo degli acciai duplex:",
    options: ["300°C", "550°C", "800°C", "150°C", "450°C"],
    correctAnswer: 0
  },
  {
    id: 128,
    text: "Le ruote dei treni sono realizzate in:",
    options: ["AISI 1060", "AISI 1020", "AISI 4340", "AISI 304", "AISI 52100"],
    correctAnswer: 0
  },
  {
    id: 129,
    text: "I lamierini per trasformatori vengono prodotti utilizzando la lega:",
    options: ["Fe-Si", "Fe-Ni", "Fe-Co", "Fe-Mn", "Fe-Cr"],
    correctAnswer: 0
  },
  {
    id: 130,
    text: "Quale elemento stabilizza la fase alpha nelle leghe a base di titanio?:",
    options: ["Al (da internet)", "V", "Mo", "Cr", "Fe"],
    correctAnswer: 0
  },
  {
    id: 131,
    text: "Negli acciai HSLA quale elemento ha sostituito B al fine di ottenere struttura bainitica?:",
    options: ["Mo", "V", "Ti", "Nb", "W"],
    correctAnswer: 0
  },
  {
    id: 132,
    text: "Quale parametro viene definito dalla formula di Harris?:",
    options: ["Profondità di cementazione", "Durezza superficiale", "Tempo di austenitizzazione", "Concentrazione di carbonio al cuore", "Velocità di raffreddamento critico"],
    correctAnswer: 0
  },
  {
    id: 133,
    text: "Sulla base del tenore medio di C gli acciai da bonifica sono classificati come:",
    options: ["Semiduri", "Extraduri", "Dolci", "Extradolci", "Duri"],
    correctAnswer: 0
  },
  {
    id: 134,
    text: "I dual-phase presentano struttura:",
    options: ["Martensitica + ferritica", "Austenitica + ferritica", "Perlitica + ferritica", "Bainitica + martensitica", "Austenitica + martensitica"],
    correctAnswer: 0
  },
  {
    id: 135,
    text: "In riferimento al DDS Al-Cu, la trasformazione eutettica avviene a:",
    options: ["T=550°C", "T=660°C", "T=595°C", "T=450°C", "T=723°C"],
    correctAnswer: 0
  },
  {
    id: 136,
    text: "Nella corrosione in fessura dell’acciaio AISI 316 in ambiente biologico, quale ione subisce idrolisi?:",
    options: ["Fe2+ (o Cr3+)", "Ni2+", "Mo6+", "Ti4+", "Cl-"],
    correctAnswer: 0
  }
  // Puoi incollare qui quante domande vuoi!
];

const App = () => {
  const [view, setView] = useState('dashboard');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizSettings, setQuizSettings] = useState({ questionLimit: 10 });
  
  // Carica lo storico dalla memoria del browser dell'utente
  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem('moodlePro_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Salva lo storico nella memoria del browser ogni volta che cambia
  useEffect(() => {
    localStorage.setItem('moodlePro_history', JSON.stringify(quizHistory));
  }, [quizHistory]);

  // --- LOGICA QUIZ ---
  const startRandomQuiz = () => {
    const shuffledQuestions = [...GLOBAL_QUESTIONS].sort(() => Math.random() - 0.5);
    const limit = Math.max(1, Math.min(quizSettings.questionLimit, GLOBAL_QUESTIONS.length));
    
    const selected = shuffledQuestions.slice(0, limit).map(q => {
      const optionsWithIndices = q.options.map((opt, i) => ({ text: opt, originalIdx: i }));
      const shuffledOptions = optionsWithIndices.sort(() => Math.random() - 0.5);
      const newCorrectIdx = shuffledOptions.findIndex(o => o.originalIdx === q.correctAnswer);
      
      return { 
        ...q, 
        options: shuffledOptions.map(o => o.text), 
        correctAnswer: newCorrectIdx 
      };
    });

    setActiveQuiz(selected);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setQuizFinished(false);
    setView('quiz');
  };

  const startRetryMistakes = (result) => {
    const wrongQuestions = result.quizData.filter((q, idx) => {
      return result.answers[idx] !== q.correctAnswer;
    });
    if (wrongQuestions.length === 0) return;

    setActiveQuiz(wrongQuestions);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setQuizFinished(false);
    setView('quiz');
  };

  const finalizeQuiz = () => {
    const correctCount = activeQuiz.reduce((acc, q, idx) => acc + (userAnswers[idx] === q.correctAnswer ? 1 : 0), 0);
    const score = Math.round((correctCount / activeQuiz.length) * 100);
    
    const newResult = {
      id: Date.now().toString(),
      score, 
      total: activeQuiz.length, 
      correct: correctCount, 
      date: new Date().toISOString(),
      answers: userAnswers, 
      quizData: activeQuiz 
    };

    // Aggiungi in cima allo storico
    setQuizHistory(prev => [newResult, ...prev]);
    setQuizFinished(true);
  };

  // --- COMPONENTI GRAFICI ---
  const SidebarItem = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => setView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
        ${view === id ? `bg-indigo-600 text-white shadow-lg` : `text-gray-500 hover:bg-gray-100`}`}
    >
      <Icon size={20} className={view === id ? 'text-white' : 'text-gray-400'} />
      <span className="text-sm">{label}</span>
    </button>
  );

  const Dashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Benvenuti, qui potete provare le simulazioni di TMM</h2>
          <p className="text-gray-500 font-medium italic">Preparazione TMM</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 px-2">
            <Settings2 size={18} className="text-gray-400" />
            <label className="text-xs font-black text-gray-400 uppercase">Quesiti:</label>
            <input 
              type="number" 
              min="1" 
              max={GLOBAL_QUESTIONS.length}
              value={quizSettings.questionLimit}
              onChange={(e) => setQuizSettings({...quizSettings, questionLimit: parseInt(e.target.value) || 1})}
              className="w-16 bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-bold text-indigo-600 outline-none"
            />
          </div>
          <button 
            onClick={startRandomQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 font-black shadow-lg"
          >
            <Shuffle size={18} /> AVVIA TEST
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Clock size={20} className="text-indigo-600"/> Il tuo Storico Recente</h3>
        <div className="space-y-3">
          {quizHistory.length === 0 ? <p className="text-gray-400 py-4 text-center">Nessun test effettuato da te finora.</p> : 
            quizHistory.slice(0, 10).map((res) => (
              <div key={res.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl flex-wrap gap-2">
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className={`p-2 rounded-lg font-black text-xs ${res.score >= 60 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{res.score}%</div>
                  <span className="text-sm font-bold text-gray-700">{res.correct}/{res.total} - {new Date(res.date).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 ml-auto">
                  {res.score < 100 && (
                    <button onClick={() => startRetryMistakes(res)} className="text-red-600 font-bold text-xs p-2 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 border border-red-100">
                      <RotateCcw size={14} /> Ripeti Errori
                    </button>
                  )}
                  <button onClick={() => { setActiveQuiz(res.quizData); setUserAnswers(res.answers); setQuizFinished(true); setView('quiz'); }} className="text-indigo-600 font-bold text-xs p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                    Esamina
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );

  const QuizView = () => {
    if (!activeQuiz) return null;
    if (quizFinished) {
      const correctCount = activeQuiz.reduce((acc, q, idx) => acc + (userAnswers[idx] === q.correctAnswer ? 1 : 0), 0);
      return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in duration-300">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
            <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Revisione Test</h2>
            <div className="text-6xl font-black text-indigo-600 mb-8">{Math.round((correctCount/activeQuiz.length)*100)}%</div>
            <button onClick={() => setView('dashboard')} className="bg-gray-900 text-white font-bold px-8 py-3 rounded-2xl hover:bg-black flex items-center gap-2 mx-auto">
              <ChevronLeft size={20}/> Torna alla Dashboard
            </button>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {activeQuiz.map((q, qIdx) => {
              const isUserCorrect = userAnswers[qIdx] === q.correctAnswer;
              return (
                <div key={qIdx} className="p-8">
                  <div className="flex gap-4 items-start mb-6">
                    <div className={`mt-1 p-1.5 rounded-full ${isUserCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-700'}`}>
                      {isUserCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-800 leading-tight mb-6">{qIdx + 1}. {q.text}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {q.options.map((option, optIdx) => {
                          const isCorrect = optIdx === q.correctAnswer;
                          const isSelected = optIdx === userAnswers[qIdx];
                          let border = "border-gray-100"; let bg = "bg-white opacity-50";
                          if (isCorrect) { border = "border-green-500"; bg = "bg-green-50 opacity-100"; }
                          else if (isSelected) { border = "border-red-500"; bg = "bg-red-50 opacity-100"; }
                          return (
                            <div key={optIdx} className={`p-4 rounded-2xl border-2 flex items-center gap-3 text-sm font-bold ${border} ${bg}`}>
                              {option}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    const q = activeQuiz[currentQuestionIdx];
    return (
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-start">
        <aside className="lg:w-64 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-28 w-full">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Mappa Test</h4>
          <div className="grid grid-cols-5 lg:grid-cols-4 gap-2 mb-8">
            {activeQuiz.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentQuestionIdx(idx)} 
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center 
                ${currentQuestionIdx === idx ? 'bg-indigo-600 text-white scale-110 shadow-lg' : 
                  userAnswers[idx] !== undefined ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button onClick={finalizeQuiz} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-xs hover:bg-black transition-all">CONSEGNA TEST</button>
        </aside>

        <div className="flex-1 w-full">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
            <div className="mb-10 flex justify-between items-center border-b border-gray-50 pb-6">
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Quesito {currentQuestionIdx + 1}</span>
              <div className="flex gap-2">
                <button disabled={currentQuestionIdx === 0} onClick={() => setCurrentQuestionIdx(prev => prev - 1)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 disabled:opacity-30"><ChevronLeft size={20}/></button>
                <button disabled={currentQuestionIdx === activeQuiz.length - 1} onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 disabled:opacity-30"><ChevronRight size={20}/></button>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-12 leading-snug">{q.text}</h3>
            <div className="space-y-4 mt-auto">
              {q.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQuestionIdx] === idx;
                return (
                  <button 
                    key={idx} 
                    onClick={() => setUserAnswers({...userAnswers, [currentQuestionIdx]: idx})} 
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-4 group 
                    ${isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-50 hover:border-indigo-200'}`}
                  >
                    <span className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-colors 
                    ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500'}`}>
                      {String.fromCharCode(65+idx)}
                    </span>
                    <span className={`font-semibold text-lg ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>{opt}</span>
                    {isSelected && <Check size={24} className="ml-auto text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-gray-900 pb-20 font-sans">
      <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg"><Layout size={24} /></div>
            <span className="text-xl font-black tracking-tighter italic uppercase">quiz<span className="text-indigo-600 text-2xl">TMM</span></span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          <div className="hidden lg:flex flex-col w-64 h-[calc(100vh-120px)] sticky top-28 gap-2">
            <SidebarItem id="dashboard" label="Dashboard & Quiz" icon={Home} />
          </div>
          <div className="flex-1">
            {view === 'dashboard' && <Dashboard />}
            {view === 'quiz' && <QuizView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;