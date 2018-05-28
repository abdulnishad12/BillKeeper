import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonthPipe } from 'src/pipis/month';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './mock-db';

import { ModalModule,PopoverModule,AlertModule,BsDatepickerModule } from 'ngx-bootstrap';


import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { PayComponent } from './pay/pay.component';
import { SettingsComponent } from './settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { PaymentService } from './payment.service';

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
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
