import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { AirportsComponent } from './airports/airports.component';
import { FlightsComponent } from './flights/flights.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'airlines', component: AirlinesComponent },
  { path: 'airports', component: AirportsComponent },
  { path: 'flights', component: FlightsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
