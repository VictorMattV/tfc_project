import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  private model = TeamModel;

  getAll = async () => {
    const teams = await this.model.findAll();
    return teams;
  };
}
