import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TimerComponent } from '../shared/timer/timer.component';
import { CountdownModule } from 'ngx-countdown';
import { AddRecordComponent } from '../shared/add-record/add-record.component';
import { AccidentDataComponent } from '../shared/accident-data/accident-data.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CountdownModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [
    Tab1Page,
    TimerComponent,
    AddRecordComponent,
    AccidentDataComponent
  ]
})
export class Tab1PageModule { }
