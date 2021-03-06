import axios from "axios";
import {useState, useEffect} from "react";
import CeloGameCard from "./CeloGameCard";
import GameListWeekSelect from "./GameListWeekSelect";
import {Box, Grid, Typography} from "@mui/material";


const CeloGameList = () => {
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
                `/ncaaf/celo/games_list/${week.season}/${week.season_type}/${week.week}/`
            ).then(resp => {
                setGames(resp.data.games.filter(g => g.celobetcalcs));
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
                if (game.celobetcalcs.away_ml_er > 0 && game.celobetcalcs.away_ml_er != null){
                    newEr += game.celobetcalcs.away_ml_er;
                } else if (game.celobetcalcs.home_ml_er > 0 && game.celobetcalcs.home_ml_er != null) {
                    newEr += game.celobetcalcs.home_ml_er;
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
                if (game.celobetcalcs.away_ml_er > 0 && game.celobetcalcs.away_ml_er != null){
                    if (game.AwayTeamScore > game.HomeTeamScore) {
                        newAr += profit_per_dollar(game.AwayTeamMoneyLine);
                    }else if (game.AwayTeamScore < game.HomeTeamScore) {
                        newAr -=1;
                    }
                } else if (game.celobetcalcs.home_ml_er > 0 && game.celobetcalcs.home_ml_er != null) {
                    if (game.HomeTeamScore > game.AwayTeamScore) {
                        newAr += profit_per_dollar(game.HomeTeamMoneyLine);
                    } else if (game.HomeTeamScore < game.AwayTeamScore) {
                        newAr -= 1;
                    }
                }
                setAr(newAr);
            });
        }
    };

    return (
        <Box>
            <Typography variant='h1' color='primary'>NCAA Football</Typography>
            <Typography variant='h4' color='secondary'>Calculated ELO</Typography>
            {
                Object.keys(week).length !== 0 ? <GameListWeekSelect
                    api={api} season={week.season} week={week.week}
                    seasonType={week.season_type} setWeek={setWeek}
                /> : null
            }
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Typography m={1} color='secondary'>
                        Expected Return per $ : {er.toFixed(2)}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography m={1} color='secondary'>
                        Actual Return per $ : {ar.toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={0.5}>
                {games.map(game => (
                    <Grid item key={game.GameID} xs={6} sm={4} md={3}>
                        <CeloGameCard game={game}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CeloGameList;