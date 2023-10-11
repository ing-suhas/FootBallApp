export interface Parameter {
    league: string;
    season: string;
    team: string;
  }
  export interface Paging {
    current: number;
    total: number;
  }
  export interface Periods {
    first?: number;
    second?: number;
  }
  export interface Venue {
    id: number;
    name: string;
    city: string;
  }
  export interface Status {
    long: string;
    short: string;
    elapsed?: number;
  }
  export interface Fixture {
    id: number;
    referee?: string;
    timezone: string;
    date: string;
    timestamp: number;
    periods: Periods;
    venue: Venue;
    status: Status;
  }
  export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  }
  export interface Home {
    id: number;
    name: string;
    logo: string;
    winner?: boolean;
  }
  export interface Teams {
    home: Home;
    away: Home;
  }
  export interface Goals {
    home?: number;
    away?: number;
  }
  export interface Extratime {
    home?: any;
    away?: any;
  }
  export interface Score {
    halftime: Goals;
    fulltime: Goals;
    extratime: Extratime;
    penalty: Extratime;
  }
  export interface IGameResult {
    fixture: Fixture;
    league: League;
    teams: Teams;
    goals: Goals;
    score: Score;
  }
  export interface IFixtureResponse {
    get: string;
    parameters: Parameter;
    errors: any[];
    results: number;
    paging: Paging;
    response: IGameResult[];
  }