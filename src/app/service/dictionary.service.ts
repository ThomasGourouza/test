import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
export interface Item {
}
export interface Word {
  category: string;
  expression: string;
  translation: string;
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private _dictionary!: Array<Word>;

  private _verbsCategoryName: string = "Verbes";
  private _nounsCategoryName: string = "Noms";
  private _adjectivesCategoryName: string = "Adjectifs";
  private _expressionsCategoryName: string = "Expressions";

  
  constructor() {
    this.init();
    const firebaseConfig = {
      apiKey: "AIzaSyAckgn0KwGstkB-duM03Gsv8pyFMBXnuSU",
      authDomain: "dictionary-f8aa9.firebaseapp.com",
      projectId: "dictionary-f8aa9",
      storageBucket: "dictionary-f8aa9.appspot.com",
      messagingSenderId: "577696819589",
      appId: "1:577696819589:web:3b9e809f82759376f0bcec"
    };
    const app = initializeApp(firebaseConfig);
    console.log(app);
  }

  get dictionary(): Array<Word> {
    return this._dictionary;
  }

  get verbsCategoryName(): string {
    return this._verbsCategoryName;
  }
  get nounsCategoryName(): string {
    return this._nounsCategoryName;
  }
  get adjectivesCategoryName(): string {
    return this._adjectivesCategoryName;
  }
  get expressionsCategoryName(): string {
    return this._expressionsCategoryName;
  }

