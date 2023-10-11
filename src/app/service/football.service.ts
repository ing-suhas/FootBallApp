import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFixtureResponse } from '../constant/interface/IFixtures';
import { ICountry } from '../constant/interface/ICountry';
import { IStandingsResponse } from '../constant/interface/IStandings';


@Injectable({
  providedIn: 'root',
})
export class FootballService {
  api_key: string = '54a940e8a4f6db469cb8f5f9701fc661';
  api_base_Url: string = 'https://v3.football.api-sports.io';
  header:HttpHeaders = new HttpHeaders().append('x-rapidapi-key', this.api_key);
  public currentSeason: number = 0;
  public selectedCountry: any = {};
  constructor(private httpClinet: HttpClient) { }

  /**
   * @description Method to get Standings data by league Id and current season
   * @param leagueId - leadgue Id
   * @param season - current season
   * @returns response type of IStandingsResponse
   */
  getStandings(leagueId: number, season: number): Observable<IStandingsResponse> {
    const api_Url = `${this.api_base_Url}/standings?league=${leagueId}&season=${season}`;
    return this.httpClinet.get<IStandingsResponse>(api_Url, { headers: this.header });
  }

  /**
   * @description Method to get Team games data by league Id and current season and teamId
   * @param leagueId - leadgue Id
   * @param season - current season
   * @param teamId - Team Id
   * @returns response type of IFixtureResponse
   */
  getTeamGames(
    leagueId: number,
    season: number,
    teamId: number
  ): Observable<IFixtureResponse> {
    const api_Url = `${this.api_base_Url}/fixtures?league=${leagueId}&season=${season}&team=${teamId}`;
    return this.httpClinet.get<IFixtureResponse>(api_Url, { headers: this.header });
  }

  /**
   * @description Method to get Countries data
   *  @returns respons type of ICountry
   */
  getCountries(): Observable<ICountry> {
    const api_Url = '${this.api_base_Url}/countries';
    return this.httpClinet.get<ICountry>(api_Url, { headers: this.header });
  }
}
