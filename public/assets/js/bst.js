import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { collection, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { auth, db } from "./firebase_config.js";

// Contains test data for 2 quizes
const creationDate = new Date();
const modificationDate = new Date();

// Update the modification date before saving the quiz to Firestore
modificationDate.setSeconds(modificationDate.getSeconds() + 1);
// newQuiz.modificationDate = modificationDate;

const quizzes = [
    {
        id: 0,
        QuizGroupId: '8000',
        Title: 'Draag jij ook zonnebrand crème in de winter',
        Description: 'Een quiz over de effecten van zonnebrand crème',
        Banner: 'temp-background.jpeg',
        EmbeddedText:
            `<p>In de zomer is zonnebrandcrème <b>onmisbaar</b>, je ziet veel mensen om je heen het gebruiken. Dat is ook logisch, want in de zomer schijnt de zon vaak en wil iedereen tijd buiten doorbrengen. We weten ook dat je van te lang in de zon spelen, kunt verbranden. Om <b>dat</b> te voorkomen gebruiken we zonnebrandcrème. Alleen hoe zit het dan met de dagen waarop de zon niet schijnt? Dan is zonnebrandcrème toch helemaal niet nodig, zou je denken...</p> <p>De zon is eigenlijk een soort ster, maar in plaats van 's nachts te twinkelen zoals de sterren die we aan de hemel zien, straalt de zon altijd fel licht en warmte uit. Naast licht en warmte zendt de zon <b>straling</b> uit. Deze bestaat eigenlijk uit kleine, onzichtbare deeltjes die van de zon afkomen en door de ruimte reizen, helemaal tot aan onze aarde! De zon zendt verschillende soorten stralen uit, waaronder UV-stralen. Deze stralen kunnen goed zijn voor ons omdat ze ons lichaam helpen vitamine D te maken, die belangrijk is voor onze botten en ons immuunsysteem. Maar te veel blootstelling aan UV-stralen kan schadelijk zijn voor onze huid en tot verbranding leiden.</p> <p>Om toch van de zon te genieten zonder te verbranden, kunnen we onszelf beschermen met zonnebrandcrème. Deze crème bevat speciale ingrediënten die een onzichtbare laag op je huid vormen en schadelijke UV-stralen van de zon tegenhouden. Het is hierbij wel belangrijk dat je minstens 30 minuten voordat je naar buiten gaat de zonnebrandcrème aanbrengt, zodat het goed kan intrekken. <b>Ook</b> zal je rekening moeten houden met het kiezen van de juiste zonnebrandcrème. Op elke zonnebrandcrème staat een <b>factor</b> vermeld. Dit is eigenlijk de sterkte waarmee de zonnebrandcrème je huid beschermt. Vaak wordt dit aangegeven in ‘SPF’, die staat voor ‘Sun Protection Factor’. De SPF is een getal dat aangeeft hoeveel langer je in de zon kunt blijven zonder te verbranden in vergelijking met wanneer je geen zonnebrandcrème gebruikt. Tot slot moet je niet vergeten om zonnebrandcrème om het paar uur opnieuw in te smeren!</p> <p>De zon zendt dus constant straling uit. Dat betekent dat je lichaam elke dag wordt blootgesteld aan UV-stralen, zelfs wanneer je de zon niet ziet schijnen of als het niet warm is. UV-stralen kunnen namelijk door bewolking en glas heen dringen. Het is dus belangrijk om dagelijks zonnebrandcrème te smeren om een gezonde huid te behouden. Dan is zonnebrandcrème in de winter toch niet zo gek als het klinkt!</p>`,
        Difficulty: 'easy',
        QuizType: 'anders',
        Created_at: creationDate,
        Modified_at: modificationDate,
        Questions: [
            {
                QuestionId: '1',
                Text: 'Wat betekent ”onmisbaar” (alinea 1)?',
                Options: ['Onnodig', 'Vermist', 'Noodzakelijk', 'Verplicht'],
                CorrectOption: 2,
                Hint: 'Vervang het woord ‘onmisbaar’ in de tekst door jouw gekozen antwoord.',
                CorrectOptionDescription: `In de zomer is het belangrijk om zonnebrandcrème te smeren, maar niet verplicht. Het woord noodzakelijk is een synoniem van onmisbaar.`,
                QuestionType: "Multiple Choice"
            },
            {
                QuestionId: '2',
                Text: 'Waar verwijst het woord “dat” naar in (alinea 1)?',
                Options: ['Verbranden', 'In de zon spelen', 'Zonnebrandcréme', 'Te lang'],
                CorrectOption: 0,
                Hint: 'Wat klinkt het meest logisch?',
                CorrectOptionDescription: `Het antwoord op de vraag ‘Wat kun je voorkomen met zonnebrandcrème?' is, verbranden. `,
                QuestionType: "Multiple Choice"
            },
            {
                QuestionId: '3',
                Text: 'Welk tussenkopje past het beste boven alinea 2?',
                Options: ['Straling', 'De grootste ster', 'De zon', 'UV-Straling'],
                CorrectOption: 2,
                Hint: 'Wat kun je voorkomen met zonnebrandcréme?',
                CorrectOptionDescription: `In deze alinea worden er verschillende punten van de zon beschreven. Het gehele thema is de zon en daarom past antwoord C het beste als het tussenkopje van alinea 2.`,
                QuestionType: "Multiple Choice"
            },
            {
                QuestionId: '4',
                Text: 'Welke betekenis past het beste bij “straling” (alinea 2)?',
                Options: ['Warmte', 'Fel licht', 'Kleine, onzichtbare deeltjes die naar de aarde reizen.', 'Immuunsysteem'],
                CorrectOption: 2,
                Hint: 'Kies het juiste antwoord dat past bij de vraag.',
                CorrectOptionDescription: `In de tekst staat dat de zon ook straling uitzendt. De zin erna beschrijft dat straling uit kleine onzichtbare deeltjes bestaat.`,
                QuestionType: "Multiple Choice"
            },
            {
                QuestionId: '5',
                Text: 'Welke uitspraken over UV-stralingen zijn juist?',
                Options: ['UV-straling komt van de zon.', 'Te veel UV-straling is goed voor je lichaam.', 'De zon zendt alleen UV-straling uit.', 'UV-straling helpt je met een vitamine aanmaken en je weerstand.'],
                CorrectOption: 0,
                Hint: 'Denk aan wat er in de alinea 2 wordt besproken. In die alinea wordt vooral gesproken over de zon en wat de zon is.',
                CorrectOptionDescription: `Uit de tekst blijkt dat UV-straling van de zon komt, maar dit is niet de enige straling die de zon uitzendt. UV-straling helpt je lichaam met de aanmaak van vitamine D en is goed voor je immuunsysteem. Alhoewel, te veel UV-straling leidt tot beschadiging van je huid.`,
                QuestionType: "Multiple Choice"
            },
            {
                QuestionId: '6',
                Text: 'Welk tussenkopje past het beste boven alinea 3?',
                Options: ['SPF', 'Waarom verbrand je door de zon?', 'Hoe werkt zonnebrandcrème?', 'Gevaren van de zon.'],
                CorrectOption: 2,
                Hint: 'Welk tussenkopje past het beste bij dat onderwerp?',
                CorrectOptionDescription: `In deze alinea worden er verschillende punten van zonnebrandcrème beschreven. Het gehele thema is werking van zonnebrandcrème en daarom past antwoord C het beste als het tussenkopje van alinea 3.`,
                QuestionType: "Multiple Choice"
            },
            {
                QuestionId: '7',
                Text: 'Wat voor soort signaalwoord is het woord “ook” (alinea 3)?',
                Options: ['Tegenstellend', 'Opsommend', 'Voorbeeld', 'Redengevend'],
                CorrectOption: 1,
                Hint: 'Lees de zin waarin het woord "ook" wordt gebruikt. Probeer te bedenken of het woord "ook" aangeeft: - Dat er iets tegenovergesteld wordt gezegd. (Tegenstellend) - Dat er iets wordt toegevoegd aan wat al eerder is genoemd. (Opsommend) - Dat er een voorbeeld wordt genoemd. (Voorbeeld) - Dat er wordt uitgelegd waarom iets is gebeurd. (Redengevend) Welke van de opties past het beste bij de rol van "ook"?',
                CorrectOptionDescription: `Het signaalwoord ook, geeft aan dat er meer dingen zijn. Het helpt ons begrijpen dat de schrijver een lijst maakt van verschillende dingen. In de tekst werden er meerdere dingen verteld over zonnebrandcrème. `,
                QuestionType: "Multiple Choice"
            },
            {
                QuestionId: '8',
                Text: 'Wat wordt er bedoeld met “factor” (alinea 3)?',
                Options: ['De sterkte waarmee zonnebrandcrème je huid beschermt.', 'Hoeveelheid', 'Een tv programma', 'Een zonnebrand merk'],
                CorrectOption: 0,
                Hint: 'In de tekst staat uitgelegd hoe zonnebrandcrème werkt en waarom het belangrijk is. Lees goed wat er wordt uitgelegd nadat het woord "factor" is genoemd.',
                CorrectOptionDescription: `In de tekst staat dat het woord factor op de verpakkingen van zonnebrandcrème staat. De zin erna beschrijft dat dit de sterkte is waarmee zonnebrandcrème je huid beschermt.`,
                QuestionType: "Multiple Choice"
            },
            {
                QuestionId: '9',
                Text: 'Welk tussenkopje past het beste boven alinea 4?',
                Options: ['Straling', 'Slecht weer', 'Een gezonde huid', 'Gebruik zonnebrandcrème elke dag!'],
                CorrectOption: 3,
                Hint: 'Bedenk welk tussenkopje past het beste bij dat onderwerp.',
                CorrectOptionDescription: `In deze alinea wordt uitgelegd waarom je op niet zonnige dagen zonnebrandcrème moet smeren. Het gehele thema is elke dag zonnebrandcrème smeren en daarom past antwoord D het beste als het tussenkopje van alinea 4.`,
                QuestionType: "Multiple Choice"
            },
            {
                QuestionId: '10',
                Text: 'Lees de laatste zin: Dan is … het klinkt! (alinea 4)',
                Options: ['Dat het normaal is om zonnebrandcrème te dragen op niet zonnige dagen.', 'Zonnebrandcrème geeft een gek geluid.', 'Het is gek om in de winter zonnebrandcrème te smeren.', 'Je moet alleen zonnebrandcrème in de winter dragen.'],
                CorrectOption: 0,
                Hint: 'Bedenk eerst waarom het gek is om zonnebrandcrème in de winter te smeren. Denk daarna aan wat er in alinea 4 wordt uitgelegd.',
                CorrectOptionDescription: `De schrijver wilt met deze zin zeggen dat het niet raar is om op niet zonnige dagen zonnebrandcrème te dragen, zelfs niet in de winter.Dus de schrijver vindt het normaal om  elke dag zonnebrandcrème te smeren. `,
                QuestionType: "Multiple Choice"
            }
        ]
    },
    {
        id: 1,
        QuizGroupId: '8000',
        Title: 'Entertainment in het Romeinse Rijk',
        Description: 'Een quiz over vormen van entertainment gedurende het Romeinse Rijk',
        Banner: 'rome-banner.jpeg',
        EmbeddedText: `<p>Wist je dat er vroeger in het oude Rome geweldige gevechten waren tussen gladiatoren? En keizers die regeerden in een enorm, machtig rijk! Het Romeinse Rijk en zijn overblijfselen zijn heel belangrijk voor de wereldgeschiedenis. Een van die overblijfselen is het Colosseum dat in het midden van de stad stond. Het Colosseum vertelt ons veel over hoe het leven was in die tijd. </p> <p>Het Colosseum werd in de 1e eeuw na Christus (n. Chr) gebouwd door Romeinse keizers in Rome. Het Colosseum is een symbool van de keizerlijke macht van het Romeinse Rijk. Het was ooit het toneel van <strong>grandioze</strong> evenementen, georganiseerd door de keizers en er konden wel 50.000 toeschouwers deelnemen. <strong>Daarnaast</strong> was het Colosseum een enorme, ovaalvormige plek met zuilen en bogen die zorgden dat het niet in elkaar storten. </p> <p>De keizers verloren hun macht na het verliezen van veel oorlogen, maar ze moesten nog steeds de bevolking tevreden houden. Daarom bouwden ze het Colosseum zodat de burgers van het Romeinse Rijk zich vermaakten. Gladiatorengevechten waren het meest populair, waar gladiatoren elkaar bevochten, soms tot de dood. Gladiatoren waren slaven of misdadigers die werden gekozen door de keizer en de Romeinen. De keizer had de macht om het lot van de verliezer te bepalen: leven of dood. Dit deed hij door zijn duim omhoog of omlaag te doen. Omhoog betekende dat ze mochten leven en omlaag een zekere dood. <strong>Ze</strong> streden ook tegen wilde, exotische dieren zoals leeuwen en tijgers. Deze dieren werden onder het Colosseum in grote kooien gehouden, waar ze bijna geen voedsel kregen zodat ze extra veel trek in de gladiatoren. Naast gladiatorengevechten werden er ook race wedstrijden gehouden in het Colosseum, waarbij paarden en strijdkarren werden gebruikt. <p>
        <p>Dit was natuurlijk heel erg gevaarlijk en bloederig. Dus in de 4e eeuw probeerden de Romeinse keizers de gevaarlijke gevechten tot de dood te verminderen door kerken te bouwen. Maar toch bleven de spelen in het Colosseum populair. In 404 n. Chr protesteerde een monnik genaamd Telemachos tegen de gevechten door de arena binnen te gaan en protesteerde door niks te doen in het gevecht. Helaas overleed hij maar zijn dood maakte indruk opkeizer Honorius, die uiteindelijk de spelen beëindigde. </p>
        `,
        Difficulty: 'easy',
        QuizType: 'anders',
        Created_at: creationDate,
        Modified_at: modificationDate,
        Questions: [
            {
                id: '1',
                Text: 'Welk tussenkopje past het best op alinea 2?',
                Options: ['Verkenning van het Colosseum', 'De keizerlijke roem in het colosseum', 'Een eeuwig monument', 'Een symbool van de moderne Romeinse stad'],
                CorrectOption: 1,
                Hint: 'Denk aan wat er in de alinea 2 wordt besproken. In die alinea wordt vooral gesproken over hoe het Colosseum is gebouwd en hoe evenementen werden georganiseerd door de keizers.',
                CorrectOptionDescription: 'De keizerlijke roem in het colosseum',
                Type: 'Multiple Choice'
            },
            {
                id: '2',
                Text: 'Wat betekent “grandioze” in alinea 2?',
                Options: ['Klein en dramatisch', 'Eenvoudig en simpel', 'Bescheiden en onopvallend', 'Indrukwekkend en groots'],
                CorrectOption: 3,
                Hint: 'Vervang het woord “grandioze” in de tekst te vervangen door jouw gekozen antwoord.',
                CorrectOptionDescription: 'Indrukwekkend en groots',
                Type: 'Multiple Choice'
            },
            {
                id: '3',
                Text: 'Wat voor soort signaalwoord is “daarnaast” in alinea 2?',
                Options: ['Opsomming', 'Oorzaak', 'Tegenstelling', 'Redengevend'],
                CorrectOption: 0,
                Hint: 'Kijk naar de zin waarin het woord "daarnaast" wordt gebruikt. Probeer te bedenken of het woord "daarnaast" aangeeft: - Dat er iets tegenovergesteld wordt gezegd. (Tegenstellend) - Dat er iets wordt toegevoegd aan wat al eerder is genoemd. (Opsommend) - Dat er iets gebeurt dat kan leiden tot iets anders. (Oorzaak) - Dat er wordt uitgelegd waarom iets is gebeurd. (Redengevend)',
                CorrectOptionDescription: 'Opsomming',
                Type: 'Multiple Choice'
            },
            {
                id: '4',
                Text: 'Welk tussenkopje past het best op alinea 3?',
                Options: ['Een arena van levensbeslissingen.', 'Gevaarlijke wedstrijden.', 'Amusement in het Colosseum.', 'De keizer kiest.'],
                CorrectOption: 2,
                Hint: 'Denk aan wat er in de alinea 3 wordt besproken. In die alinea wordt vooral gesproken over wat er allemaal gebeurt in het Colosseum.',
                CorrectOptionDescription: 'Amusement in het Colosseum.',
                Type: 'Multiple Choice'
            },
            {
                id: '5',
                Text: 'Wat was het doel van de gladiatorengevechten in het Colosseum?',
                Options: ['Het doel was dat de keizer zijn macht kon laten zien aan de burgers.', 'Het doel was om iets leuks te doen omdat ze oorlogen hadden verloren.', 'Het doel was om de burgers te vermaken.', 'Het doel was om de slaven en misdadigers te straffen.'],
                CorrectOption: 2,
                Hint: 'Lees de eerste twee zinnen van alinea 3.',
                CorrectOptionDescription: 'Het doel was om de burgers te vermaken.',
                Type: 'Multiple Choice'
            },
            {
                id: '6',
                Text: 'Waarnaar verwijst het woord “ze” in alinea 3?',
                Options: ['De gladiatoren van het Colosseum', 'De Romeinse keizers', 'De burgers van het Romeinse Rijk', 'De misdadigers van het Romeinse Rijk'],
                CorrectOption: 0,
                Hint: 'Lees alinea 3 goed door. Wie vochten in het Colosseum en hoe werden ze genoemd?',
                CorrectOptionDescription: 'De gladiatoren van het Colosseum',
                Type: 'Multiple Choice'
            },
            {
                id: '7',
                Text: 'Welke uitspraken over alinea 3 zijn goed?',
                Options: ['Zin 1 en 2 zijn goed, zin 3 is fout.', 'Zin 1 en 3 zijn goed, zin 2 is fout.', 'Alleen zin 1 is goed, zin 2 en 3 zijn fout.', 'Alleen zin 2 is goed, zin 1 en 3 zijn fout.'],
                CorrectOption: 1,
                Hint: 'Lees de uitspraken goed door en ga ze één voor één af. Gebruik hierbij de informatie van alinea 3.',
                CorrectOptionDescription: 'Zin 1 en 3 zijn goed, zin 2 is fout',
                Type: 'Multiple Choice'
            },
            {
                id: '8',
                Text: 'Welk tussenkopje past het best op alinea 4?',
                Options: ['De opkomst van de Romeinse keizers.', 'Telemachos zijn strijd in de Arena.', 'Het colosseum na de 4e eeuw.', 'Het einde van de gladiatorenspelen.'],
                CorrectOption: 3,
                Hint: 'Denk aan wat er in de alinea 4 wordt besproken. In die alinea wordt vooral gesproken over de gebeurtenissen die leiden tot het einde van de gevechten.',
                CorrectOptionDescription: 'Het einde van de gladiatorenspelen.',
                Type: 'Multiple Choice'
            },
            {
                id: '9',
                Text: 'Hoe kwam er een eind aan de gevechten in het Colosseum?',
                Options: ['De Romeinse burgers waren niet meer geïnteresseerd in het Colosseum.', 'De Keizer Honorius eindigde de spelen omdat hij onder de indruk was van de dood van Telemachos.', 'De Romeinse keizers wilden de gevaren verminderen.', 'Telemachos protesteerde en eindigde de gevechten.'],
                CorrectOption: 1,
                Hint: 'Lees: “In 404 n. Chr protesteerde een monnik genaamd Telemachos tegen de wreedheden door de arena binnen te gaan en te proberen het geweld te stoppen. Hij overleed in het gevecht en zijn dood maakte indruk op keizer Honorius, die uiteindelijk de Spelen beëindigde.”',
                CorrectOptionDescription: 'De Keizer Honorius eindigde de spelen omdat hij onder de indruk was van de dood van Telemachos.',
                Type: 'Multiple Choice'
            },
            {
                id: '10',
                Text: 'Wat is het doel van de schrijver?',
                Options: ['De schrijver wilt de lezer amuseren.', 'De schrijver wilt dat de lezer een mening vormt over het onderwerp.', 'De schrijver wilt de lezer overtuigen.', 'De schrijver wilt de lezer informeren.'],
                CorrectOption: 3,
                Hint: 'Lees de zin en bedenk welk antwoord het beste bij de tekst past. Probeer te bedenken of de tekst: de lezer probeert te vermaken door een verzonnen verhaal te vertellen (Amuseren). de lezer laat denken waardoor hij een mening kan vormen over de tekst (Een mening vormen). de lezer probeert te overtuigen over wat er allemaal in de tekst staat (Overtuigen). de lezer probeert te informeren over feiten (Informeren).',
                CorrectOptionDescription: 'De schrijver wilt de lezer informeren over feiten.',
                Type: 'Multiple Choice'
            }
        ]
    }
];

// Temporary function for uploading a quiz filled with test data and sends it to Firestore
async function updateQuizzes() {
    try {
        const quizzesRef = collection(db, "quizzes");

        // Loop through the quizzes array and create a document for each quiz
        for (const quiz of quizzes) {
            const quizId = (quiz.id || 0).toString();
            const quizDocRef = doc(quizzesRef, quizId);

            // Try to get the document
            const quizDocSnap = await getDoc(quizDocRef);

            // If the document doesn't exist, create it
            if (!quizDocSnap.exists()) {
                console.log("Creating new quiz document...", quizId);
                await setDoc(quizDocRef, quiz);
                console.log("Quiz document created!");
            }
        }

        console.log("All quiz documents updated!");

    } catch (error) {
        console.error("Error updating quizzes document:", error);
    }
};


async function getQuizById(quizDocRef) {
    const quizDocSnap = await getDoc(quizDocRef);

    if (quizDocSnap.exists()) {
        const quizDocData = quizDocSnap.data();
        // Process the quiz document data as needed
        return quizDocData;
    } else {
        console.log(`No quiz found with ID ${quizDocRef.id}`);
        return null;
    }
}

/* Binary Search Tree logic related to searching relevant quiz data*/
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    add(data) {
        const node = this.root;
        if (node === null) {
            this.root = new Node(data);
            return;
        } else {
            const searchTree = function (node) {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }

    generate(numNodes = 4096) {
        for (let i = 0; i < numNodes; i++) {
            this.add(i);
        }
    };

    find(value) {
        if (this.root === null) {
            return null;
        }
        return this._find(this.root, value);
    }

    _find(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            return this._find(node.left, value);
        } else if (value > node.value) {
            return this._find(node.right, value);
        } else {
            return node;
        }
    }

    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
}

// findMin() {
//     let current = this.root;
//     while (current.left !== null) {
//         current = current.left;
//     }
//     return current.data;
// }
// findMax() {
//     let current = this.root;
//     while (current.right !== null) {
//         current = current.right;
//     }
//     return current.data;
// }

// isPresent(data) {
//     let current = this.root;
//     while (current) {
//         if (data === current.data) {
//             return true;
//         }
//         if (data < current.data) {
//             current = current.left;
//         } else {
//             current = current.right;
//         }
//     }
//     return false;
// }
// remove(data) {
//     const removeNode = function (node, data) {
//         if (node == null) {
//             return null;
//         }
//         if (data == node.data) {
//             // node has no children 
//             if (node.left == null && node.right == null) {
//                 return null;
//             }
//             // node has no left child 
//             if (node.left == null) {
//                 return node.right;
//             }
//             // node has no right child 
//             if (node.right == null) {
//                 return node.left;
//             }
//             // node has two children 
//             var tempNode = node.right;
//             while (tempNode.left !== null) {
//                 tempNode = tempNode.left;
//             }
//             node.data = tempNode.data;
//             node.right = removeNode(node.right, tempNode.data);
//             return node;
//         } else if (data < node.data) {
//             node.left = removeNode(node.left, data);
//             return node;
//         } else {
//             node.right = removeNode(node.right, data);
//             return node;
//         }
//     }
//     this.root = removeNode(this.root, data);
// }
// isBalanced() {
//     return (this.findMinHeight() >= this.findMaxHeight() - 1)
// }
// findMinHeight(node = this.root) {
//     if (node == null) {
//         return -1;
//     };
//     let left = this.findMinHeight(node.left);
//     let right = this.findMinHeight(node.right);
//     if (left < right) {
//         return left + 1;
//     } else {
//         return right + 1;
//     };
// }
// findMaxHeight(node = this.root) {
//     if (node == null) {
//         return -1;
//     };
//     let left = this.findMaxHeight(node.left);
//     let right = this.findMaxHeight(node.right);
//     if (left > right) {
//         return left + 1;
//     } else {
//         return right + 1;
//     };
// }


let quizIdInput;

// Cals the updateQuizzes function
updateQuizzes();
const runBtn = document.getElementById("run-btn");
runBtn.addEventListener("click", async () => {

    const quizIdInput = Number(document.getElementById("quiz-id-input").value);

    // Creates Binary Search Tree
    const bst = new BST();
    bst.generate();

    bst.add(1024);
    bst.add(3072);
    bst.add(256);
    bst.add(768);
    bst.add(2304);
    bst.add(767);
    bst.add(3);

    console.log("quizIdInput:", quizIdInput);
    const node = bst.find(quizIdInput);

    if (node) {
        console.log(`Node with value ${node.data} found!`);

        // Use the Firebase Firestore API to retrieve the quiz data for the node
        const quizDocRef = doc(db, "quizzes", `${quizIdInput}`);
        const quizData = await getQuizById(quizDocRef);

        console.log("Quiz data retrieved correctly:", quizData);

        if (quizData === null) {
            console.log("The retrieved quiz data is empty.");
        }
    } else {
        console.log(`Quiz with Id ${quizIdInput} not found in the BST`);
    }
});


// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {

        // Runs BST and Quiz retrieval code
        console.log('Current User Email:', user.email);
        // Cals the updateQuizzes function

    } else {
        // Redirect the user to the 'login_parent_tvt.html' page if the user is not logged in
        window.location.href = "login_parent_tvt.html";
    }
});


