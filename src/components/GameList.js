import axios from "axios";
import {useState, useEffect} from "react";
import GameCard from "./GameCard";
import GameListWeekSelect from "./GameListWeekSelect";
import {Box, Grid} from "@mui/material";

const GameList = () => {
    const [games, setGames] = useState([]);
    const [week, setWeek] = useState({});

    useEffect(() => {
        fetchCurrentWeek();
    }, []);

    useEffect(() => {
        if (Object.keys(week).length !== 0){
            fetchGames();
        }
    }, [week]);

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
                `/ncaaf/games_list/${week.season}/${week.season_type}/${week.week}/`
            ).then(resp => {
                setGames(resp.data.games.filter(g => g.gamebetcalcs));
            })
        }
    };

    return (
        <Box>
            <h1>Games</h1>
            {
                Object.keys(week).length !== 0 ? <GameListWeekSelect
                    api={api} season={week.season} week={week.week}
                    seasonType={week.season_type} setWeek={setWeek}
                /> : null
            }
            <h2 style={{textTransform: 'capitalize'}}>{week.season} {week.season_type} - week {week.week}</h2>
            <Box m={4} />
            <Grid container spacing={0.5}>
                {games.map(game => (
                    <Grid item key={game.GameID} xs={6} sm={4} md={3}>
                        <GameCard game={game}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default GameList;