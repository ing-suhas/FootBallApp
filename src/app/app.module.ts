import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryStandingsComponent } from './component/country-standings/country-standings.component';
import { FootballService } from './service/football.service';
import { HttpClientModule } from '@angular/common/http';
import { TeamGamesComponent } from './component/team-games/team-games.component';


@NgModule({
  declarations: [
    AppComponent,
    CountryStandingsComponent,
    TeamGamesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [FootballService],
  bootstrap: [AppComponent]
})
export class AppModule { }
