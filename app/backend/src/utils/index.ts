const pointsHome = `SUM(home_team_goals > away_team_goals) * 3 +
 SUM(home_team_goals = away_team_goals)`;

const efficiencyHome = `CONVERT((SUM(home_team_goals > away_team_goals) * 3 + 
SUM(home_team_goals = away_team_goals)) / (COUNT(home_team) * 3) * 100, DECIMAL(15,2))`;

const pointsAway = `SUM(away_team_goals > home_team_goals) * 3 +
 SUM(away_team_goals = home_team_goals)`;

const efficiencyAway = `CONVERT((SUM(away_team_goals > home_team_goals) * 3 + 
SUM(away_team_goals = home_team_goals)) / (COUNT(away_team) * 3) * 100, DECIMAL(15,2))`;

export { pointsHome, efficiencyHome, pointsAway, efficiencyAway };
