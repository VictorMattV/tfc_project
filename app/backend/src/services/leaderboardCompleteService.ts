import { ILeaderboard } from '../interfaces/ILeaderboard';
import LeaderboardAwayService from './leaderboardAwayService';
import LeaderboardHomeService from './leaderboardHomeService';

export default class LeaderboardCompleteService {
  constructor(
    private leaderboardHome = new LeaderboardHomeService(),
    private leaderboardAway = new LeaderboardAwayService(),
  ) {}

  async concatLeaderBoards() {
    const leaderboardHome = await this.leaderboardHome.getLeaderboardHome();
    const leaderboardAway = await this.leaderboardAway.getLeaderboardAway();

    const leaderboards = await Promise.all([leaderboardHome, leaderboardAway]);
    const flatLeaderboards = leaderboards.flat();

    return flatLeaderboards;
  }

  async getLeaderboard() {
    const leaderboard = await this.concatLeaderBoards();

    const newLeaderboard = leaderboard.reduce((acc, curr) => {
      const items = acc.find((i) => i.name === curr.name);
      if (items) {
        items.totalPoints += curr.totalPoints;
        items.totalGames += curr.totalGames;
        items.totalVictories += curr.totalVictories;
        items.totalDraws += curr.totalDraws;
        items.totalLosses += curr.totalLosses;
        items.goalsFavor += curr.goalsFavor;
        items.goalsOwn += curr.goalsOwn;
        items.goalsBalance += curr.goalsBalance;
        items.efficiency = Number((((items.totalPoints)
        / (((items.totalGames) * 3))) * 100).toFixed(2));
      } else acc.push(curr);

      return acc;
    }, [] as ILeaderboard[]);

    return newLeaderboard;
  }

  async sortLeaderboard() {
    const leaderboard = this.getLeaderboard();

    const sortedLeaderboard = (await leaderboard)
      .sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.totalGames + a.totalGames);

    return sortedLeaderboard;
  }
}
