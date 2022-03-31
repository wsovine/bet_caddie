import {Card, Grid, Typography} from "@mui/material";
import {format, parseISO} from "date-fns";


const bgColor = (game) => {
    if (game.gamebetcalcs.away_ml_bayes_er > 0) {
        return `rgba(76, 187, 23, ${game.gamebetcalcs.away_ml_bayes_er * 2})`;
    }
    else if (game.gamebetcalcs.home_ml_bayes_er > 0) {
        return `rgba(76, 187, 23, ${game.gamebetcalcs.home_ml_bayes_er * 2})`;
    }
    else {
        return null;
    }
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
                    <Typography color={game.gamebetcalcs.away_ml_bayes_er > 0 ? 'goldenrod' : 'white'} >
                        {game.AwayTeam.Key}
                    </Typography>
                </Grid>
                <Grid item xs={4} >
                    {game.AwayTeamMoneyLine}
                </Grid>
                <Grid item xs={4} >
                    {game.AwayTeamScore}
                </Grid>
                <Grid item xs={4}>
                    <Typography color={game.gamebetcalcs.home_ml_bayes_er > 0 ? 'goldenrod' : 'white'}>
                        {game.HomeTeam.Key}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    {game.HomeTeamMoneyLine}
                </Grid>
                <Grid item xs={4} >
                    {game.HomeTeamScore}
                </Grid>
            </Grid>
        </Card>
    )
}

export default GameCard;