import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


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



const GameDetailDialog = ({game, open, handleClose}) => {
    return (
        <Dialog open={open} onClose={handleClose} onBackdropClick={handleClose}>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                }}
            >
                <CloseIcon color='error' />
            </IconButton>
            <DialogTitle>{game.AwayTeamName} @ {game.HomeTeamName}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems='center' justifyItems='center'>
                                <Grid item xs={4}>
                                    <Typography
                                        variant='subtitle1'
                                        color={game.gamebetcalcs.away_ml_er > 0 ? 'primary' : 'secondary'}
                                        align='left'>{game.AwayTeam.Key}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography color='secondary' variant='h5' align='center'>Vegas</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography
                                        variant='subtitle1'
                                        color={game.gamebetcalcs.home_ml_er > 0 ? 'primary' : 'secondary'}
                                        align='right'>{game.HomeTeam.Key}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography align='left'>{game.AwayTeamMoneyLine}</Typography>
                                </Grid>
                                <Grid item xs={4}><Typography align='center'>Moneyline</Typography></Grid>
                                <Grid item xs={4} alignContent='right'>
                                    <Typography align='right'>{game.HomeTeamMoneyLine}</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography align='left'>
                                        {Math.round(game.gamebetcalcs.away_ml_prob_less_vig * 100)}%
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}><Typography align='center'>Probability</Typography></Grid>
                                <Grid item xs={4} alignContent='right'>
                                    <Typography align='right'>
                                        {Math.round(game.gamebetcalcs.home_ml_prob_less_vig * 100)}%
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems='center' justifyItems='center'>
                                <Grid item xs={4}>
                                    <Typography
                                        variant='subtitle1'
                                        color={game.gamebetcalcs.away_ml_er > 0 ? 'primary' : 'secondary'}
                                        align='left'>
                                        {game.AwayTeam.Key}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography color='secondary' variant='h5' align='center'>Calculated</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography
                                        variant='subtitle1'
                                        color={game.gamebetcalcs.home_ml_er > 0 ? 'primary' : 'secondary'}
                                        align='right'>
                                        {game.HomeTeam.Key}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography align='left'>
                                        {minimum_odds(game.gamebetcalcs.away_ml_bayes_prob, 0)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}><Typography align='center'>Minimum ML</Typography></Grid>
                                <Grid item xs={4} alignContent='right'>
                                    <Typography align='right'>
                                        {minimum_odds(game.gamebetcalcs.home_ml_bayes_prob, 0)}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography align='left'>
                                        {Math.round(game.gamebetcalcs.away_ml_bayes_prob * 100)}%
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}><Typography align='center'>Probability</Typography></Grid>
                                <Grid item xs={4} alignContent='right'>
                                    <Typography align='right'>
                                        {Math.round(game.gamebetcalcs.home_ml_bayes_prob * 100)}%
                                    </Typography>
                                </Grid>


                                <Grid item xs={4}>
                                    <Typography>
                                        {Math.round(game.gamebetcalcs.away_ml_er * 100)}%
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align='center'>
                                        Expected Return
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align='right'>
                                        {Math.round(game.gamebetcalcs.home_ml_er * 100)}%
                                    </Typography>
                                </Grid>

                            </Grid>

                        </Grid>

                    </Grid>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
};

export default GameDetailDialog;