import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FootballService } from 'src/app/service/football.service';
import { ActivatedRoute } from '@angular/router';
import { ITeamGames } from 'src/app/constant/interface/ITeamGames';
import { IFixtureResponse, IGameResult } from 'src/app/constant/interface/IFixtures';


@Component({
  selector: 'app-team-games',
  templateUrl: './team-games.component.html',
  styleUrls: ['./team-games.component.css'],
})
export class TeamGamesComponent implements OnInit {
  public teamId: number = 0;
  constructor(
    private router: Router,
    private footballService: FootballService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.teamId = params['teamId'];
    });
    this.getTeamGames();
  }
  tableData: ITeamGames[] = [];

  /**
   * @description Method to navigate on standings page
   */
  onBackClick() {
    this.router.navigate(['/standings']);
  }

  /**
   * @description Method to get Team games by league, season. teamId
   */
  getTeamGames() {
    const leagueId = this.footballService.selectedCountry.leagueId;
    const season = this.footballService.currentSeason;
    const teamId = this.teamId;
    let teamGames = localStorage.getItem(`teamGames$(leagueId)`)
      ? JSON.parse(localStorage.getItem(`teamGames$(leagueId)`) || '')
      : null;
    if (!teamGames) {
      this.footballService
        .getTeamGames(leagueId, season, teamId)
        .subscribe((result: IFixtureResponse) => {
          teamGames = result.response;
          localStorage.setItem(`teamGames${leagueId}`, JSON.stringify(teamGames));
          this.createTabeldata(teamGames);
        });
    } else {
      this.createTabeldata(teamGames);
    }
  }

  /**
   * @description Method to create teams last 10 Games result by sorting on timestamp for tabel data.
   * Added conditinal check for match Finished only to get proper last match data
   * @param teamGames
   */
  createTabeldata(teamGames: IGameResult[]) {
    this.tableData = [];
    teamGames.forEach((value: IGameResult) => {
      if (value.fixture.status.long === 'Match Finished') {
        const tableData: ITeamGames = {
          logoHome: value.teams.home.logo,
          nameHome: value.teams.home.name,
          scoreHome: value.goals.home,
          logoAway: value.teams.away.logo,
          nameAway: value.teams.away.name,
          scoreAway: value.goals.away,
          timestamp: value.fixture.timestamp,
        };
        this.tableData.push(tableData);
      }
    });
    this.tableData = this.tableData
      .sort(function (x: { timestamp: number }, y: { timestamp: number }) {
        return x.timestamp - y.timestamp;
      })
      ?.slice(0, 10);
  }
}
