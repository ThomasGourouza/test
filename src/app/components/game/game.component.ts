import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Word } from 'src/app/models/word';
import { CommonService, Item } from 'src/app/service/common.service';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { GameService } from 'src/app/service/game.service';
export interface Summary {
  word: Word;
  success: boolean;
}
export interface Answer {
  german: string;
  translation: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  // TODO: choose between local or firebase (in settings tab)

  public gameForm!: FormGroup;
  public isCorrect: boolean;
  public submited: boolean;
  public randomWord!: Word;
  public randomWordsMemory!: Array<Word>;
  private words!: Array<Word>;
  public dictionaryCategoryLimited: Array<Word>;
  public wordsForGame!: Array<Word>;
  public start!: boolean;
  public points: number;
  public total: number;
  public revisionSelected: boolean;
  public categories!: Array<Item>;
  public numbersOfWords!: Array<number>;
  public numbersOfOptions!: Array<number>;
  public numbersOfRounds!: Array<number>;
  public summary: Array<Summary>;
  // setting form
  public settingsForm!: FormGroup;
  private categoriesSelected!: Array<string>;
  private numberOfWords!: number;
  public numberOfOptions!: number;
  public numberOfRounds!: number;
  public revision!: boolean;

  constructor(
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private gameService: GameService
  ) {
    this.randomWordsMemory = [];
    this.revisionSelected = false;
    this.isCorrect = false;
    this.submited = false;
    this.points = 0;
    this.total = 0;
    this.dictionaryCategoryLimited = [];
    this.summary = [];
  }

  public ngOnInit(): void {
    this.categories = this.commonService.categories;
    this.numbersOfWords = this.commonService.numbersOfWords;
    this.numbersOfOptions = this.commonService.numbersOfOptions;
    this.numbersOfRounds = this.commonService.numbersOfRounds;
    this.initSettingsForm();
    this.initGameForm();
    this.dictionaryService.words.subscribe((words) => {
      this.words = words;
    });
    this.gameService.setStart$(false);
    this.gameService.start$.subscribe((start) => {
      this.start = start;
    });
    this.settingsForm.valueChanges.subscribe((values) => {
      this.gameService.categoriesSelected = values.categories;
      this.gameService.numberOfWords = values.numberOfWords;
      this.gameService.numberOfOptions = values.numberOfOptions;
      this.gameService.numberOfRounds = values.numberOfRounds;
      this.gameService.revision = values.revision;
    });
  }

  private initGameForm(): void {
    this.gameForm = new FormGroup({
      german: new FormControl('', Validators.required),
      translation: new FormControl('')
    });
  }

  private initSettingsForm(): void {
    this.categoriesSelected = this.gameService.categoriesSelected;
    this.numberOfWords = this.gameService.numberOfWords;
    this.numberOfOptions = this.gameService.numberOfOptions;
    this.numberOfRounds = this.gameService.numberOfRounds;
    this.revision = this.gameService.revision;
    this.settingsForm = new FormGroup({
      categories: new FormControl(this.categoriesSelected, Validators.required),
      numberOfWords: new FormControl(this.numberOfWords, Validators.required),
      numberOfOptions: new FormControl(this.numberOfOptions, Validators.required),
      numberOfRounds: new FormControl(this.numberOfRounds, Validators.required),
      revision: new FormControl(this.revision)
    });
  }

  public isCheckValid(): boolean {
    return !!this.gameForm.value.translation;
  }

