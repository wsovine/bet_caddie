import {Container, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";


const GameListWeekSelect = ({api, season, week, seasonType, setWeek}) => {
    const [weekOptions, setWeekOptions] = useState([{week: 1}]);
    const [seasonSelection, setSeasonSelection] = useState(season);
    const [weekSelection, setWeekSelection] = useState(week);
    const [seasonTypeSelection, setSeasonTypeSelection] = useState(seasonType);

    useEffect(() => {
        fetchWeeks();
    }, [seasonSelection, seasonTypeSelection]);

    useEffect(() => {
        setWeek({season: seasonSelection, week: weekSelection, season_type: seasonTypeSelection});
    }, [seasonSelection, seasonTypeSelection, weekSelection]);

    const fetchWeeks = () => {
        if (seasonSelection !== undefined) {
            api.get(
                `/ncaaf/weeks/${seasonSelection}/`
            ).then(resp => {
                console.log(resp);
                setWeekOptions(resp.data.weeks.filter(w => w.season_type === seasonTypeSelection));
            })
        }
    };

    return (
        <Container>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel>Season</InputLabel>
                <Select value={season} onChange={e => setSeasonSelection(e.target.value)}>
                    <MenuItem value="2021">2021</MenuItem>
                    <MenuItem value="2020">2020</MenuItem>
                    <MenuItem value="2019">2019</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 150}}>
                <InputLabel>Season Type</InputLabel>
                <Select value={seasonType} onChange={e => setSeasonTypeSelection(e.target.value)}>
                    <MenuItem value='regular' key='regular'>Regular</MenuItem>
                    <MenuItem value='postseason' key='postseason'>Postseason</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel>Week</InputLabel>
                <Select value={week} onChange={e => setWeekSelection(e.target.value)}>
                    {weekOptions.map(w => (
                        <MenuItem value={w.week} key={w.week}>{w.week}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Container>
    )
};

export default GameListWeekSelect;