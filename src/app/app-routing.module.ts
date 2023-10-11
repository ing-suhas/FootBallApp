import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryStandingsComponent } from './component/country-standings/country-standings.component';
import { TeamGamesComponent } from './component/team-games/team-games.component';

const routes: Routes = [{ path: '', component:CountryStandingsComponent},
{path:'standings', component:CountryStandingsComponent},
{path: 'team-games', component: TeamGamesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
