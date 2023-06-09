import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { TMatches } from '../interfaces/IMatch';

export default class MatchService {
  private model = MatchModel;

  async getAll() {
    const matches = await this.model.findAll({
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
      ],

    });

    return matches;
  }

  async getInProgress(query: boolean) {
    const matchesInProgress = await this.model.findAll({
      where: { inProgress: query },
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
      ],
    });

    return matchesInProgress;
  }

  async createMatch(match: TMatches) {
    const matchCreated = await this.model.create(match);

    return matchCreated;
  }

  async finishMatch(id: number) {
    const matchById = await this.model.findOne({ where: { id } });
    const finishedMatch = await matchById?.update({ inProgress: false });

    return finishedMatch;
  }

  async editMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const matchById = await this.model.findOne({ where: { id } });
    const editedMatch = await matchById?.update({ homeTeamGoals, awayTeamGoals });

    return editedMatch;
  }
}
