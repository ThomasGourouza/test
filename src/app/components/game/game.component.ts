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

  private words!: Array<Word>;
  public randomItem!: Word;
  public gameForm!: FormGroup;
  
  public settingsForm!: FormGroup;
  public start!: boolean;
  public category!: string;
  public numberOfWords!: number;
  public categories!: Array<Item>;
  public numbersOfWords!: Array<number>;

  public randomTranslations!: Array<string>;
  public answer!: Answer | undefined;
  public isCorrect!: boolean;
  public memory: Array<string>;

  constructor(
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private gameService: GameService
  ) {
    this.randomTranslations = [];
    this.memory = [];
  }

  public ngOnInit(): void {
    this.initSettingsForm();
    this.initGameForm();
    this.categories = this.commonService.categories;
    this.numbersOfWords = this.commonService.numbersOfWords;
    this.dictionaryService.words.subscribe((words) => {
      this.words = words;
    });
    this.gameService.setStart$(false);
    this.gameService.start$.subscribe((start) => {
      this.start = start;
    });
  }

  private initSettingsForm(): void {
    this.settingsForm = new FormGroup({
      category: new FormControl('', Validators.required),
      numberOfWords: new FormControl('', Validators.required)
    });
  }

  public onSettingsSubmit(): void {
    const formValue = this.settingsForm.value;
    this.category = formValue.category;
    this.numberOfWords = +formValue.numberOfWords;
    
    this.gameService.setStart$(true);
    this.memory = [];
    this.gameService.points = 0;
    this.gameService.total = 0;
    this.answer = undefined;
    this.initGame(this.category);
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
    if (this.randomItem.translation === translation && !!this.category) {
      this.gameService.points++;
      this.isCorrect = true;
    }
    this.gameService.total++;
    this.initGame(this.category);
  }

  public onStop(): void {
    this.gameService.setStart$(false);
  }

  private initGame(category: string | number): void {
    const dictionnaryCategory = this.words.filter((word) => word.category === category);
    if (!!dictionnaryCategory) {
      if (this.memory.length === dictionnaryCategory.length) {
        this.memory = [];
      }
      do {
        const randomCategoryIndex = this.getRandomInt(dictionnaryCategory.length);
        this.randomItem = dictionnaryCategory[randomCategoryIndex];
      } while (this.memory.includes(this.randomItem.german));
      this.memory.push(this.randomItem.german);
      this.setRandomTranslations(this.randomItem.translation, category);
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
