import React, { useState, useEffect } from 'react';
import {
  BookOpen, CheckCircle2, XCircle, Layout, Trophy, Shuffle,
  ChevronLeft, ChevronRight, Check, Clock, Home, Settings2, RotateCcw, User, ImageIcon
} from 'lucide-react';

// --- I TUOI DATABASE DELLE DOMANDE ---

const ROSALBINO_QUESTIONS = [
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
];

const SCAVINO_QUESTIONS = [
  {
    id: 157,
    text: "I convertitori hanno una capacità di:",
    options: ["100 t", "10 t", "500 t", "1000 t", "50 t"],
    correctAnswer: 0 //
  },
  {
    id: 158,
    text: "I convertitori LD hanno:",
    options: ["Insufflaggio di ossigeno e refrattario basico", "Insufflaggio di aria e refrattario basico", "Insufflaggio di aria e refrattario acido", "Insufflaggio di ossigeno e refrattario acido", "Insufflaggio di gas inerte e refrattario neutro"],
    correctAnswer: 0 //
  },
  {
    id: 159,
    text: "La perlite è:",
    options: ["Una miscela meccanica", "Una soluzione solida di C in Fe", "Composta da 11% di austenite", "Composta da 11% di martensite", "Una fase del diagramma di stato Fe-C"],
    correctAnswer: 0 //
  },
  {
    id: 160,
    text: "Le soluzioni solide ordinate si trovano:",
    options: ["Sotto una temperatura critica", "Sopra una temperatura critica", "A qualsiasi temperatura", "Sotto 0°C", "Sopra 120°C"],
    correctAnswer: 0 //
  },
  {
    id: 161,
    text: "A 0 K il numero di vacanze presente in una mole di Fe purissimo è:",
    options: ["0 vacanze", "4 vacanze ogni 100000 atomi", "Una vacanza ogni 10 atomi", "Non è determinabile", "Il numero di Avogadro"],
    correctAnswer: 0 //
  },
  {
    id: 162,
    text: "Mediamente nell’altoforno si produce:",
    options: ["Ghisa", "Acciaio", "Ghisa o acciaio in funzione del tenore di coke", "Ghisa o acciaio in funzione della temperatura", "Ghisa o acciaio in funzione del minerale prescelto"],
    correctAnswer: 0 //
  },
  {
    id: 163,
    text: "Il microscopio elettronico:",
    options: ["Permette un’analisi chimica puntuale", "Richiede superfici metalliche perfettamente lucidate", "Il fascio di luce viene riflesso dal campione", "Non da informazioni aggiuntive a quelle ottenibili con il microscopio ottico se non che l’immagine viene maggiormente ingrandita", "Non permette l’analisi delle superfici di frattura"],
    correctAnswer: 0 //
  },
  {
    id: 164,
    text: "Il microscopio elettronico (riguardo alla frattografia):",
    options: ["Permette l’analisi delle superfici di frattura", "Non permette un’analisi chimica puntuale", "Richiede superfici metalliche perfettamente lucide", "Il fascio di luce viene riflesso dal campione", "Non da informazioni aggiuntive a quelle ottenibili con il microscopio ottico se non che l’immagine viene maggiormente ingrandita"],
    correctAnswer: 0 //
  },
  {
    id: 165,
    text: "Il microscopio metallografico:",
    options: ["Funziona per riflessione", "Funziona per trasmissione", "Permette l’analisi solo degli acciai", "Permette l’analisi di qualsiasi superficie metallica", "Permette l’analisi chimica delle superfici"],
    correctAnswer: 0 //
  },
  {
    id: 166,
    text: "L’analisi al microscopio metallografico senza attacco metallografico permette di evidenziare:",
    options: ["La distribuzione delle inclusioni", "I bordi di grano", "La distribuzione della perlite", "La forma delle lamelle di cementite e ferrite", "La presenza di austenite"],
    correctAnswer: 0 //
  },
  {
    id: 167,
    text: "Quali elettroni sono responsabili delle proprietà magnetiche dei metalli:",
    options: ["Elettroni disaccoppiati degli orbitali d", "Elettroni disaccoppiati degli orbitali p", "Elettroni accoppiati degli orbitali s", "Elettroni accoppiati degli orbitali p", "Elettroni accoppiati degli orbitali d"],
    correctAnswer: 0 //
  },
  {
    id: 168,
    text: "Il rame è ferromagnetico:",
    options: ["Mai", "Sopra il punto di Curié", "A temperatura ambiente", "Sotto il punto di Curié", "A 0° K"],
    correctAnswer: 0 //
  },
  {
    id: 169,
    text: "Gli acciai a lavorabilità migliorata (composizione base):",
    options: ["Contengono zolfo e manganese", "Contengono cromo", "Contengono solo zolfo", "Sono bonificati", "Sono solamente rinvenuti"],
    correctAnswer: 0 //
  },
  {
    id: 170,
    text: "Gli acciai a lavorabilità migliorata (elementi opzionali):",
    options: ["Possono contenere piombo", "Sono stati sottoposti a ricottura a 180°C per alcune ore", "Sono tutti acciai a basso tenore di carbonio", "Contengono prevalentemente ferrite", "Si temprano con raffreddamento in olio"],
    correctAnswer: 0 //
  },
  {
    id: 171,
    text: "Negli acciai inossidabili la resistenza alla corrosione è dovuta:",
    options: ["Alla presenza del cromo in tenori elevati", "Alla presenza di nichel in tenori elevati", "Ad alti tenori di carbonio", "Alla presenza contemporaneamente di cromo e nichel in tenori elevati", "Alla presenza contemporaneamente di cromo e carbonio in tenori elevati"],
    correctAnswer: 0 //
  },
  {
    id: 172,
    text: "La bonifica serve per:",
    options: ["Aumentare la durezza e la tenacità", "Aumentare la durezza", "Diminuire la durezza", "Aumentare la tenacità e diminuire la resistenza", "Diminuire la tenacità"],
    correctAnswer: 0 //
  },
  {
    id: 173,
    text: "La normalizzazione consiste in austenitizzazione seguita da:",
    options: ["Raffreddamento in aria calma", "Permanenza in temperatura", "Raffreddamento lento in forno", "Raffreddamento in acqua", "Raffreddamento in olio"],
    correctAnswer: 0 //
  },
  {
    id: 174,
    text: "La normalizzazione fornisce strutture:",
    options: ["Dipendenti dalla dimensione del componente", "Più grossolane della ricottura", "Più fini della tempra", "Più fini della bonifica", "Essenzialmente martensitiche"],
    correctAnswer: 0 //
  },
  {
    id: 175,
    text: "La normalizzazione è:",
    options: ["Meno costosa (della ricottura completa)", "Più costosa della tempra", "Più costosa della ricottura", "Più costosa della ricottura ma meno della tempra", "Più costosa della tempra ma meno della bonifica"],
    correctAnswer: 0 //
  },
  {
    id: 176,
    text: "La struttura finale della bonifica è:",
    options: ["Ferrite e cementite fini e globulari", "Ferrite e perlite lamellare", "Martensite", "Martensite globulare", "Essenzialmente perlitica"],
    correctAnswer: 0 //
  },
  {
    id: 177,
    text: "La ferrite delta a 1492 °C ha una solubilità massima di carbonio di:",
    options: ["0,1%", "2%", "0,08%", "0,18%", "4,3%"],
    correctAnswer: 0 //
  },
  {
    id: 178,
    text: "La trasformazione peritettica non interessa leghe Fe-C con tenore di carbonio:",
    options: ["Superiore a 0,5%", "Inferiore a 0,18%", "Inferiore a 0,5%", "Superiore 0,02%", "Superiore 0,18% (e inferiore a 0.5%)"],
    correctAnswer: 0 //
  },
  {
    id: 179,
    text: "La trasformazione eutettica interessa leghe Fe-C con tenore di carbonio:",
    options: ["Superiore a 2%", "Uguale a 0,8%", "Inferiore a 0,2%", "Superiore a 0,18%", "Superiore 0,5% ma inferiore a 2%"],
    correctAnswer: 0 //
  },
  {
    id: 180,
    text: "Per lavorare per asportazione di truciolo un componente conviene fare:",
    options: ["Una ricottura", "Una tempra", "Una bonifica", "Una normalizzazione", "Un rinvenimento"],
    correctAnswer: 0 //
  },
  {
    id: 181,
    text: "Un rinvenimento:",
    options: ["Segue la tempra", "Segue la normalizzazione", "Segue la ricottura", "Precede la tempra", "Precede la ricottura"],
    correctAnswer: 0 //
  },
  {
    id: 182,
    text: "La fragilità da rinvenimento è dovuta a:",
    options: ["Alla prematura precipitazione di carburi", "Presenza di idrogeno", "Alla presenza dello zolfo", "Alla presenza del magnesio", "Alla tardiva precipitazione di carburi"],
    correctAnswer: 0 //
  },
  {
    id: 183,
    text: "Il rinvenimento in assenza di elementi leganti (per acciai da bonifica):",
    options: ["Viene effettuato a 500° C", "Viene effettuato a 700° C", "Stabilizza la martensite", "Stabilizza l’austenite", "Non viene effettuato"],
    correctAnswer: 0 //
  },
  {
    id: 184,
    text: "La martensite è:",
    options: ["Una soluzione solida di carbonio in ferrite metastabile a temperatura ambiente", "Una fase del diagramma di stato Fe-C", "Una soluzione solida di carbonio in forma stabile a temperatura ambiente", "Una soluzione solida di carbonio in forma ad alta temperatura", "Una soluzione solida di carbonio in forma a bassa temperatura ma stabile"],
    correctAnswer: 0 //
  },
  {
    id: 185,
    text: "La presenza di elementi leganti negli acciai da bonifica:",
    options: ["Rallenta la trasformazione eutettoidica", "Stabilizza la martensite", "Stabilizza la ferrite", "Accelera la trasformazione eutettoidica", "Destabilizza la ferrite"],
    correctAnswer: 0 //
  },
  {
    id: 186,
    text: "Il rinvenimento (effetto principale):",
    options: ["Aumenta la tenacità", "Aumenta la durezza", "Stabilizza la martensite primaria", "Stabilizza l’austenite", "Si effettua dopo la normalizzazione"],
    correctAnswer: 0 //
  },
  {
    id: 187,
    text: "L’energia libera di un sistema liquido è minore di quella dello stesso sistema allo stato solido:",
    options: ["Sopra la temperatura di solidificazione", "Sempre", "Sotto la temperatura di fusione", "All’equilibrio delle 2 fasi", "Mai"],
    correctAnswer: 0 //
  },
  {
    id: 188,
    text: "L’energia libera di formazione di un ossido metallico:",
    options: ["Aumenta all’aumentare della temperatura", "Diminuisce all’aumentare della temperatura", "È indipendente dalla temperatura", "Può crescere o diminuire in dipendenza del tipo di metallo all’aumentare della temperatura", "Cresce, raggiunge un massimo e poi diminuisce all’aumentare della temperatura"],
    correctAnswer: 0 //
  },
  {
    id: 189,
    text: "L’energia libera di formazione del biossido di carbonio:",
    options: ["È indipendente dalla temperatura", "Aumenta all’aumentare della temperatura", "Diminuisce all’aumentare della temperatura", "Cresce, raggiunge un massimo e poi diminuisce all’aumentare della temperatura", "Diminuisce, raggiunge un minimo e poi cresce all’aumentare della temperatura"],
    correctAnswer: 0 //
  },
  {
    id: 190,
    text: "L’energia libera di formazione del monossido di carbonio:",
    options: ["Diminuisce all’aumentare della temperatura", "Aumenta all’aumentare della temperatura", "È indipendente dalla temperatura", "Cresce, raggiunge un massimo e poi diminuisce all’aumentare della temperatura", "Diminuisce, raggiunge un minimo e poi cresce all’aumentare della temperatura"],
    correctAnswer: 0 //
  },
  {
    id: 191,
    text: "In un altoforno per ogni tonnellata di minerale introdotta, occorrono circa:",
    options: ["2 t di aria", "2 t di CaCO3", "2 t di coke", "1 t di aria", "1 t di coke"],
    correctAnswer: 0 //
  },
  {
    id: 192,
    text: "In un altoforno per ogni tonnellata di minerale introdotta, si produce circa:",
    options: ["0,5 t di ghisa", "2 t di acciaio", "2 t di ghisa", "2 t di polvere", "0,5 t di acciaio"],
    correctAnswer: 0 //
  },
  {
    id: 193,
    text: "I laminati a freddo destinati a ricottura statica:",
    options: ["Devono essere avvolti a temperatura più bassa possibile", "Devono essere laminati a temperatura più bassa possibile", "Devono essere avvolti a temperatura più alta possibile", "Non vengono influenzati dalla temperatura di laminazione", "Non vengono influenzati dalla temperatura di avvolgimento"],
    correctAnswer: 0 //
  },
  {
    id: 194,
    text: "La presenza del AlN in un acciaio da profondo stampaggio influenza:",
    options: ["Il coefficiente d’anisotropia", "Il coefficiente di incrudimento", "L’allungamento a carico max", "Non ha influenza se non per essere un sottoprodotto della disossidazione", "La strizione"],
    correctAnswer: 0 //
  },
  {
    id: 195,
    text: "Negli acciai TRIP il rafforzamento è dovuto a:",
    options: ["Trasformazione della austenite", "Trasformazione della martensite", "Trasformazione della ferrite", "Trasformazione della cementite", "Trasformazione della perlite"],
    correctAnswer: 0 //
  },
  {
    id: 196,
    text: "La ricottura dei lingotti avviene a:",
    options: ["Oltre i 1000° C per 100 ore", "180° C per 12 ore", "500° C per 1 ora", "723° C per 12 ore", "50° C sopra la temperatura di austenitizzazione"],
    correctAnswer: 0 //
  },
  {
    id: 197,
    text: "La ricottura dei lingotti viene effettuata per:",
    options: ["Ricristallizzare il grano ed omogeneizzare la composizione chimica", "Aumentare le dimensioni del grano", "Aumentare gli effetti segregativi", "Omogeneizzare la composizione chimica ed aumentare le dimensioni del grano", "Ricristallizzare il grano ed aumentare gli effetti segregativi"],
    correctAnswer: 0 //
  },
  {
    id: 198,
    text: "Acciaio C40 deve essere temprato in:",
    options: ["Acqua", "Gas in pressione", "Aria", "Olio", "Sali fusi"],
    correctAnswer: 0 //
  },
  {
    id: 199,
    text: "La produzione giornaliera di un altoforno è di circa:",
    options: ["10 000 t", "100 t", "1000 t", "50 000 t", "100 000 t"],
    correctAnswer: 0 //
  },
  {
    id: 200,
    text: "I cowpers servono a:",
    options: ["Preriscaldare l’aria", "Preriscaldare la carica", "Raffreddare la carica", "Raffreddare l’aria", "Affinare l’acciaio"],
    correctAnswer: 0 //
  },
  {
    id: 201,
    text: "Sono suscettibili di invecchiamento leghe della serie:",
    options: ["6000", "1000", "5000", "4000", "3000"],
    correctAnswer: 0 //
  },
  {
    id: 202,
    text: "Le leghe della serie 3000 contengono:",
    options: ["Mn", "Mg", "Mg e Si", "Si", "Cu"],
    correctAnswer: 0 //
  },
  {
    id: 203,
    text: "Le leghe della serie 6000 contengono:",
    options: ["Mg e Si", "Mg", "Mn", "Si", "Cu"],
    correctAnswer: 0 //
  },
  {
    id: 204,
    text: "Le leghe della serie 4000 contengono:",
    options: ["Si", "Mg", "Mg e Si", "Mn", "Cu"],
    correctAnswer: 0 //
  },
  {
    id: 205,
    text: "Nelle leghe di alluminio l’invecchiamento:",
    options: ["È dovuto ad un riscaldamento di solubilizzazione seguito da tempra e riscaldamento a 100-150°C", "È causato da processi galvanici", "Avviene in leghe con basse caratteristiche meccaniche", "È causato dal raffreddamento in acqua", "È causato dal raffreddamento in olio"],
    correctAnswer: 0 //
  },
  {
    id: 206,
    text: "Le leghe di alluminio (saldabilità/composizione):",
    options: ["Contenenti rame non si saldano", "Si saldano più facilmente degli acciai", "Hanno una conducibilità termica inferiore a quella degli acciai", "Contengono rame per facilitare la saldatura", "Il prezzo elevato è dovuto alla scarsità di materiale in natura"],
    correctAnswer: 0 //
  },
  {
    id: 207,
    text: "Le leghe di alluminio (serie 7000):",
    options: ["Della serie 7000 non si saldano", "Si saldano più facilmente degli acciai", "Hanno una conducibilità termica inferiore a quella degli acciai", "Contengono rame per facilitare la saldatura", "Il prezzo elevato è dovuto alla scarsità di materiale in natura"],
    correctAnswer: 0 //
  },
  {
    id: 208,
    text: "Le leghe di alluminio (analisi costi):",
    options: ["Il prezzo elevato è dovuto al processo di fabbricazione", "Si saldano più facilmente", "Hanno conducibilità termica inferiore agli acciai", "Hanno bassa capacità termica", "Il prezzo elevato è dovuto alla scarsità in natura"],
    correctAnswer: 0 //
  },
  {
    id: 209,
    text: "Le leghe di alluminio (stampaggio):",
    options: ["Si stampano più difficilmente degli acciai", "Si saldano più facilmente degli acciai", "Hanno una conducibilità termica inferiore a quella degli acciai", "Hanno una bassa capacità termica", "Il prezzo elevato è dovuto alla scarsità di materiale in natura"],
    correctAnswer: 0 //
  },
  {
    id: 210,
    text: "Le leghe di alluminio (saldabilità generale):",
    options: ["Si saldano più difficilmente degli acciai", "Hanno una conducibilità termica inferiore a quella degli acciai", "Hanno una bassa capacità termica", "Il prezzo elevato è dovuto alla scarsità di materiale in natura", "Si stampano più facilmente degli acciai"],
    correctAnswer: 0 //
  },
  {
    id: 211,
    text: "Le leghe di alluminio (superficie):",
    options: ["L’ossido di alluminio in superficie è compatto e resistente", "Si saldano più facilmente degli acciai", "Hanno una conducibilità termica inferiore a quella degli acciai", "Hanno una bassa capacità termica", "Il prezzo elevato è dovuto alla scarsità di minerale in natura"],
    correctAnswer: 0 //
  },
  {
    id: 212,
    text: "La presenza di 1,5% di Cr negli acciai da bonifica:",
    options: ["Rallenta la trasformazione eutettoidica", "Stabilizza la martensite", "Aumenta la resistenza alla corrosione", "Accelera la trasformazione eutettoidica", "Favorisce la sensibilizzazione degli acciai"],
    correctAnswer: 0 //
  },
  {
    id: 213,
    text: "Nella prova Jominy il mezzo raffreddante è:",
    options: ["Acqua", "Dipende dal tipo di acciaio", "Olio", "Aria calma", "Gas in pressione"],
    correctAnswer: 0 //
  },
  {
    id: 214,
    text: "Acciaio A con 0,3% di C, acciaio B con 0,3% di C e 2% di Cr (confronto Jominy 1):",
    options: ["Le curve Jominy di A e B partono dallo stesso punto", "La curva Jominy di A sta sempre sotto quella di B", "La durezza del primo punto dell’acciaio B è maggiore di quella dell’acciaio A", "La durezza del primo punto dell’acciaio A è maggiore di quella dell’acciaio B", "La curva Jominy di A sta sempre sopra quella di B per un tratto iniziale"],
    correctAnswer: 0 //
  },
  {
    id: 215,
    text: "Acciaio A con 0,4% di C, acciaio B con 0,3% di C e 2% di Cr (confronto Jominy 2):",
    options: ["La durezza del primo punto dell’acciaio A è maggiore di quella dell’acciaio B", "La curva Jominy di A sta sempre sotto quella di B", "Le curve Jominy di A e B partono dallo stesso punto", "La durezza del primo punto dell’acciaio B è maggiore di quella dell’acciaio A", "La curva Jominy di A sta sempre sopra quella di B per un tratto iniziale"],
    correctAnswer: 0 //
  },
  {
    id: 216,
    text: "Un acciaio con 0,4% di carbonio, dopo ricottura, presenterà una struttura costituita da:",
    options: ["Ferrite e perlite lamellare", "Martensite fine", "Martensite grossolana", "Ferrite e perlite globulare", "Ferrite globulare e perlite"],
    correctAnswer: 0 //
  },
  {
    id: 217,
    text: "Un acciaio con tenore di carbonio 0,20 dopo ricottura a temperatura ambiente è costituito da:",
    options: ["25% perlite 75% ferrite", "Perlite", "80% perlite 20% ferrite", "20% perlite 80% ferrite", "25% perlite 75% cementite"],
    correctAnswer: 0 //
  },
  {
    id: 218,
    text: "Un acciaio con tenore di carbonio 0,60 dopo ricottura a temperatura ambiente è costituito da:",
    options: ["75% perlite 25% ferrite", "Perlite", "80% perlite 20% ferrite", "75% perlite 25% cementite", "25% perlite 75% ferrite"],
    correctAnswer: 0 //
  },
  {
    id: 219,
    text: "L’infragilimento da idrogeno (caratteristiche):",
    options: ["Avviene in acciai con alte caratteristiche meccaniche", "È causato dal raffreddamento in idrogeno", "È causato dalla bonifica in assenza di atmosfere protettive", "È causato dal raffreddamento in acqua", "È causato dalla distensione a 180° per alcune ore"],
    correctAnswer: 0 //
  },
  {
    id: 220,
    text: "L’infragilimento da idrogeno (prevenzione):",
    options: ["Si può evitare con una ricottura a 180°C per alcune ore", "Si può evitare zincando i componenti", "Si può evitare decappando i componenti", "Si può evitare bonificando i pezzi", "Si può evitare con un sottoraffreddamento"],
    correctAnswer: 0 //
  },
  {
    id: 221,
    text: "L’infragilimento da idrogeno soprattutto (causa primaria):",
    options: ["È causato da processi galvanici", "È dovuto alla bonifica", "Avviene in acciai con basse caratteristiche meccaniche", "È causato dal raffreddamento in acqua", "È causato dal raffreddamento in olio"],
    correctAnswer: 0 //
  },
  {
    id: 222,
    text: "L’infragilimento da idrogeno avviene soprattutto in:",
    options: ["Acciai ferritici con elevate caratteristiche meccaniche", "Acciai ferritici con scarse caratteristiche meccaniche", "Tutti gli acciai ferritici", "Tutti gli acciai austenitici", "Acciai austenitici con elevate caratteristiche meccaniche"],
    correctAnswer: 0 //
  },
  {
    id: 223,
    text: "La trasformazione peritettica avviene quando:",
    options: ["Una fase solida origina al riscaldamento una fase liquida ed una fase solida", "Una fase liquida origina al raffreddamento 2 fasi solide (eutettico)", "Una fase liquida origina al riscaldamento 2 fase solide", "Una fase solida origina al raffreddamento 2 fasi solide (eutettoidico)", "Una fase solida origina al raffreddamento una fase liquida ed una fase solida"],
    correctAnswer: 0 //
  },
  {
    id: 224,
    text: "Nel corso dei processi siderurgici il tenore di zolfo viene ridotto durante:",
    options: ["In siviera con aggiunta di Na", "L’affinazione", "Il calmaggio", "Già nell’altoforno", "In siviera con aggiunta di Mn"],
    correctAnswer: 0 //
  },
  {
    id: 225,
    text: "La presenza di Mo negli acciai inossidabili austenitici serve a:",
    options: ["Contrastare l’effetto del pitting", "Limitare le dimensioni del grano", "Favorire l’effetto del pitting", "Favorire la sensibilizzazione", "Aumentare la resistenza alla corrosione alle basse temperature"],
    correctAnswer: 0 //
  },
  {
    id: 226,
    text: "La durata di un ciclo di cementazione è dell’ordine di:",
    options: ["Ore", "Secondi", "Minuti", "Giorni", "Settimane"],
    correctAnswer: 0 //
  },
  {
    id: 227,
    text: "I duplex sono acciai:",
    options: ["Impiegati per resistere alla corrosione sotto sforzo", "Altoresistenziali", "Impiegati in campo automobilistico per alleggerimento pesi", "Ferritico martensitici", "Austeno martensitici"],
    correctAnswer: 0 //
  },
  {
    id: 228,
    text: "Gli acciai dual phases sono costituiti da:",
    options: ["Ferrite e martensite", "Ferrite ed austenite", "Ferrite e cementite", "Ferrite e perlite", "Austenite residua e martensite"],
    correctAnswer: 0 //
  },
  {
    id: 229,
    text: "Quando non è preferibile avere un grano fine:",
    options: ["Acciai da profondo stampaggio", "Acciai inossidabili", "Acciai bonificati", "Acciai rinvenuti", "Acciai normalizzati"],
    correctAnswer: 0 //
  },
  {
    id: 230,
    text: "La durata di un ciclo di nitrocarburazione è dell’ordine di:",
    options: ["Ore", "Secondi", "Minuti", "Giorni", "Settimane"],
    correctAnswer: 0 //
  },
  {
    id: 231,
    text: "La durata di un ciclo di nitrurazione è dell’ordine di:",
    options: ["Giorni", "Secondi", "Minuti", "Ore", "Settimane"],
    correctAnswer: 0 //
  },
  {
    id: 232,
    text: "Gli acciai autotempranti si temprano in:",
    options: ["Aria calma", "Gas", "Acqua", "Olio", "Sali sottoraffreddati"],
    correctAnswer: 0 //
  },
  {
    id: 233,
    text: "Qual è il meccanismo di rafforzamento della cementite:",
    options: ["Precipitazione coerente", "Soluzione solida sostituzionale", "Affinamento del grano", "Incrudimento", "Soluzione solida interstiziale"],
    correctAnswer: 0 //
  },
  {
    id: 234,
    text: "Dopo cementazione quali trattamenti termici si effettuano:",
    options: ["Tempra", "Ricottura", "Normalizzazione", "Tempra superficiale", "Nitrurazione"],
    correctAnswer: 0 //
  },
  {
    id: 235,
    text: "Qual è l’agente cementante:",
    options: ["CO", "N2", "H2", "NH3", "CO2"],
    correctAnswer: 0 //
  },
  {
    id: 236,
    text: "Qual è l’agente nitrurizzante:",
    options: ["NH3", "N2", "H2", "CO", "CO2"],
    correctAnswer: 0 //
  },
  {
    id: 237,
    text: "La temperatura alla quale avviene la nitrurazione è:",
    options: ["500° C", "200°C", "300° C", "900° C", "980° C"],
    correctAnswer: 0 //
  },
  {
    id: 238,
    text: "La temperatura alla quale avviene la cementazione è:",
    options: ["900° C", "200° C", "300° C", "500° C", "600° C"],
    correctAnswer: 0 //
  },
  {
    id: 239,
    text: "Temperatura carbonitrurazione:",
    options: ["700°C-900°C", "500°C-600°C", "950°C-1100°C", "400°C-500°C", "200°C-300°C"],
    correctAnswer: 0 //
  },
  {
    id: 240,
    text: "Temperatura nitrocarburazione:",
    options: ["560°C", "700°C", "900°C", "300°C", "200°C"],
    correctAnswer: 0 //
  },
  {
    id: 241,
    text: "La formazione di ghise bianche è favorita da:",
    options: ["Raffreddamenti veloci", "Raffreddamenti lenti", "È indipendente dalla velocità di raffreddamento", "Dalla presenza del Si", "Dalla temperatura"],
    correctAnswer: 0 //
  },
  {
    id: 242,
    text: "Mediante macroroentgenografia è possibile evidenziare difetti:",
    options: ["Paralleli ai Raggi X", "Perpendicolari ai Raggi X", "Sia paralleli che perpendicolari ai Raggi X", "Solo sulla superficie", "Anche a notevole profondità"],
    correctAnswer: 0 //
  },
  {
    id: 243,
    text: "Un acciaio con 0,4% C e 1,5% Cr si tempra in:",
    options: ["Olio", "Gas", "Aria", "Acqua", "Sali sottoraffreddati"],
    correctAnswer: 0 //
  },
  {
    id: 244,
    text: "Carbonio massimo per acciai da cementazione:",
    options: ["0.25%", "0.50%", "0.80%", "1.20%", "2.00%"],
    correctAnswer: 0 //
  },
  {
    id: 245,
    text: "% di C prima della cementazione:",
    options: ["0,1-0,2%", "0,3-0,4%", "0,5-0,6%", "0,8-1,0%", "1,5-2,0%"],
    correctAnswer: 0 //
  },
  {
    id: 246,
    text: "% di C dopo cementazione:",
    options: ["0,8% superficie 0,2% cuore", "1,5% superficie 0,8% cuore", "0,4% superficie 0,1% cuore", "0,2% superficie 0,8% cuore", "1,2% superficie 0,6% cuore"],
    correctAnswer: 0 //
  },
  {
    id: 247,
    text: "Tenore di carbonio degli acciai su cui si fa nitrurazione:",
    options: ["0,3%÷0,5% di C", "0,1%÷0,2% di C", "0,8%÷1,0% di C", "1,2%÷1,5% di C", "Maggiore del 2% di C"],
    correctAnswer: 0 //
  },
  {
    id: 248,
    text: "La trasformazione eutettoidica dipende dal:",
    options: ["Tenore di carbonio", "Tenore di ferro", "Quantitativo di cementite", "Quantitativo di austenite", "Diffusione di carbonio e ferro"],
    correctAnswer: 0 //
  },
  {
    id: 249,
    text: "La trasformazione eutettoidica nel diagramma di stato Fe-C avviene a:",
    options: ["723°C 0,8% C", "1492°C 0,8% C", "723°C 4,3% C", "1130°C 0,8% C", "1492°C 0,18% C"],
    correctAnswer: 0 //
  },
  {
    id: 250,
    text: "La ricottura consiste in austenitizzazione seguita da:",
    options: ["Raffreddamento lento in forno", "Raffreddamento in aria calma", "Permanenza in temperatura", "Raffreddamento in acqua", "Raffreddamento in olio"],
    correctAnswer: 0 //
  },
  {
    id: 251,
    text: "Temperatura di solubilizzazione alluminio (leghe da trattamento termico):",
    options: ["500° C (circa)", "200° C (circa)", "700° C (circa)", "900° C (circa)", "1100° C (circa)"],
    correctAnswer: 0 //
  },
  {
    id: 252,
    text: "L'aumento di frequenza per la tempra superficiale ad induzione cosa comporta sulla tempra in sé:",
    options: ["Riduce la profondità di tempra", "Aumenta la profondità di tempra", "Non influenza la profondità ma solo la durezza", "Favorisce la formazione di austenite residua", "Aumenta il rischio di decarburazione superficiale"],
    correctAnswer: 0 //
  },
  {
    id: 253,
    text: "A cosa serve il silicio nelle ghise:",
    options: ["Ad aumentare l’attività del carbonio e ottenere una lega eutettica e colabile senza avere il 4,3 % di tenore di carbonio effettivo", "A stabilizzare i carburi e formare ghisa bianca", "A ridurre la temperatura di fusione sotto i 1000°C", "A rimuovere lo zolfo e il fosforo dalla matrice", "A formare grafite sferoidale senza l'aggiunta di magnesio"],
    correctAnswer: 0 //
  },
  {
    id: 254,
    text: "Leghe alluminio da getto: Il sodio serve per...",
    options: ["Modificare l’eutettico", "L'affinazione del grano della fase primaria", "Il degasaggio del bagno liquido", "Aumentare la resistenza alla corrosione", "Favorire l'indurimento per precipitazione"],
    correctAnswer: 0 //
  },
  {
    id: 255,
    text: "Acciai da lavorazione a macchine utensili (automatici), cosa si aggiunge:",
    options: ["S e Mn (zolfo e manganese)", "Cr e Ni (cromo e nichel)", "Ti e Nb (titanio e niobio)", "W e Mo (tungsteno e molibdeno)", "Si e Al (silicio e alluminio)"],
    correctAnswer: 0 //
  },
  {
    id: 256,
    text: "L'ordine di grandezza della durata del rinvenimento è:",
    options: ["Un'ora", "Un giorno", "Un minuto", "Un secondo", "Una settimana"],
    correctAnswer: 0 //
  },
  {
    id: 257,
    text: "Il diametro critico è il diametro di quel barrotto che a cuore ha:",
    options: ["50% martensite", "100% martensite", "0% martensite", "75% martensite", "25% martensite"],
    correctAnswer: 0 //
  },
  {
    id: 258,
    text: "L'acqua come mezzo temprante presenta:",
    options: ["Alta velocità a 300°C (e bassa a 700°C)", "Bassa velocità a 300°C", "Alta velocità a 700°C", "Alta velocità a 300°C e alta a 700°C", "Bassa velocità a 300°C e bassa a 700°C"],
    correctAnswer: 0 //
  },
  {
    id: 259,
    text: "Quali fattori influiscono sulla formazione di cricche a nucleazione \"limitata\":",
    options: ["Dimensioni del grano", "Temperatura", "Carico di rottura", "Carico di snervamento", "Composizione chimica"],
    correctAnswer: 0 //
  },
  {
    id: 260,
    text: "Lo spessore dello strato di diffusione dopo nitrurazione è dell'ordine di qualche:",
    options: ["Decimo di millimetro", "Millimetro", "Centimetro", "Decimo di centimetro", "Micrometro"],
    correctAnswer: 0 //
  },
  {
    id: 261,
    text: "Lo spessore dello strato dei composti (coltre bianca) dopo nitrurazione è dell'ordine di qualche:",
    options: ["Micrometro", "Millimetro", "Centimetro", "Decimo di centimetro", "Decimo di millimetro"],
    correctAnswer: 0 //
  },
  {
    id: 262,
    text: "La durezza della martensite dipende da:",
    options: ["Tenore di carbonio", "Presenza di elementi leganti", "Temperatura di raffreddamento", "Velocità di raffreddamento", "Dimensioni del grano austenitico"],
    correctAnswer: 0 //
  },
  {
    id: 263,
    text: "La modificazione dell'eutettico nelle leghe di alluminio da getto viene effettuata mediante aggiunta di:",
    options: ["Na", "Mg", "Cu", "Si", "Zn"],
    correctAnswer: 0 //
  },
  {
    id: 264,
    text: "Da cosa dipende l’energia delle dislocazioni:",
    options: ["Quadrato del vettore di Burgers", "Cubo del vettore di Burgers", "Temperatura di fusione del metallo", "Velocità di applicazione del carico", "Dimensione del grano cristallino"],
    correctAnswer: 0 //
  },
  {
    id: 265,
    text: "Cos’è la ledeburite:",
    options: ["Miscela meccanica di austenite e cementite", "Soluzione solida di carbonio in ferrite", "Fase intermetallica del diagramma Fe-C", "Miscela di ferrite e martensite", "Struttura tipica degli acciai da bonifica"],
    correctAnswer: 0 //
  },
  {
    id: 266,
    text: "Il primo punto della curva Jominy da cosa dipende:",
    options: ["Rappresenta la durezza della martensite della base temprata (quindi dal tenore di carbonio)", "Dal quantitativo di elementi leganti come cromo e nichel", "Dalla dimensione del grano austenitico prima della tempra", "Dalla velocità di raffreddamento dell'acqua nella provetta", "Dalla temperatura di austenitizzazione"],
    correctAnswer: 0 //
  },
  {
    id: 267,
    text: "Temperatura di invecchiamento artificiale per le leghe di alluminio:",
    options: ["100-150 °C", "400-450 °C", "20-25 °C", "500-550 °C", "250-300 °C"],
    correctAnswer: 0 //
  },
  {
    id: 268,
    text: "Valore del coefficiente dell’incrudimento (n):",
    options: ["Varia tra 0 e 1", "Varia tra 1 e 2", "È sempre superiore a 1", "È sempre negativo", "È una costante fissa pari a 0.5 per tutti i metalli"],
    correctAnswer: 0 //
  },
  {
    id: 269,
    text: "Cosa si utilizza principalmente per l'inoculazione della ghisa (per creare germi di nucleazione per la grafite):",
    options: ["Silicio (in polvere di ferro-silicio)", "Magnesio", "Cerio", "Manganese", "Cromo"],
    correctAnswer: 0 //
  },
  {
    id: 270,
    text: "Qual è la % di Carbonio nell'austenite che costituisce la ledeburite al momento della sua formazione (eutettico a 1147°C):",
    options: ["2,11% (spesso approssimato a 2%)", "0,8%", "4,3%", "6,67%", "0,18%"],
    correctAnswer: 0 //
  },
  {
    id: 271,
    text: "Cosa fa il Vanadio sulle curve CCT (Curve di Raffreddamento Continuo):",
    options: ["Le sposta a destra (aumentando la temprabilità)", "Le sposta a sinistra", "Le sposta verso l'alto", "Non ha alcun effetto sulle curve", "Elimina il naso perlitico"],
    correctAnswer: 0 //
  },
  {
    id: 272,
    text: "Temperatura e %C del punto peritettico nel diagramma Fe-C:",
    options: ["T=1495 °C, 0.18 % C (o 0.17%)", "T=1147 °C, 4.3 % C", "T=727 °C, 0.77 % C", "T=912 °C, 0.0 % C", "T=1538 °C, 0.5 % C"],
    correctAnswer: 0 //
  },
  {
    id: 273,
    text: "Indurimento secondario: in quali acciai si verifica aumentando la temperatura di rinvenimento oltre i 400-500 °C?",
    options: ["Acciai per lavorazioni a caldo e acciai rapidi (HSS)", "Acciai da costruzione di base", "Acciai da profondo stampaggio", "Acciai inossidabili austenitici", "Acciai autotempranti a basso carbonio"],
    correctAnswer: 0 //
  },
  {
    id: 274,
    text: "Le leghe di alluminio della serie 6000 contengono principalmente:",
    options: ["Alluminio, silicio e magnesio", "Alluminio, rame e magnesio", "Alluminio, zinco e magnesio", "Alluminio e manganese", "Alluminio puro"],
    correctAnswer: 0 //
  },
  {
    id: 275,
    text: "Gli acciai a lavorabilità migliorata (automatici) sono caratterizzati dalla presenza di:",
    options: ["Zolfo (circa 0.1-0.3%) e Manganese (per formare MnS)", "Cromo e Nichel", "Niobio e Titanio", "Solo Fosforo in alte percentuali", "Silicio e Alluminio"],
    correctAnswer: 0 //
  },
  {
    id: 276,
    text: "La cementite (Fe3C) è:",
    options: ["Un composto intermetallico (carburo di ferro) con stechiometria definita", "Una miscela meccanica di ferrite e grafite", "Una soluzione solida interstiziale di carbonio in ferro", "Una soluzione solida sostituzionale", "Un precipitato puramente amorfo"],
    correctAnswer: 0 //
  },
  {
    id: 277,
    text: "Durata e temperatura tipiche per il trattamento di deidrogenazione (es. post-galvanica):",
    options: ["T=180/200 °C per 4-5 ore (fino a 48h in aeronautica)", "T=500 °C per 1 ora", "T=850 °C per 30 minuti", "T=25 °C per 1 settimana", "T=100 °C per 30 minuti"],
    correctAnswer: 0 //
  },
  {
    id: 278,
    text: "A cosa è dovuto il cono di ritiro nei lingotti e come si mitiga?",
    options: ["È dovuto alla contrazione di volume durante la solidificazione; si mitiga usando una materozza", "È dovuto all'espansione dei gas disciolti; si mitiga aumentando la pressione atmosferica", "È dovuto alla segregazione del carbonio; si mitiga con la ricottura", "È un difetto di laminazione; si mitiga riducendo la velocità dei rulli", "È dovuto allo shock termico; si mitiga scaldando la lingottiera"],
    correctAnswer: 0 //
  },
  {
    id: 279,
    text: "Le dislocazioni nei cristalli metallici sono:",
    options: ["Difetti stechiometrici di linea (unidimensionali)", "Difetti di punto (vacanze o interstiziali)", "Difetti di superficie (bordi di grano)", "Difetti di volume (inclusioni o pori)", "Impurità chimiche isolate"],
    correctAnswer: 0 //
  },
  {
    id: 280,
    text: "Trattamento termico generalmente più economico (perché raffreddato in aria calma):",
    options: ["Normalizzazione", "Tempra in olio", "Tempra in acqua", "Ricottura completa (in forno)", "Patentamento"],
    correctAnswer: 0 //
  },
  {
    id: 281,
    text: "Differenza tra precipitati coerenti e non coerenti:",
    options: ["Coerente: ha la stessa struttura reticolare della matrice. Incoerente: ha un proprio reticolo cristallino distinto", "Coerente: è visibile a occhio nudo. Incoerente: visibile solo al microscopio", "Coerente: si forma a caldo. Incoerente: si forma a freddo", "Coerente: aumenta la duttilità. Incoerente: aumenta la fragilità", "Non c'è differenza, sono sinonimi"],
    correctAnswer: 0 //
  },
  {
    id: 282,
    text: "Forme allotropiche del Ferro puro al riscaldamento:",
    options: ["Fe α (CCC) fino a 912°C -> Fe γ (CFC) fino a 1394°C -> Fe δ (CCC) fino a 1538°C", "Fe α (CFC) fino a 727°C -> Fe γ (CCC) fino a 1147°C", "Fe γ (CCC) fino a 912°C -> Fe α (CFC) fino a 1538°C", "Il ferro non presenta forme allotropiche", "Fe α (EC) fino a 500°C -> Fe γ (CCC) fino a fusione"],
    correctAnswer: 0 //
  },
  {
    id: 283,
    text: "Qual è la percentuale in peso del Carbonio nella Cementite (Fe3C)?",
    options: ["6,67%", "2,11%", "0,77%", "4,30%", "93,3%"],
    correctAnswer: 0 //
  },
  {
    id: 284,
    text: "Leghe di alluminio della serie 7000 contengono principalmente:",
    options: ["Zinco e Magnesio", "Rame e Silicio", "Manganese", "Silicio", "Solo Alluminio puro"],
    correctAnswer: 0 //
  },
  {
    id: 285,
    text: "Come si evita il creep (scorrimento viscoso a caldo)?",
    options: ["Evitando grani troppo fini (meglio grani grossi o monocristalli) e usando alliganti resistenti al calore (es. Ni, Mo, W)", "Affinando il grano il più possibile", "Eseguendo una ricottura di globulizzazione", "Usando acciai a bassissimo carbonio", "Aumentando la porosità del materiale"],
    correctAnswer: 0 //
  },
  {
    id: 286,
    text: "Cosa fa il Magnesio (Mg) aggiunto alla ghisa liquida?",
    options: ["Provoca la formazione di grafite sferoidale (ghisa sferoidale)", "Favorisce la formazione di ghisa bianca", "Agisce da inoculante per formare grafite lamellare", "Aumenta la quantità di cementite primaria", "Fluidifica la loppa (scoria)"],
    correctAnswer: 0 //
  },
  {
    id: 287,
    text: "Perché si aggiunge Cromo (circa 1% - 1.5%) in acciai a medio tenore di carbonio da bonifica?",
    options: ["Per aumentare la temprabilità (rallentando la trasformazione eutettoidica)", "Per renderli inossidabili", "Per migliorarne la lavorabilità all'utensile", "Per aumentarne la duttilità a freddo", "Per abbassare la temperatura di fusione"],
    correctAnswer: 0 //
  },
  {
    id: 288,
    text: "L'idrogeno (H) è pericoloso perché causa infragilimento. In quali acciai è più pericoloso?",
    options: ["Negli acciai altoresistenziali (es. bonificati ad alta resistenza) e ferritici ad alte prestazioni", "Negli acciai austenitici a basso carbonio", "Negli acciai extradolci da profondo stampaggio", "Nelle ghise grigie", "Negli acciai al piombo"],
    correctAnswer: 0 //
  },
  {
    id: 289,
    text: "Percentuale in peso del Ferro (Fe) nella Cementite (Fe3C):",
    options: ["93,33%", "6,67%", "99,0%", "50,0%", "85,5%"],
    correctAnswer: 0 //
  },
  {
    id: 290,
    text: "Che ruolo ha il carico di snervamento negli acciai da profondo stampaggio?",
    options: ["Deve essere molto basso, per operare subito in campo plastico e ridurre il ritorno elastico", "Deve essere il più alto possibile per resistere alla pressa", "Deve coincidere con il carico di rottura", "Non è un parametro rilevante per lo stampaggio", "Deve essere superiore a 1000 MPa"],
    correctAnswer: 0 //
  },
  {
    id: 291,
    text: "Cos'è la Ferrite β (beta)?",
    options: ["È la ferrite α che, superata la temperatura di Curie (768°C), ha perso le proprietà ferromagnetiche diventando paramagnetica", "È una fase stabile solo ad altissime pressioni", "È l'austenite sottoraffreddata", "È il nome storico della martensite rinvenuta", "È un carburo metastabile"],
    correctAnswer: 0 //
  },
  {
    id: 292,
    text: "Cos'è la Temperatura di Curie (per il ferro circa 768°C)?",
    options: ["La temperatura sopra la quale un materiale ferromagnetico diventa paramagnetico", "La temperatura di fusione del ferro puro", "La temperatura a cui l'austenite si trasforma in perlite", "La temperatura di ebollizione dell'azoto liquido", "La temperatura critica per lo scorrimento viscoso"],
    correctAnswer: 0 //
  },
  {
    id: 293,
    text: "Meccanismi di rafforzamento principali delle leghe di alluminio:",
    options: ["Incrudimento (lavorazione a freddo) o indurimento per precipitazione (invecchiamento)", "Tempra martensitica", "Patentamento", "Rinvenimento di coalescenza", "Aggiunta di elevate quantità di carbonio"],
    correctAnswer: 0 //
  },
  {
    id: 294,
    text: "A cosa serve l'affinamento del grano cristallino in un metallo?",
    options: ["Aumenta sia il carico di snervamento (legge di Hall-Petch) che la tenacità (bloccando le dislocazioni)", "Diminuisce la resistenza meccanica ma aumenta la lavorabilità", "Rende il materiale magnetico", "Aumenta la trasparenza ottica", "Aumenta esclusivamente la conducibilità elettrica"],
    correctAnswer: 0 //
  },
  {
    id: 295,
    text: "Caratteristica principale della microstruttura delle ghise bianche:",
    options: ["Il carbonio è tutto combinato sotto forma di cementite (carburi di ferro), rendendole molto dure e fragili", "Il carbonio è presente tutto come grafite sferoidale", "Hanno una matrice puramente austenitica a temperatura ambiente", "Sono prive di carbonio", "Hanno un'elevatissima duttilità a trazione"],
    correctAnswer: 0 //
  }
];

