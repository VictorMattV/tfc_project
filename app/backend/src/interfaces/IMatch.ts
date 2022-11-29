import ITeam from './ITeam';

export default interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: ITeam;
  teamAway: ITeam;
}

export type TMatches = {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
};
