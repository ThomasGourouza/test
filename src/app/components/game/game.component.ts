import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Word } from 'src/app/models/word';
import { CommonService, Item } from 'src/app/service/common.service';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { GameService } from 'src/app/service/game.service';
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

  public randomItem!: Word;
  public gameForm!: FormGroup;
  public randomTranslations!: Array<string>;
  public answer!: Answer | undefined;
  public isCorrect!: boolean;

  private words!: Array<Word>;
  public settingsForm!: FormGroup;
  public start!: boolean;
  public points: number;
  public total: number;
  public revision: boolean;
  // public category!: string;
  // public numberOfWords!: number;
  public categories!: Array<Item>;
  public numbersOfWords!: Array<number>;

  constructor(
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private gameService: GameService
  ) {
    this.randomTranslations = [];
    this.revision = false;
    this.points = 0;
    this.total = 0;
  }

  public ngOnInit(): void {
    this.categories = this.commonService.categories;
    this.numbersOfWords = this.commonService.numbersOfWords;
    this.initSettingsForm();
    this.initGameForm();
    this.dictionaryService.words.subscribe((words) => {
      this.words = words;
    });
    this.gameService.setStart$(false);
    this.gameService.start$.subscribe((start) => {
      this.start = start;
    });
  }

  private initSettingsForm(): void {
    const initCategoriesSetting = this.categories.map((category) => category.value)
    this.settingsForm = new FormGroup({
      categories: new FormControl(initCategoriesSetting, Validators.required),
      numberOfWords: new FormControl(20, Validators.required),
      revision: new FormControl(true)
    });
  }

  public onSettingsSubmit(): void {
    const categoriesControl = this.settingsForm.get('categories');
    const numberOfWordsControl = this.settingsForm.get('numberOfWords');
    const revisionControl = this.settingsForm.get('revision');

    categoriesControl?.disable();
    numberOfWordsControl?.disable();
    revisionControl?.disable();

    const categories: Array<string> = categoriesControl?.value;
    const numberOfWords: number = +numberOfWordsControl?.value;

    console.log(categories);
    console.log(numberOfWords);

    this.gameService.setStart$(true);
    this.revision = revisionControl?.value;

    this.answer = undefined;
    this.initGame(categories, numberOfWords);
  }

  private initGameForm(): void {
    this.gameForm = new FormGroup({
      german: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required)
    });
  }

  public onGameSubmit(): void {
    this.isCorrect = false;
    const formValue = this.gameForm.value;
    this.answer = {
      german: formValue.german,
      translation: this.randomItem.translation
    }
    const translation = formValue.translation;
    if (this.randomItem.translation === translation) {
      this.points++;
      this.isCorrect = true;
    }
    this.total++;
    // this.initGame(this.category);
  }

  public onStop(): void {
    this.gameService.setStart$(false);

    const categoriesControl = this.settingsForm.get('categories');
    const numberOfWordsControl = this.settingsForm.get('numberOfWords');
    const revisionControl = this.settingsForm.get('revision');

    categoriesControl?.enable();
    numberOfWordsControl?.enable();
    revisionControl?.enable();
  }

  private initGame(categories: Array<string>, numberOfWords: number): void {
    const dictionnaryCategory = this.words.filter((word) => categories.includes(word.category));
    if (!!dictionnaryCategory) {

      const randomCategoryIndex = this.getRandomInt(dictionnaryCategory.length);
      this.randomItem = dictionnaryCategory[randomCategoryIndex];

      this.setRandomTranslations(this.randomItem.translation, 'category');
      this.gameForm.controls['german'].setValue(this.randomItem.german);
    }
  }

  private setRandomTranslations(translation: string, category: string | number): void {
    const dictionaryCategory = this.words.filter((word) => word.category === category);
    if (!!dictionaryCategory) {
      const randomTranslations: Array<string> = [];
      const otherTranslations = dictionaryCategory.filter((t) => t.translation != translation);

      let index = 0;
      const limit = (dictionaryCategory.length < 10) ? dictionaryCategory.length : 10;
      const rightAnswerIndex = this.getRandomInt(limit);

      while (index < limit) {
        if (index === rightAnswerIndex) {
          randomTranslations.push(translation);
        } else {
          let randomTranslation: string;
          do {
            const randomIndex = this.getRandomInt(otherTranslations.length);
            randomTranslation = otherTranslations[randomIndex].translation;
          } while (randomTranslations.includes(randomTranslation));
          randomTranslations.push(randomTranslation);
        }
        index++;
      }
      this.randomTranslations = randomTranslations;
    }
  }

  public getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