const URBETALLI_QUESTIONS = [
  {
    "id": "u1",
    "type": "matching",
    "text": "[URBETALLI] Domande su ricristallizzazione.",
    "prompts": [
      "Nel caso di leghe di alluminio, quando l'incrudimento ha dei vantaggi dal punto di vista dell'incremento delle caratteristiche meccaniche?",
      "Quando un trattamento di deformazione plastica viene definito a caldo?",
      "Come agisce il processo di ricristallizzazione sui materiali?",
      "Come agisce il processo di recovery sui materiali?"
    ],
    "options": [
      "Aumenta la deformabilità del materiale senza sostanzialmente modificare la resistenza massima rispetto a prima",
      "Aumenta la deformabilità del materiale e diminuisce la resistenza massima rispetto a prima",
      "Quando viene effettuato al di sopra della temperatura di ricristallizzazione",
      "Aumenta la deformabilità del materiale e la resistenza massima rispetto a prima",
      "Quando viene effettuato su leghe ad alta purezza",
      "Quando viene effettuato al di sotto della temperatura di ricristallizzazione"
    ],
    "correctAnswers": { "0": 5, "1": 2, "2": 1, "3": 0 }
  },
  {
    "id": "u2",
    "text": "[URBETALLI] Circa le cricche di tempra quali di queste frasi sono vere?",
    "options": [
      "(a) Nel caso di rischi di formazione di cricche si deve procedere con un trattamento di tempra isoterma martensitica",
      "(b) Esse sono provocate dalla differenza di temperatura tra cuore e superficie, come nei vetri",
      "(c) Le cricche di tempra sono provocate dalla trasformazione austenite martensite che avviene per espansione",
      "(d) Non si manifestano mai nella tempra dopo cementazione",
      "(e) Si possono evitare utilizzando un materiale con maggior quantitativo di elementi leganti"
    ],
    "correctAnswer": 0
  },
  {
    "id": "u3",
    "text": "[URBETALLI] Le famiglie di acciai da profondo stampaggio DP e TRIP manifestano sostanzialmente gli stessi intervalli di deformabilità",
    "options": ["Vero", "Falso"],
    "correctAnswer": 1
  },
  {
    "id": "u4",
    "type": "matching",
    "text": "[URBETALLI] Nel caso di leghe di alluminio da getto associare le corrette corrispondenze.",
    "prompts": [
      "Le leghe Al-Si-Mg da getto ....",
      "Per le migliori caratteristiche meccaniche di una lega da getto Al-Si ....",
      "Quale elemento dopante conferisce le migliori caratteristiche meccaniche dopo solidificazione?",
      "Quali caratteristiche meccaniche vengono raggiunte nel caso della lega Al - 5% di Si?"
    ],
    "options": [
      "Resistenza 160 MPa ed allungamento 10%",
      "Fe",
      "... si deve ottenere una morfologia di Si aciculare",
      "Resistenza 365 MPa ed allungamento 10%",
      "... invecchiamento naturale",
      "... sono leghe da trattamento termico",
      "... si deve ottenere una morfologia di Si globulare",
      "Na",
      "... non sono leghe da trattamento termico"
    ],
    "correctAnswers": { "0": 5, "1": 6, "2": 7, "3": 0 }
  },
  {
    "id": "u5",
    "type": "matching",
    "text": "[URBETALLI] Trattamento di bonifica. Inserire le corrette corrispondenze.",
    "prompts": [
      "In che cosa consiste il trattamento di bonifica?",
      "La scelta della temperatura di austenitizzazione dipende da che cosa?",
      "Su che acciai deve essere condotta la bonifica?",
      "Perche viene eseguita la bonifica?"
    ],
    "options": [
      "Dalla percentuale di C dell'acciaio",
      "Dalle applicazioni del componente",
      "Su tutti gli acciai non induriti superficialmente con % di C superiore allo 0,20%",
      "In una tempra seguita da rinvenimento",
      "Per evitare le cricche di tempra",
      "Per migliorare la finitura superficiale",
      "Per affinare la microstruttura e aumentare la tenacità",
      "Su tutti gli acciai non induriti superficialmente con % di C inferiore allo 0,20%",
      "In una tempra seguita da ricottura"
    ],
    "correctAnswers": { "0": 3, "1": 0, "2": 2, "3": 6 }
  },
  {
    "id": "u6",
    "text": "[URBETALLI] Quale tipo di microstruttura è rappresentata in figura?",
    "imageUrl": "/images/domanda_u6_microstruttura.png",
    "options": [
      "(a) Martensite in seguito a tempra di un acciaio",
      "(b) Perlite in seguito a ricottura di un C80",
      "(c) Acciaio da profondo stampaggio a basso carbonio",
      "(d) Lega Al-Si da getto senza attacco metallografico",
      "(e) Superficie di frattura duttile di acciaio"
    ],
    "correctAnswer": 3
  },
  {
    "id": "u7",
    "text": "[URBETALLI] Calcola la percentuale di perlite per un C50 dopo trattamento di ricottura completa.",
    "options": ["(a) 90%", "(b) 50%", "(c) 65%", "(d) 9%", "(e) 35%"],
    "correctAnswer": 2
  },
  {
    "id": "u8",
    "text": "[URBETALLI] Qual è il nome della seguente reazione? Liquido + Solido 1 -> Solido 2",
    "options": ["(a) Peritettoidica", "(b) Eutettoidica", "(c) Monotettica", "(d) Peritettica", "(e) Eutettica"],
    "correctAnswer": 3
  },
  {
    "id": "u9",
    "text": "[URBETALLI] Il trattamento termico riportato si riferisce a quale lega? Cosa succede? Più risposte possibili.",
    "imageUrl": "/images/domanda_u9_ciclo_termico.png",
    "options": [
      "(a) E' il ciclo del processo di nitrurazione",
      "(b) E' il trattamento di tempra e rinvenimento di acciai per utensili",
      "(c) E' il trattamento di solubilizzazione tempra ed invecchiamento di leghe di alluminio",
      "(d) E un processo di rinvenimento per ridurre il contenuto di austenite residua nell'acciaio 40 NiCrMo7-5-2",
      "(e) E' il trattamento termico T6 della lega AA 2024"
    ],
    "correctAnswer": 2
  },
  {
    "id": "u10",
    "type": "matching",
    "text": "[URBETALLI] Nel caso di processi corrosivi, attribuire la corretta corrispondenza.",
    "prompts": [
      "Cosa produce la corrosione per via umida?",
      "In quali casi si può manifestare la corrosione interstiziale?",
      "Ordine di resistenza in acqua di mare (dal più catodico): Acciai inossidabili passivati, Leghe di Al, Leghe di Ti, Ghise, Leghe di rame.",
      "Cosa produce la corrosione per vaiolatura?"
    ],
    "options": [
      "Leghe di Ti, Acciai inossidabili passivati, Leghe di rame, Ghise, Leghe di Al",
      "Quando si utilizzino delle saldature tra tubazioni dello stesso diametro",
      "Quando si utilizzino bulloni o rondelle per unire dei componenti",
      "Leghe di rame, Acciai inossidabili passivati, Leghe di Al, Ghise, Leghe di Ti",
      "Delle fessurazioni tra due superfici",
      "Dei depositi di ruggine",
      "Dei crateri di tipologia penetrante"
    ],
    "correctAnswers": { "0": 5, "1": 2, "2": 0, "3": 6 }
  },
  {
    "id": "u11",
    "type": "matching",
    "text": "[URBETALLI] Prendiamo in considerazione l'equazione di Hollomon-Jaffe.",
    "imageUrl": "/images/domanda_u11_equazione.png",
    "prompts": [
      "Qual è il campo di applicazione di tale equazione?",
      "Questa equazione descrive la temprabilità degli acciai?",
      "Qual è il significato di n nell'equazione di Hollomon-Jaffe?"
    ],
    "options": [
      "Viene utilizzata nel caso di scorrimento viscoso ad alta temperatura (creep)",
      "Si",
      "No",
      "E' un numero intero che può variare tra 1 e 100",
      "E' l'esponente di incrudimento e vale nell'intervallo 0-1",
      "Viene utilizzata nel caso di imbutitura di acciai da profondo stampaggio"
    ],
    "correctAnswers": { "0": 0, "1": 2, "2": 4 }
  },
  {
    "id": "u12",
    "text": "[URBETALLI] In riferimento al rame ed alle sue leghe:",
    "options": [
      "(a) I bronzi sono leghe di rame e stagno o Cu-Sn_Al con eventualmente P.",
      "(b) La conduttività termica del rame è superiore a quella dell'alluminio",
      "(c) Il rame per usi elettrotecnici deve essere puro ed avere un bassissimo tenore di ossigeno",
      "(d) Il piombo nel rame porta ad elevatissime caratteristiche meccaniche in seguito a solubilizzazione tempra ed invecchiamento",
      "(e) L'aggiunta di Zn come legante del rame (ottoni) fino al 32% porta ad un contemporaneo incremento di resistenza e deformabilità"
    ],
    "correctAnswer": 2
  },
  {
    "id": "u13",
    "text": "[URBETALLI] Rappresentare il ciclo termico di normalizzazione per l'acciaio 18NiCrMo7...",
    "imageUrl": "/images/domanda_u13_grafico_vuoto.jpg",
    "options": null,
    "correctAnswer": null
  }
];

