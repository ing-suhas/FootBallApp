interface IParameter {
    league: string;
    season: string;
}
export interface Paging {
    current: number;
    total: number;
}
export interface Team {
    id: number;
    name: string;
    logo: string;
}
export interface Goals {
    for: number;
    against: number;
}
export interface All {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: Goals;
}
export interface Standing {
    rank: number;
    team: Team;
    points: number;
    goalsDiff: number;
    group: string;
    form: string;
    status: string;
    description?: string;
    all: All;
    home: All;
    away: All;
    update: string;
}
export interface ILeague {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: Standing[][];
}
export interface ILeagueResponse {
    league: ILeague;
}
export interface IStandingsResponse {
    get: string;
    parameters: IParameter;
    errors: any[];
    results: number;
    paging: Paging;
    response: ILeagueResponse[];
}