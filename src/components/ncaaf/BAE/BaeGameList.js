import axios from "axios";
import {useState, useEffect} from "react";
import GameListWeekSelect from "../GameListWeekSelect";
import {Box, Grid, Typography} from "@mui/material";
import BaeGameCard from "./BaeGameCard";


const BaeGameList = () => {
    const [games, setGames] = useState([]);
    const [week, setWeek] = useState({});
    const [er, setEr] = useState(0);
    const [ar, setAr] = useState(0);

    useEffect(() => {
        fetchCurrentWeek();
    }, []);

    useEffect(() => {
        if (Object.keys(week).length !== 0){
            fetchGames();
        }
    }, [week]);

    useEffect(() => {
        if (Object.keys(week).length !== 0){
            expected_dollar_return();
            actual_dollar_return();
        }
    }, [games]);

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_ENDPOINT,
        headers: {
            'Authorization': process.env.API_TOKEN,
        },
        withCredentials: true
    });

    const fetchCurrentWeek = (params={}) => {
        api.get(
            '/ncaaf/current_or_latest_week/'
        ).then(resp => {
            setWeek(resp.data);
        })
    };

    const fetchGames = () => {
        if (week !== undefined) {
            api.get(
                `/ncaaf/bae/games_list/${week.season}/${week.season_type}/${week.week}/`
            ).then(resp => {
                // console.log(resp.data.games)
                setGames(resp.data.games);
            })
        }
    };

    const profit_per_dollar = (odds) => {
        let mult = 0;
        if (odds < 0) {
            mult = 1 - 100 / odds
        } else {
            mult = 1 + odds / 100
        }
        return mult - 1;
    }

    const expected_dollar_return = () => {
        setEr(0);
        if (games !== undefined) {
            let newEr = 0;
            games.forEach(game => {
                if (game.away_er > 0 && game.away_er != null){
                    newEr += game.away_er;
                } else if (game.home_er > 0 && game.home_er != null) {
                    newEr += game.home_er;
                } else if (game.away_upset_watch === 1) {
                    newEr += game.away_er;
                } else if (game.home_upset_watch === 1) {
                    newEr += game.home_er;
                }
                setEr(newEr);
            });
        }
    };

    const actual_dollar_return = () => {
        setAr(0);
        if (games !== undefined) {
            let newAr = 0;
            games.forEach(game => {
                if (game.away_er > 0 && game.away_er != null){
                    if (game.awayteamscore > game.hometeamscore) {
                        newAr += profit_per_dollar(game.away_odds);
                    }else if (game.awayteamscore < game.hometeamscore) {
                        newAr -=1;
                    }
                } else if (game.home_er > 0 && game.home_er != null) {
                    if (game.hometeamscore > game.awayteamscore) {
                        newAr += profit_per_dollar(game.home_odds);
                    } else if (game.hometeamscore < game.awayteamscore) {
                        newAr -= 1;
                    }
                } else if (game.away_upset_watch === 1) {
                    if (game.awayteamscore > game.hometeamscore) {
                        newAr += profit_per_dollar(game.away_odds);
                    }
                } else if (game.home_upset_watch === 1) {
                    if (game.hometeamscore > game.awayteamscore) {
                        newAr += profit_per_dollar(game.home_odds);
                    }
                }
                setAr(newAr);
            });
        }
    };

    return (
        <Box>
            <Typography variant='h1' color='primary'>NCAA Football</Typography>
            <Typography variant='h4' color='secondary'>Bayesian Aggregated Expectations</Typography>
            {
                Object.keys(week).length !== 0 ? <GameListWeekSelect
                    api={api} season={week.season} week={week.week}
                    seasonType={week.season_type} setWeek={setWeek}
                /> : null
            }
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Typography m={2} color='secondary'>
                        Expected Return per $ : {er.toFixed(2)}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography m={2} color='secondary'>
                        Actual Return per $ : {ar.toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={0.5}>
                {games.map(game => (
                    <Grid item key={game.id} xs={6} md={4}>
                        <BaeGameCard game={game}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default BaeGameList;