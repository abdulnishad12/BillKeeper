import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent }      from './history/history.component';
import { PayComponent }      from './pay/pay.component';
import { SettingsComponent }      from './settings/settings.component';


const routes: Routes = [
	{ path: '', redirectTo: '/pay', pathMatch: 'full' },
  { path: 'history', component: HistoryComponent },
  { path: 'pay', component: PayComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})



export class AppRoutingModule { }