  public onSettingsSubmit(): void {
    const categoriesControl = this.settingsForm.get('categories');
    const numberOfWordsControl = this.settingsForm.get('numberOfWords');
    const numberOfOptionsControl = this.settingsForm.get('numberOfOptions');
    const numberOfRoundsControl = this.settingsForm.get('numberOfRounds');
    const revisionControl = this.settingsForm.get('revision');
    this.categoriesSelected = categoriesControl?.value;
    this.numberOfWords = +numberOfWordsControl?.value;
    this.numberOfOptions = +numberOfOptionsControl?.value;
    this.numberOfRounds = +numberOfRoundsControl?.value;

    this.wordsForGame = this.words.filter((word) =>
      this.categoriesSelected.includes(word.category)
    );
    if (
      this.categoriesSelected.length > 0
      && this.numberOfWords > 0
      && !!this.wordsForGame
      && this.wordsForGame.length >= this.numberOfWords
    ) {
      categoriesControl?.disable();
      numberOfWordsControl?.disable();
      numberOfOptionsControl?.disable();
      numberOfRoundsControl?.disable();
      revisionControl?.disable();
      this.gameService.setStart$(true);
      this.revisionSelected = revisionControl?.value;
      this.revision = this.revisionSelected;
      this.runGame();
    } else {
      this.dictionaryCategoryLimited = [];
      this.gameService.limitError();
    }
  }

  public onGameSubmit(): void {
    this.submited = true;
    this.isCorrect = false;
    const translation = this.gameForm.value.translation;
    if (this.randomWord.translation === translation) {
      this.points++;
      this.isCorrect = true;
    }
    this.summary.push({
      word: this.randomWord,
      success: this.isCorrect
    });
    this.total++;
    this.gameService.manageWordInDB(this.randomWord, this.isCorrect);
  }

  public onContinue(): void {
    if (this.total < this.numberOfRounds) {
      this.submited = false;
      this.revision = this.revisionSelected;
      this.gameForm.controls['translation'].setValue('');
      this.runGame();
    }
  }

  public onRestart(): void {
    this.initResult();
    this.onContinue();
  }

  public onReady(): void {
    this.revision = false;
  }

  public onStop(): void {
    this.initResult();
    this.gameService.setStart$(false);
    this.settingsForm.get('categories')?.enable();
    this.settingsForm.get('numberOfWords')?.enable();
    this.settingsForm.get('numberOfOptions')?.enable();
    this.settingsForm.get('numberOfRounds')?.enable();
    this.settingsForm.get('revision')?.enable();
  }

  private initResult(): void {
    this.initGameForm();
    this.points = 0;
    this.total = 0;
    this.randomWordsMemory = [];
    this.dictionaryCategoryLimited = [];
    this.summary = [];
  }

  // Technical:

  private buildDictionaryCategoryLimited(dictionaryCategory: Array<Word>, limit: number): void {
    this.dictionaryCategoryLimited = [];
    while (this.dictionaryCategoryLimited.length < limit) {
      const randomIndex = this.gameService.getRandomInt(dictionaryCategory.length);
      const randomWord = dictionaryCategory[randomIndex];
      if (
        this.dictionaryCategoryLimited.length === limit - 1
        && this.randomWordsMemory.length >= limit
        && this.gameService.isArrayIncluded(this.dictionaryCategoryLimited, this.randomWordsMemory)
      ) {
        const newWord = dictionaryCategory.find((word) =>
          !this.gameService.isWordIncluded(word, this.randomWordsMemory)
        );
        if (!!newWord) {
          this.dictionaryCategoryLimited.push(newWord);
        } else {
          this.onStop();
          break;
        }
      } else if (!this.gameService.isWordIncluded(randomWord, this.dictionaryCategoryLimited)) {
        this.dictionaryCategoryLimited.push(randomWord);
      }
    }
  }

  private runGame(): void {
    this.buildDictionaryCategoryLimited(this.wordsForGame, this.numberOfWords);
    do {
      const index = this.gameService.getRandomInt(this.dictionaryCategoryLimited.length);
      this.randomWord = this.dictionaryCategoryLimited[index];
    } while (this.gameService.isWordIncluded(this.randomWord, this.randomWordsMemory));
    this.randomWordsMemory.push(this.randomWord);
    // TODO: german -> french or french -> german
    this.gameForm.controls['german'].setValue(this.randomWord.german);
  }

}
