import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FootballService } from '../../service/football.service';
import { IStandingsTbl } from 'src/app/constant/interface/IStantingsTbl';
import { ILeague, ILeagueResponse, IStandingsResponse, Standing } from 'src/app/constant/interface/IStandings';

@Component({
  selector: 'app-country-standings',
  templateUrl: './country-standings.component.html',
  styleUrls: ['./country-standings.component.css'],
})
export class CountryStandingsComponent implements OnInit {
  countries = [
    { name: 'England', league: 'Premier League', leagueId: 39 },
    { name: 'Spian', league: 'La Liga', leagueId: 140 },
    { name: 'France', league: ' Ligue 1', leagueId: 61 },
    { name: 'Germany', league: 'Bundesliga', leagueId: 78 },
    { name: 'Italy', league: 'Serie A', leagueId: 135 },
  ];

  tableCols: string[] = [
    '',
    '',
    'Names',
    'Games',
    'W',
    'L',
    'D',
    'Goal Difference',
    'Points',
  ];
  tableData: IStandingsTbl[] = [];

  constructor(
    public footballService: FootballService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.footballService.currentSeason = new Date().getFullYear();
    if (this.footballService.selectedCountry?.leagueId) {
      this.getStandings();
    } else {
      this.footballService.selectedCountry = this.countries[0];
      this.getStandings();
    }
  }

  /**
   * @description Method to handle country click event
   * @param country
   */
  onCountryClick(country: object) {
    this.footballService.selectedCountry = country;
    this.getStandings();
  }

  /**
   * @description Method to getStanding data if key not exist in localStorage by leagueId
   *
   */
  getStandings() {
    const leagueId = this.footballService.selectedCountry.leagueId;
    const season = this.footballService.currentSeason;
    let standingsData = localStorage.getItem(`standings${leagueId}`)
      ? JSON.parse(localStorage.getItem(`standings${leagueId}`) || '')
      : null;
    if (!standingsData) {
      this.footballService
        .getStandings(leagueId, season)
        .subscribe((result: IStandingsResponse) => {
          standingsData = result.response;
          localStorage.setItem(`standings${leagueId}`,JSON.stringify(standingsData));
          this.createTabeldata(standingsData[0].league.standings);
        });
    } else {
      this.createTabeldata(standingsData[0]?.league.standings);
    }
  }

  /**
   * @description Method to create data for Table
   * @param standingsData
   */
  createTabeldata(standingsData: Standing[][]) {
    this.tableData = [];
    standingsData.forEach((element: Standing[]) => {
      element.forEach((value: Standing, index: number) => {
        const tableData: IStandingsTbl = {
          seq: index + 1,
          logo: value.team.logo,
          name: value.team.name,
          games: value.all.played,
          win: value.all.win,
          lose: value.all.lose,
          draw: value.all.draw,
          goalDiff: value.goalsDiff,
          points: value.points,
          teamId: value.team.id,
        };
        this.tableData.push(tableData);
      });
    });
  }

  /**
   * @description Method to navigate team games result page
   * @param rowData click table cell data
   */
  goToTeams(rowData: IStandingsTbl) {
    this.router.navigate(['/team-games'], {
      queryParams: { teamId: rowData.teamId },
    });
  }
}
