import { Injectable } from '@angular/core';
import {
  AngularFirestore, 
  DocumentReference,
  AngularFirestoreCollection, 
  AngularFirestoreDocument 
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
// import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private _wordsCollection!: AngularFirestoreCollection<any>;
  private _wordsDocument!: AngularFirestoreDocument<any>;
  private _words!: Observable<Array<any>>;

  // private _dictionary!: Array<Word>;

  private _verbsCategoryName: string = "Verbes";
  private _nounsCategoryName: string = "Noms";
  private _adjectivesCategoryName: string = "Adjectifs";
  private _expressionsCategoryName: string = "Expressions";

  constructor(
    private afs: AngularFirestore,
    // private afc: AngularFirestoreCollection,
    // private afd: AngularFirestoreDocument
  ) {
    this._wordsCollection = this.afs.collection('words');
    this._words = this._wordsCollection.valueChanges();
  }

  get words(): Observable<Array<any>> {
    return this._words;
  }

  public addWord(word: any): void {
    this.afs.collection('words').add(word)
      .then((word) => {
        console.log(word);
      })
      .catch((error) => {
        console.log(error);
      });
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


}