const App = () => {
  const [view, setView] = useState('dashboard');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizSettings, setQuizSettings] = useState({ questionLimit: 10 });
  
  const [selectedProfessor, setSelectedProfessor] = useState('rosalbino');
  const [isMistakesSession, setIsMistakesSession] = useState(false);
  
  // --- GESTIONE MEMORIA LOCALE ---
  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem('moodlePro_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [mistakeIds, setMistakeIds] = useState(() => {
    const saved = localStorage.getItem('moodlePro_mistakes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('moodlePro_history', JSON.stringify(quizHistory));
  }, [quizHistory]);

  useEffect(() => {
    localStorage.setItem('moodlePro_mistakes', JSON.stringify(mistakeIds));
  }, [mistakeIds]);

  const getActiveDatabase = () => {
    if (selectedProfessor === 'rosalbino') return ROSALBINO_QUESTIONS;
    if (selectedProfessor === 'scavino') return SCAVINO_QUESTIONS;
    return URBETALLI_QUESTIONS;
  };

  const ALL_QUESTIONS = [...ROSALBINO_QUESTIONS, ...SCAVINO_QUESTIONS, ...URBETALLI_QUESTIONS];

  // --- LOGICA QUIZ ---
  const prepareQuizQuestions = (questions, limit) => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const actualLimit = limit ? Math.min(limit, shuffledQuestions.length) : shuffledQuestions.length;
    
    return shuffledQuestions.slice(0, actualLimit).map(q => {
      // Se è un menù a tendina, manteniamo le opzioni intatte per non corrompere la mappa delle risposte
      if (q.type === 'matching') {
        return { ...q };
      }

      const optionsWithIndices = q.options.map((opt, i) => ({ text: opt, originalIdx: i }));
      const shuffledOptions = optionsWithIndices.sort(() => Math.random() - 0.5);
      const newCorrectIdx = shuffledOptions.findIndex(o => o.originalIdx === q.correctAnswer);
      
      return { 
        ...q, 
        options: shuffledOptions.map(o => o.text), 
        correctAnswer: newCorrectIdx 
      };
    });
  };

  const startRandomQuiz = () => {
    const currentDB = getActiveDatabase();
    const limit = Math.max(1, parseInt(quizSettings.questionLimit) || 1);
    
    setActiveQuiz(prepareQuizQuestions(currentDB, limit));
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setQuizFinished(false);
    setIsMistakesSession(false);
    setView('quiz');
  };

  const startMistakesQuiz = () => {
    const mistakeQuestions = ALL_QUESTIONS.filter(q => mistakeIds.includes(q.id));
    if (mistakeQuestions.length === 0) return;

    setActiveQuiz(prepareQuizQuestions(mistakeQuestions)); 
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setQuizFinished(false);
    setIsMistakesSession(true);
    setView('quiz');
  };

  const finalizeQuiz = () => {
    let totalScore = 0;
    const wrongIdsThisQuiz = [];
    const correctIdsThisQuiz = [];

    activeQuiz.forEach((q, qIdx) => {
      let isFullyCorrect = false;

      if (q.type === 'matching') {
        const ansObj = userAnswers[qIdx] || {};
        let promptCorrect = 0;
        
        q.prompts.forEach((_, pIdx) => {
          if (ansObj[pIdx] === q.correctAnswers[pIdx]) promptCorrect++;
        });
        
        // Punteggio parziale basato su quante tendine hai indovinato
        totalScore += (promptCorrect / q.prompts.length);
        isFullyCorrect = promptCorrect === q.prompts.length;

      } else {
        if (userAnswers[qIdx] === q.correctAnswer) {
          totalScore += 1;
          isFullyCorrect = true;
        }
      }

      if (isFullyCorrect) correctIdsThisQuiz.push(q.id);
      else wrongIdsThisQuiz.push(q.id);
    });

    const score = Math.round((totalScore / activeQuiz.length) * 100);
    
    setMistakeIds(prev => {
      let updatedMistakes = prev.filter(id => !correctIdsThisQuiz.includes(id));
      return [...new Set([...updatedMistakes, ...wrongIdsThisQuiz])];
    });

    const newResult = {
      id: Date.now().toString(),
      score, 
      total: activeQuiz.length, 
      correct: parseFloat(totalScore.toFixed(2)), 
      date: new Date().toISOString(),
      answers: userAnswers, 
      quizData: activeQuiz,
      professor: isMistakesSession ? 'Ripasso Errori' : selectedProfessor 
    };

    setQuizHistory(prev => [newResult, ...prev]);
    setQuizFinished(true);
  };

  const isQuestionAnswered = (idx) => {
    const q = activeQuiz[idx];
    if (q.type === 'matching') {
      // Per i dropdown controlla se hai risposto a TUTTE le tendine
      return userAnswers[idx] && Object.keys(userAnswers[idx]).length === q.prompts.length;
    }
    return userAnswers[idx] !== undefined;
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

  const Dashboard = () => {
    const currentDBLength = getActiveDatabase().length;

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Benvenuto, Studente</h2>
            <p className="text-gray-500 font-medium italic">preparazione quiz tmm, creato da Marco Vicari per i posteri</p>
          </div>
        </div>

        {mistakeIds.length > 0 && (
          <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-red-100 rounded-2xl text-red-600 shadow-inner">
                <RotateCcw size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-red-900">Hai {mistakeIds.length} {mistakeIds.length === 1 ? 'errore' : 'errori'} da ripassare</h3>
                <p className="text-sm text-red-700 font-medium mt-1">Correggili finché non scompaiono!</p>
              </div>
            </div>
            <button 
              onClick={startMistakesQuiz}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} /> AVVIA RIPASSO
            </button>
          </div>
        )}

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <User size={20} className="text-indigo-600"/> Seleziona il Modulo
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => setSelectedProfessor('rosalbino')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center
                ${selectedProfessor === 'rosalbino' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-gray-50 hover:border-indigo-200 text-gray-500'}`}
            >
              <span className="font-black text-lg">Prof. Rosalbino</span>
              <span className="text-xs font-bold opacity-70">{ROSALBINO_QUESTIONS.length} quesiti in archivio</span>
            </button>
            
            <button 
              onClick={() => setSelectedProfessor('scavino')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center
                ${selectedProfessor === 'scavino' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-gray-50 hover:border-indigo-200 text-gray-500'}`}
            >
              <span className="font-black text-lg">Prof. Scavino</span>
              <span className="text-xs font-bold opacity-70">{SCAVINO_QUESTIONS.length} quesiti in archivio</span>
            </button>

            <button 
              onClick={() => setSelectedProfessor('urbetalli')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center
                ${selectedProfessor === 'urbetalli' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-gray-50 hover:border-indigo-200 text-gray-500'}`}
            >
              <span className="font-black text-lg">Prof. Urbetalli</span>
              <span className="text-xs font-bold opacity-70">{URBETALLI_QUESTIONS.length} quesiti in archivio</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 px-2">
              <Settings2 size={18} className="text-gray-400" />
              <label className="text-xs font-black text-gray-400 uppercase">Quesiti per sessione:</label>
              <input 
                type="number" 
                min="1" 
                max={currentDBLength}
                value={quizSettings.questionLimit}
                onChange={(e) => setQuizSettings({...quizSettings, questionLimit: parseInt(e.target.value) || 1})}
                className="w-16 bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-bold text-indigo-600 outline-none focus:border-indigo-500"
              />
            </div>
            <button 
              onClick={startRandomQuiz}
              disabled={currentDBLength === 0}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-xl flex items-center justify-center gap-2 font-black shadow-lg transition-colors"
            >
              <Shuffle size={18} /> AVVIA TEST
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Clock size={20} className="text-indigo-600"/> Il tuo Storico Recente</h3>
          <div className="space-y-3">
            {quizHistory.length === 0 ? <p className="text-gray-400 py-4 text-center">Nessun test effettuato da te finora.</p> : 
              quizHistory.slice(0, 10).map((res) => (
                <div key={res.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl flex-wrap gap-2">
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className={`p-2 rounded-lg font-black text-xs ${res.score >= 60 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{res.score}%</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">{res.correct}/{res.total} pt. - {new Date(res.date).toLocaleDateString()}</span>
                      <span className="text-[10px] font-black uppercase text-indigo-500 mt-0.5">
                        {res.professor === 'Ripasso Errori' ? '🔥 Ripasso Errori' : `Prof. ${res.professor}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-auto">
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
  };

  const QuizView = () => {
    if (!activeQuiz) return null;
    
    // VISTA: REVISIONE
    if (quizFinished) {
      return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in duration-300">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
            <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Revisione Test</h2>
            <button onClick={() => setView('dashboard')} className="mt-8 bg-gray-900 text-white font-bold px-8 py-3 rounded-2xl hover:bg-black flex items-center gap-2 mx-auto transition-colors">
              <ChevronLeft size={20}/> Torna alla Dashboard
            </button>
          </div>
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {activeQuiz.map((q, qIdx) => {
              
              // Calcolo correttezza per la singola domanda nella revisione
              let isUserCorrect = false;
              if (q.type === 'matching') {
                const ansObj = userAnswers[qIdx] || {};
                isUserCorrect = q.prompts.every((_, pIdx) => ansObj[pIdx] === q.correctAnswers[pIdx]);
              } else {
                isUserCorrect = userAnswers[qIdx] === q.correctAnswer;
              }

              return (
                <div key={qIdx} className="p-8">
                  <div className="flex gap-4 items-start mb-6">
                    <div className={`mt-1 p-1.5 rounded-full flex-shrink-0 ${isUserCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-700'}`}>
                      {isUserCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                    </div>
                    <div className="flex-1 w-full overflow-hidden">
                      <h4 className="text-lg font-bold text-gray-800 leading-tight mb-4">{qIdx + 1}. {q.text}</h4>
                      
                      {q.imageUrl && (
                        <div className="mb-6 flex justify-start bg-gray-50 rounded-xl p-3 border border-gray-100 w-fit">
                          <img src={q.imageUrl} alt="Immagine quesito" className="max-h-48 object-contain rounded-lg shadow-sm" />
                        </div>
                      )}

                      {/* RENDERING REVISIONE: TENDINA vs NORMALE */}
                      {q.type === 'matching' ? (
                        <div className="space-y-4">
                          {q.prompts.map((prompt, pIdx) => {
                            const ansObj = userAnswers[qIdx] || {};
                            const selectedOptIdx = ansObj[pIdx];
                            const correctOptIdx = q.correctAnswers[pIdx];
                            const isPromptCorrect = selectedOptIdx === correctOptIdx;

                            return (
                              <div key={pIdx} className={`p-4 rounded-xl border-2 ${isPromptCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                                <p className="font-bold text-sm mb-3 text-gray-800">{prompt}</p>
                                <div className="text-sm">
                                  <span className="font-semibold text-gray-600">La tua risposta: </span>
                                  <span className={isPromptCorrect ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                                    {selectedOptIdx !== undefined && selectedOptIdx !== "" ? q.options[selectedOptIdx] : "Nessuna risposta"}
                                  </span>
                                </div>
                                {!isPromptCorrect && (
                                  <div className="text-sm mt-2 pt-2 border-t border-red-200">
                                    <span className="font-semibold text-gray-600">Risposta corretta: </span>
                                    <span className="text-green-700 font-bold">{q.options[correctOptIdx]}</span>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ) : (
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
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // VISTA: QUIZ ATTIVO
    const q = activeQuiz[currentQuestionIdx];
    return (
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-start">
        <aside className="lg:w-64 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-28 w-full">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
            {isMistakesSession ? "Mappa Ripasso" : "Mappa Test"}
          </h4>
          <div className="grid grid-cols-5 lg:grid-cols-4 gap-2 mb-8">
            {activeQuiz.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentQuestionIdx(idx)} 
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center 
                ${currentQuestionIdx === idx ? 'bg-indigo-600 text-white scale-110 shadow-lg' : 
                  isQuestionAnswered(idx) ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}
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
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${isMistakesSession ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
                Quesito {currentQuestionIdx + 1}
              </span>
              <div className="flex gap-2">
                <button disabled={currentQuestionIdx === 0} onClick={() => setCurrentQuestionIdx(prev => prev - 1)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 disabled:opacity-30"><ChevronLeft size={20}/></button>
                <button disabled={currentQuestionIdx === activeQuiz.length - 1} onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 disabled:opacity-30"><ChevronRight size={20}/></button>
              </div>
            </div>
            
            <h3 className={`text-2xl font-bold text-gray-800 leading-snug ${q.imageUrl ? 'mb-6' : 'mb-12'}`}>{q.text}</h3>
            
            {q.imageUrl && (
              <div className="mb-8 flex justify-center bg-gray-50 rounded-2xl p-4 border border-gray-100 relative group overflow-hidden">
                <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase shadow-sm">
                  <ImageIcon size={12} /> Allegato
                </div>
                <img src={q.imageUrl} alt="Immagine quesito" className="max-h-64 object-contain rounded-xl shadow-sm mix-blend-multiply" />
              </div>
            )}

            {/* RENDERING DOMANDE: TENDINE vs NORMALI */}
            {q.type === 'matching' ? (
              <div className="space-y-6 mt-auto">
                {q.prompts.map((prompt, pIdx) => {
                  const selectedValue = (userAnswers[currentQuestionIdx] && userAnswers[currentQuestionIdx][pIdx]) !== undefined 
                    ? userAnswers[currentQuestionIdx][pIdx] 
                    : "";

                  return (
                    <div key={pIdx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-4">
                      <p className="font-bold text-gray-800 text-lg">{prompt}</p>
                      <select 
                        className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-indigo-600 transition-all cursor-pointer shadow-sm appearance-none"
                        value={selectedValue}
                        onChange={(e) => {
                          const val = e.target.value === "" ? "" : parseInt(e.target.value);
                          setUserAnswers(prev => ({
                            ...prev,
                            [currentQuestionIdx]: {
                              ...(prev[currentQuestionIdx] || {}),
                              [pIdx]: val
                            }
                          }));
                        }}
                      >
                        <option value="" disabled>Scegli un'opzione...</option>
                        {q.options.map((opt, optIdx) => (
                          <option key={optIdx} value={optIdx}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            ) : (
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
                      <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-colors 
                      ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500'}`}>
                        {String.fromCharCode(65+idx)}
                      </span>
                      <span className={`font-semibold text-lg ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>{opt}</span>
                      {isSelected && <Check size={24} className="ml-auto text-indigo-600 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

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
          <div className="flex-1 min-w-0">
            {view === 'dashboard' && <Dashboard />}
            {view === 'quiz' && <QuizView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;