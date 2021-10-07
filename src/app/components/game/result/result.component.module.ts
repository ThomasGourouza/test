import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonService } from 'src/app/service/common.service';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SettingsService } from 'src/app/service/settings.service';

@NgModule({
    declarations: [
        ResultComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        RatingModule,
        CheckboxModule,
        ButtonModule,
        ProgressBarModule,
    ],
    providers: [
        SettingsService,
        CommonService
    ],
    exports: [
        ResultComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ResultModule { }
