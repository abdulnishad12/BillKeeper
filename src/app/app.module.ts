import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { MonthPipe } from 'src/pipis/month';


import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { PayComponent } from './pay/pay.component';
import { SettingsComponent } from './settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import {DataService} from './data.service'
import {PaymentService} from './payment.service'

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    PayComponent,
    SettingsComponent,
    MonthPipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DlDateTimePickerDateModule,
  ],
  providers: [DataService,PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
