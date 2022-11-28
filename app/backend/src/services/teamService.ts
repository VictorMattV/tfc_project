import TeamModel from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';

export default class TeamService {
  private model = TeamModel;

  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: number): Promise<ITeam> {
    const team = await this.model.findOne({ where: { id } });
    return team as ITeam;
  }
}
