import sequelize = require('sequelize');
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { efficiency, points } from '../utils';

export default class LeaderboardService {
  private model = MatchModel;

  async createLeaderboard() {
    const leaderboardAttributes = await this.model.findAll({ where: { inProgress: false },
      attributes: [
        [sequelize.literal(points), 'points'],
        [sequelize.fn('COUNT', sequelize.col('home_team')), 'games'],
        [sequelize.literal('SUM(home_team_goals > away_team_goals)'), 'wins'],
        [sequelize.literal('SUM(home_team_goals = away_team_goals)'), 'draws'],
        [sequelize.literal('SUM(home_team_goals < away_team_goals)'), 'losses'],
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goals'],
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
        [sequelize.literal('SUM(home_team_goals - away_team_goals)'), 'balanceGoals'],
        [sequelize.literal(efficiency), 'efficiency']],
      include: [{ model: TeamModel, as: 'teamHome', attributes: ['teamName'] }],
      group: ['home_team'],
      order: [
        [sequelize.literal('points'), 'DESC'], [sequelize.literal('wins'), 'DESC'],
        [sequelize.literal('balanceGoals'), 'DESC'], [sequelize.literal('goals'), 'DESC'],
        [sequelize.literal('goalsOwn'), 'ASC']] });
    return leaderboardAttributes;
  }

  async getLeaderboard() {
    const leaderboard = await this.createLeaderboard();

    const leaderboardSort = leaderboard.map((element) => ({
      name: (element.dataValues.teamHome.teamName),
      totalPoints: (Number(element.dataValues.points)),
      totalGames: (Number(element.dataValues.games)),
      totalVictories: (Number(element.dataValues.wins)),
      totalDraws: (Number(element.dataValues.draws)),
      totalLosses: (Number(element.dataValues.losses)),
      goalsFavor: (Number(element.dataValues.goals)),
      goalsOwn: (Number(element.dataValues.goalsOwn)),
      goalsBalance: (Number(element.dataValues.balanceGoals)),
      efficiency: (Number(element.dataValues.efficiency)),
    }));

    return leaderboardSort;
  }
}
