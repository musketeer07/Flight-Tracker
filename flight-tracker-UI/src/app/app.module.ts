import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AirportsComponent } from './airports/airports.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { FlightsComponent } from './flights/flights.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    DashboardComponent,
    AirportsComponent,
    AirlinesComponent,
    FlightsComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatDialogModule,
    FormsModule,
    AutocompleteLibModule,
    MatCardModule,
    ToastrModule.forRoot( ),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
