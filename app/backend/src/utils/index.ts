const points = `SUM(home_team_goals > away_team_goals) * 3 +
 SUM(home_team_goals = away_team_goals)`;

const efficiency = `CONVERT((SUM(home_team_goals > away_team_goals) * 3 + 
SUM(home_team_goals = away_team_goals)) / (COUNT(home_team) * 3) * 100, DECIMAL(15,2))`;

export { points, efficiency };