  private init(): void {
    this._dictionary = [
      { category: "verb", expression: "(ver)schief gehen", translation: "go wrong" },
      { category: "verb", expression: "verwalten", translation: "manage" },
      { category: "verb", expression: "einfügen", translation: "insert" },
      { category: "verb", expression: "beibringen", translation: "to teach" },
      { category: "verb", expression: "umsetzen", translation: "implement" },
      { category: "verb", expression: "erfassen", translation: "capture" },
      { category: "verb", expression: "abstimmen", translation: "vote" },
      { category: "verb", expression: "schätzen", translation: "estimate" },
      { category: "verb", expression: "sich beklagen/sich beschweren", translation: "se plaindre" },
      { category: "verb", expression: "erstellen", translation: "create" },
      { category: "verb", expression: "eingeben", translation: "enter" },
      { category: "verb", expression: "erzeugen", translation: "générer" },
      { category: "verb", expression: "entfernen", translation: "remove" },
      { category: "verb", expression: "anstehen", translation: "stand in line/queue" },
      { category: "verb", expression: "benötigen", translation: "require" },
      { category: "verb", expression: "bevorzugen", translation: "to prefer" },
      { category: "verb", expression: "erkunden", translation: "explore" },
      { category: "verb", expression: "heben", translation: "soulever" },
      { category: "verb", expression: "zurückziehen", translation: "retirer" },
      { category: "verb", expression: "abgeben", translation: "rendre" },
      { category: "verb", expression: "halten für", translation: "consider" },
      { category: "verb", expression: "weiterleiten (weitergeleitet)", translation: "forward" },
      { category: "verb", expression: "aufnehmen", translation: "enregistrer/record" },
      { category: "verb", expression: "betrachten", translation: "consider" },
      { category: "verb", expression: "berücksichtigen (berücksichtigt)", translation: "prendre en compte" },
      { category: "verb", expression: "verwandeln", translation: "transform" },
      { category: "verb", expression: "umwandeln", translation: "convert" },
      { category: "verb", expression: "beobachten", translation: "observer" },
      { category: "verb", expression: "stattfinden", translation: "occur / take place" },
      { category: "verb", expression: "auslösen", translation: "déclencher" },
      { category: "verb", expression: "jemanden auslachen", translation: "se moquer de quelqu'un" },
      { category: "verb", expression: "zunehmen", translation: "prendre du poids" },
      { category: "verb", expression: "abnehmen", translation: "perdre du poids" },
      { category: "verb", expression: "wegdrücken", translation: "push away" },
      { category: "verb", expression: "anziehen", translation: "put on" },
      { category: "verb", expression: "ausziehen", translation: "take off" },
      { category: "verb", expression: "nachfragen", translation: "demander" },
      { category: "verb", expression: "auskennen", translation: "to know about" },
      { category: "verb", expression: "rumfragen", translation: "ask around" },
      { category: "verb", expression: "aufklappen", translation: "ouvrir" },
      { category: "verb", expression: "überreden", translation: "persuader" },
      { category: "verb", expression: "überzeugen", translation: "convaincre" },
      { category: "verb", expression: "sich verhalten/sich benehmen", translation: "behave" },
      { category: "verb", expression: "vorgeben", translation: "pretend" },
      { category: "verb", expression: "sich beziehen auf", translation: "se référer à" },
      { category: "verb", expression: "bewerten", translation: "assess" },
      { category: "verb", expression: "ablaufen", translation: "expire" },
      { category: "verb", expression: "übernehmen", translation: "to take over" },
      { category: "verb", expression: "beißen (gebißen)", translation: "mordre" },
      { category: "verb", expression: "ablösen", translation: "détacher" },
      { category: "verb", expression: "besorgen", translation: "take care of" },
      { category: "verb", expression: "beibehalten", translation: "maintenir" },
      { category: "verb", expression: "beibelassen", translation: "leave at it is" },
      { category: "verb", expression: "vorbeikommen", translation: "come over" },
      { category: "verb", expression: "vorbeibringen", translation: "bring over" },
      { category: "verb", expression: "ausschlafen", translation: "faire la grace matinée" },
      { category: "verb", expression: "abbrechen", translation: "abort" },
      { category: "verb", expression: "nachsehen", translation: "check" },
      { category: "verb", expression: "darauf achten", translation: "be careful" },
      { category: "verb", expression: "mitgeben", translation: "révéler" },
      { category: "verb", expression: "herausfinden", translation: "find out" },
      { category: "verb", expression: "einspielen", translation: "donner un signal" },
      { category: "verb", expression: "feststellen", translation: "se rendre compte" },
      { category: "verb", expression: "zurückkehren", translation: "to come back" },
      { category: "verb", expression: "jemanden munter machen", translation: "rendre qqun joyeux" },
      { category: "verb", expression: "jemanden aufheitern", translation: "to cheer up someone" },
      { category: "verb", expression: "ermutigen", translation: "encourage" },
      { category: "verb", expression: "trösten", translation: "consoler" },

      { category: "noun", expression: "die Eigenschaft", translation: "property" },
      { category: "noun", expression: "Die Fehlermeldung", translation: "message d'erreur" },
      { category: "noun", expression: "die Schuld", translation: "faute" },
      { category: "noun", expression: "das verständnis", translation: "understanding" },
      { category: "noun", expression: "die anwesenheit", translation: "la présence" },
      { category: "noun", expression: "der Zustand", translation: "state" },
      { category: "noun", expression: "die Schublade", translation: "tiroir" },
      { category: "noun", expression: "die Schablone", translation: "template" },
      { category: "noun", expression: "die Abwechslung / die Vielfalt", translation: "la variété" },
      { category: "noun", expression: "die Anforderung", translation: "requirement" },
      { category: "noun", expression: "Ausnahme", translation: "exception" },
      { category: "noun", expression: "das Erzeugnis", translation: "product" },
      { category: "noun", expression: "der Strich", translation: "trait" },
      { category: "noun", expression: "die Notwendigkeit", translation: "nécessité" },
      { category: "noun", expression: "die Rückmeldung", translation: "feedback" },
      { category: "noun", expression: "die Oberfläche", translation: "surface" },
      { category: "noun", expression: "die Anzahl", translation: "numéro/nombre" },
      { category: "noun", expression: "das Werkzeug", translation: "tool" },
      { category: "noun", expression: "der Mehrzahl", translation: "plural" },
      { category: "noun", expression: "die Umgebung / die Umwelt", translation: "environement" },
      { category: "noun", expression: "der Ansatz", translation: "une approche" },
      { category: "noun", expression: "der Hinweis", translation: "une note / indice" },
      { category: "noun", expression: "der Ausflug", translation: "excursion" },
      { category: "noun", expression: "der Satz", translation: "la phrase" },
      { category: "noun", expression: "das Pech", translation: "bad luck" },
      { category: "noun", expression: "die Tastatur", translation: "clavier" },
      { category: "noun", expression: "der Oberste", translation: "the top one" },
      { category: "noun", expression: "die Reihenfolge", translation: "the order" },
      { category: "noun", expression: "der Unterschied", translation: "la différence" },
      { category: "noun", expression: "der Notfall", translation: "urgence" },
      { category: "noun", expression: "der Wecker", translation: "alarm clock" },
      { category: "noun", expression: "der Vorgängner", translation: "predecessor" },
      { category: "noun", expression: "der Nachgängner", translation: "successor" },
      { category: "noun", expression: "die Maßnahme", translation: "measure" },
      { category: "noun", expression: "die Vermutung", translation: "la supposition" },
      { category: "noun", expression: "das Leerzeichen", translation: "espace" },
      { category: "noun", expression: "das Ausrufezeichen", translation: "exclamation mark" },
      { category: "noun", expression: "das Fragezeichen", translation: "Question mark" },
      { category: "noun", expression: "das Vergnügen", translation: "plaisir" },
      { category: "noun", expression: "der Abstand", translation: "distance" },

      { category: "adjective", expression: "zugriff verweigert", translation: "access denied" },
      { category: "adjective", expression: "zusätzlich", translation: "en plus" },
      { category: "adjective", expression: "überzeugt (von)", translation: "convaincu (de)" },
      { category: "adjective", expression: "bescheiden", translation: "modeste" },
      { category: "adjective", expression: "verschiebbar", translation: "movable" },
      { category: "adjective", expression: "scheinbar", translation: "apparently" },
      { category: "adjective", expression: "überrascht", translation: "surprised" },
      { category: "adjective", expression: "regelmäßig", translation: "regularly" },
      { category: "adjective", expression: "wesentlich", translation: "considérablement" },
      { category: "adjective", expression: "bezüglich + datif", translation: "regarding" },
      { category: "adjective", expression: "ggfs.", translation: "gegebenenfalls" },
      { category: "adjective", expression: "bzw.", translation: "beziehungsweise" },
      { category: "adjective", expression: "abwesend", translation: "absent" },
      { category: "adjective", expression: "verantwortlich, zuständig", translation: "responsable" },
      { category: "adjective", expression: "wertvoll", translation: "valuable" },
      { category: "adjective", expression: "letztendlich", translation: "in the end" },
      { category: "adjective", expression: "veraltet", translation: "out of date" },
      { category: "adjective", expression: "Notwendig", translation: "nécessaire" },
      { category: "adjective", expression: "oberflächlich", translation: "superficial" },
      { category: "adjective", expression: "vollkommen / vollständig", translation: "completely" },
      { category: "adjective", expression: "erforderlich", translation: "obligatoire" },
      { category: "adjective", expression: "auswendig lernen", translation: "apprendre par cœur" },
      { category: "adjective", expression: "zurecht", translation: "à juste titre" },
      { category: "adjective", expression: "spätestens", translation: "au plus tard" },
      { category: "adjective", expression: "mindestens", translation: "au moins" },
      { category: "adjective", expression: "übel / böse", translation: "evil" },
      { category: "adjective", expression: "förderlich", translation: "bénéfique" },
      { category: "adjective", expression: "gemütlich", translation: "confortable" },
      { category: "adjective", expression: "regelmäßig", translation: "regularly" },
      { category: "adjective", expression: "grundsätzlich", translation: "essentiellement" },
      { category: "adjective", expression: "bezüglicherweise", translation: "relatif à" },
      { category: "adjective", expression: "besorgt", translation: "concerned" },
      { category: "adjective", expression: "frühestens", translation: "at earliest" },
      { category: "adjective", expression: "kontraproduktiv", translation: "contre productif" },
      { category: "adjective", expression: "im Voraus", translation: "in advance" },
      { category: "adjective", expression: "teilweise", translation: "partially/sometimes" },
      { category: "adjective", expression: "ursprünglich", translation: "originally" },
      { category: "adjective", expression: "verfault", translation: "rotten" },
      { category: "adjective", expression: "ausgezeichnet", translation: "excellent" },
      { category: "adjective", expression: "nirgends, nirgendwo", translation: "nowhere" },

      { category: "expression", expression: "In dieser Woche habe ich an einer Lösung gearbeitet", translation: "this week I've been working on a solution" },
      { category: "expression", expression: "er mischte zum guten etwas schlechtes und umgekehrt", translation: "he mixed something bad for good and vice versa" },
      { category: "expression", expression: "Kein Thema", translation: "no problem" },
      { category: "expression", expression: "soweit ich weiß", translation: "as far as I know" },
      { category: "expression", expression: "soviel ich weiß", translation: "as much as I know" },
      { category: "expression", expression: "das ganze Thema", translation: "the whole subject" },
      { category: "expression", expression: "soweit ich das verstanden habe", translation: "pour autant que j'ai compris" },
      { category: "expression", expression: "in letzter zeit", translation: "ces dernier temps" },
      { category: "expression", expression: "Ich bin daran gewöhnt", translation: "j'y suis habitué" },
      { category: "expression", expression: "ich verabschiede mich", translation: "I say goodbye" },
      { category: "expression", expression: "er hat beschlossen", translation: "il a décidé" },
      { category: "expression", expression: "Von meiner Seite aus", translation: "from my side" },
      { category: "expression", expression: "wo fahren sie hin", translation: "where are you going" },
      { category: "expression", expression: "an sich", translation: "en soi" },
      { category: "expression", expression: "warum auch immer", translation: "for whatever reason" },
      { category: "expression", expression: "es lag dran", translation: "c'est parceque" },
      { category: "expression", expression: "mir ist aufgefallen", translation: "i noticed" },
      { category: "expression", expression: "mir fällt nichts ein", translation: "I can't think of anything" },
      { category: "expression", expression: "es fällt mir leicht", translation: "It is easy for me" },
      { category: "expression", expression: "in anbetracht", translation: "in view of / considering" },
      { category: "expression", expression: "ich gebe dir recht", translation: "je te donne raison" },
      { category: "expression", expression: "schweigen ist zustimmung", translation: "qui ne dit mot consent" },
      { category: "expression", expression: "2/8", translation: "2 von 8 – 2 durch 8" },
      { category: "expression", expression: "mit jemandem rechnen", translation: "expect someone" },
      { category: "expression", expression: "auf jemanden zählen", translation: "compter sur qqun" },
      { category: "expression", expression: "hiermit", translation: "ci-joint" },
      { category: "expression", expression: "ich halte die anderen für veraltet", translation: "I consider the others are out of date" },
      { category: "expression", expression: "irgendwie sowas", translation: "something like that" },
      { category: "expression", expression: "es ist sowas wie ...", translation: "it is like ..." },
      { category: "expression", expression: "irgendwie sowas lustiges", translation: "somehow something funny" },
      { category: "expression", expression: "würdest du testen wollen?", translation: "would you want to test?" },
      { category: "expression", expression: "wir haben beschlossen", translation: "on a décidé" },
      { category: "expression", expression: "in dem Fall", translation: "dans ce cas" },
      { category: "expression", expression: "ich bin nicht damit vertraut", translation: "I am not familiar with it" },
      { category: "expression", expression: "achten sie bitte", translation: "votre attention svp" },
      { category: "expression", expression: "mit eigenen Augen", translation: "de mes propres yeux" },
      { category: "expression", expression: "bist du unter uns ?", translation: "are you among us ?" },
      { category: "expression", expression: "wenn ich mich nicht irre", translation: "si je ne me trompe pas" },
      { category: "expression", expression: "sie hat mich ausgelacht", translation: "she laughed at me" },
      { category: "expression", expression: "sagt dir das etwas?", translation: "does that ring a bell?" },
      { category: "expression", expression: "wo ich groß geworden bin", translation: "où j'ai grandi" },
      { category: "expression", expression: "habe ich nie gemocht", translation: "I never liked" },
      { category: "expression", expression: "wie hieß es schon?", translation: "comment ça s'appellait déjà?" },
      { category: "expression", expression: "was hältst du davon?", translation: "What do you think about?" },
      { category: "expression", expression: "fleißig am machen", translation: "occupé à faire" },
      { category: "expression", expression: "Ich formuliere nochmals um", translation: "je reformule de nouveau" },
      { category: "expression", expression: "grundsätzliches Problem", translation: "problème fondamental" },
      { category: "expression", expression: "sowas - so ähnlich", translation: "comme ça" },
      { category: "expression", expression: "wer hat worüber Wissen", translation: "who has knowledge of what" },
      { category: "expression", expression: "bis dahin", translation: "until then" },
      { category: "expression", expression: "bis nachher", translation: "see you later" },
      { category: "expression", expression: "die Spannung steigt", translation: "the suspens rises" },
      { category: "expression", expression: "je nachdem", translation: "depending on" },
      { category: "expression", expression: "Ich gehe davon aus", translation: "I assume" },
      { category: "expression", expression: "und so weiter und so fort", translation: "and so on and so forth" },
      { category: "expression", expression: "dazu zu holen", translation: "to bring in" },
      { category: "expression", expression: "ich hätte das nicht machen sollen", translation: "I shouldn't have done this" },
      { category: "expression", expression: "sie hängt in Frankreich fest", translation: "she's stuck in France" },
      { category: "expression", expression: "ich gucke mal nach", translation: "I'll have a look" },
      { category: "expression", expression: "stell dir kurz vor", translation: "imagine toi" },
      { category: "expression", expression: "hört sich gut an", translation: "sounds good" },
      { category: "expression", expression: "im vergleich zu", translation: "compared to" },
      { category: "expression", expression: "im Verlauf (+ datif)", translation: "au cours de" }
    ];
  }

}
