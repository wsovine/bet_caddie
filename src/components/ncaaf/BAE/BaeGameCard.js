import {Card, CardActionArea, Grid, Typography} from "@mui/material";
import {utcToZonedTime, zonedTimeToUtc, format} from "date-fns-tz";
import {useState} from "react";
import BaeGameDetailDialogv2 from "./BaeGameDetailDialogv2";
import {Pets} from "@mui/icons-material";


const bgColor = (game) => {
    if (game.away_er > 0 || game.away_upset_watch) {
        return `rgba(37, 123, 97, .5)`;
    }
    else if (game.home_er > 0 || game.home_upset_watch) {
        return `rgba(37, 123, 97, .5)`;
    }
    else {
        return null;
    }
}

const outcomeColor = (game, side) => {
    if (side === 'away') {
        if (game.away_er > 0 || game.away_upset_watch) {
            if (game.awayteamscore > game.hometeamscore) {
                return 'lime';
            } else {
                return 'error';
            }
        } else {
            return null;
        }
    }

    if (side === 'home') {
        if (game.home_er > 0 || game.home_upset_watch) {
            if (game.hometeamscore > game.awayteamscore) {
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

const BaeGameCard = ({game}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card
            style={{backgroundColor: bgColor(game)}}
        >
            <BaeGameDetailDialogv2 game={game}
                open={open}
                handleClose={handleClose}
            />
            <CardActionArea
                onClick={handleOpen}
            >
                <Grid container minHeight={75}>
                    <Grid item xs={6}>
                        <Typography fontSize={10} align='left'>
                            {game.datetime ? format(zonedTimeToUtc(game.datetime, 'UTC'), 'E LLL d h:mm a') : ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='right'>
                            {(game.away_upset_watch || game.home_upset_watch) ? <Pets fontSize='small'/> : ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography noWrap
                            color={(game.away_er > 0 || game.away_upset_watch) ? 'primary' : 'white'}
                        >
                            {game.awayteam}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} >
                        {game.away_odds}
                    </Grid>
                    <Grid item xs={3} >
                        <Typography
                            color={outcomeColor(game, 'away')}
                        >
                            {game.awayteamscore}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography noWrap
                            color={(game.home_er > 0 || game.home_upset_watch) ? 'primary' : 'white'}
                        >
                            {game.hometeam}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {game.home_odds}
                    </Grid>
                    <Grid item xs={3} >
                        <Typography
                            color={outcomeColor(game, 'home')}
                        >
                            {game.hometeamscore}
                        </Typography>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    )
}

export default BaeGameCard;