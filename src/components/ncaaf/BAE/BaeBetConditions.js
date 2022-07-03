import {Card, Grid, Typography} from "@mui/material";

const minimum_odds = (probability, desired_return) => {
    let required_prob = (probability - desired_return);
    let odds = 0;
    if (required_prob > .5) {
        odds = (required_prob / (1 - (required_prob))) * - 100
    } else {
        odds = (100 / (required_prob)) - 100
    }
    return Math.round(odds);
}


const BaeBetConditions = ({game, side}) => {

    return (
        <Card raised>
            <Grid container bgcolor='dimgray'>
                <Grid item xs={12}>
                    <Typography variant='h5' color={game[`${side}_color`]}>
                        {game[`${side}team`]}
                    </Typography>
                    <Typography align='left'>
                        Good: {minimum_odds(game[`${side}_hdi_lower`], 0)}
                    </Typography>
                    <Typography align='left'>
                        Fair: {minimum_odds(game[`${side}_prediction`], 0)}
                    </Typography>
                    <Typography align='left'>
                        High: {minimum_odds(game[`${side}_hdi_upper`], 0)}
                    </Typography>

                </Grid>
            </Grid>
        </Card>
    )
}

export default BaeBetConditions