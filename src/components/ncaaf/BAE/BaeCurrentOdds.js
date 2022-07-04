import axios from "axios";
import {useEffect, useState} from "react";
import {Card, Container, Divider, Grid, Typography} from "@mui/material";


const BaeCurrentOdds = ({game}) => {
    const [odds, setOdds] = useState([]);

    useEffect(() => {
        fetchOdds();
    }, []);

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_ENDPOINT,
        headers: {
            'Authorization': process.env.API_TOKEN,
        },
        withCredentials: true
    });

    const fetchOdds = () => {
        api.get(
            `/ncaaf/bae/odds/${game.gameid}/`
        ).then(resp => {
            // console.log(resp.data.current_odds);
            setOdds(resp.data.current_odds);
        })
    };

    return (
        <Card raised>
            <Grid container xs={12} bgcolor='dimgray'>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Typography color={game.away_color}>
                        {game.awayteam}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography color={game.home_color}>
                        {game.hometeam}
                    </Typography>
                </Grid>
            </Grid>
            {odds.map(o =>(
                <Grid container xs={12} key={o.book} bgcolor='dimgray'>
                    <Grid item xs={4}>
                        <Typography>{o.book}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='overline'>
                            {o.away}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='overline'>
                            {o.home}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>
            ))}
        </Card>

    )
}

export default BaeCurrentOdds;