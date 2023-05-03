import sequelize = require('sequelize');
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { efficiencyAway, pointsAway } from '../utils';

export default class LeaderboardAwayService {
  private model = MatchModel;

  async createLeaderboardAway() {
    const leaderboardAttributes = await this.model.findAll({ where: { inProgress: false },
      attributes: [
        [sequelize.literal(pointsAway), 'points'],
        [sequelize.fn('COUNT', sequelize.col('away_team')), 'games'],
        [sequelize.literal('SUM(away_team_goals > home_team_goals)'), 'wins'],
        [sequelize.literal('SUM(away_team_goals = home_team_goals)'), 'draws'],
        [sequelize.literal('SUM(away_team_goals < home_team_goals)'), 'losses'],
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goals'],
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsOwn'],
        [sequelize.literal('SUM(away_team_goals - home_team_goals)'), 'balanceGoals'],
        [sequelize.literal(efficiencyAway), 'efficiency']],
      include: [{ model: TeamModel, as: 'teamAway', attributes: ['teamName'] }],
      group: ['away_team'],
      order: [
        [sequelize.literal('points'), 'DESC'], [sequelize.literal('wins'), 'DESC'],
        [sequelize.literal('balanceGoals'), 'DESC'], [sequelize.literal('goals'), 'DESC'],
        [sequelize.literal('goalsOwn'), 'ASC']] });

    return leaderboardAttributes;
  }

  async getLeaderboardAway() {
    const leaderboard = await this.createLeaderboardAway();

    const leaderboardSort = leaderboard.map((element) => ({
      name: (element.dataValues.teamAway.teamName),
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
