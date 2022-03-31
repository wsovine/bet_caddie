import {Card, Grid, Typography} from "@mui/material";
import {format, parseISO} from "date-fns";


const bgColor = (game) => {
    if (game.gamebetcalcs.away_ml_bayes_er > 0) {
        return `rgba(74, 246, 195, ${game.gamebetcalcs.away_ml_bayes_er * 2})`;
    }
    else if (game.gamebetcalcs.home_ml_bayes_er > 0) {
        return `rgba(74, 246, 195, ${game.gamebetcalcs.home_ml_bayes_er * 2})`;
    }
    else {
        return null;
    }
}

const outcomeColor = (game, side) => {
    if (side === 'away') {
        if (game.gamebetcalcs.away_ml_bayes_er > 0) {
            if (game.AwayTeamScore > game.HomeTeamScore) {
                return 'lime';
            } else {
                return 'error';
            }
        } else {
            return null;
        }
    }

    if (side === 'home') {
        if (game.gamebetcalcs.home_ml_bayes_er > 0) {
            if (game.HomeTeamScore > game.AwayTeamScore) {
                return 'lime';
            } else {
                return 'error';
            }
        } else {
            return null;
        }
    }

    return null;
}


const GameCard = ({game}) => {
    return (
        <Card style={{backgroundColor: bgColor(game)}}>
            <Grid container>
                <Grid item xs={10}>
                    <Typography fontSize={10} align='left'>
                        {game.DateTime ? format(parseISO(game.DateTime), 'E LLL d h:mm a') : game.Status}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography color={game.gamebetcalcs.away_ml_bayes_er > 0 ? 'primary' : 'white'} >
                        {game.AwayTeam.Key}
                    </Typography>
                </Grid>
                <Grid item xs={4} >
                    {game.AwayTeamMoneyLine}
                </Grid>
                <Grid item xs={4} >
                    <Typography color={outcomeColor(game, 'away')}>
                        {game.AwayTeamScore}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography color={game.gamebetcalcs.home_ml_bayes_er > 0 ? 'primary' : 'white'}>
                        {game.HomeTeam.Key}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    {game.HomeTeamMoneyLine}
                </Grid>
                <Grid item xs={4} >
                    <Typography color={outcomeColor(game, 'home')}>
                        {game.HomeTeamScore}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}

export default GameCard;