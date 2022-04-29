import {Card, CardActionArea, Grid, Typography} from "@mui/material";
import {format, parseISO} from "date-fns";
import {useState} from "react";
import ArmGameDetailDialog from "./ArmGameDetailDialog";


const bgColor = (game) => {
    if (game.armbetcalcs.away_ml_er > 0) {
        return `rgba(37, 123, 97, ${game.armbetcalcs.away_ml_er })`;
    }
    else if (game.armbetcalcs.home_ml_er > 0) {
        return `rgba(37, 123, 97, ${game.armbetcalcs.home_ml_er })`;
    }
    else {
        return null;
    }
}

const outcomeColor = (game, side) => {
    if (side === 'away') {
        if (game.armbetcalcs.away_ml_er > 0) {
            if (game.away_points > game.home_points) {
                return 'lime';
            } else {
                return 'error';
            }
        } else {
            return null;
        }
    }

    if (side === 'home') {
        if (game.armbetcalcs.home_ml_er > 0) {
            if (game.home_points > game.away_points) {
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


const ArmGameCard = ({game}) => {
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
            <ArmGameDetailDialog
                game={game}
                open={open}
                handleClose={handleClose}
            />
            <CardActionArea
                onClick={handleOpen}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Typography fontSize={10} align='left'>
                            {game.start_time_tbd ? format(parseISO(game.start_date), 'E LLL d') : format(parseISO(game.start_date), 'E LLL d h:mm a')}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography noWrap
                            color={game.armbetcalcs.away_ml_er > 0 ? 'primary' : 'white'}
                        >
                            {game.away_team}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} >
                        {game.armbetcalcs.away_ml}
                    </Grid>
                    <Grid item xs={3} >
                        <Typography
                            color={outcomeColor(game, 'away')}
                        >
                            {game.away_points}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography noWrap
                            color={game.armbetcalcs.home_ml_er > 0 ? 'primary' : 'white'}
                        >
                            {game.home_team}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {game.armbetcalcs.home_ml}
                    </Grid>
                    <Grid item xs={3} >
                        <Typography
                            color={outcomeColor(game, 'home')}
                        >
                            {game.home_points}
                        </Typography>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    )
}

export default ArmGameCard;