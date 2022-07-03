import Plot from 'react-plotly.js';
import NormalDistribution from "normal-distribution";

function range(start, stop, step) {
    let a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return a;
}

function away_dist(game, x_vals) {
    const dist = new NormalDistribution(game.away_prediction, game.prediction_std);
    return x_vals.map(x => dist.pdf(x));
}

function home_dist(game, x_vals) {
    const dist = new NormalDistribution(game.home_prediction, game.prediction_std);
    return x_vals.map(x => dist.pdf(x));
}

const BaePlot = ({game}) => {
    const x = range(0, 1, .001);
    const away_y = away_dist(game, x);
    const home_y = home_dist(game, x);

    let away_trace = {
        x: x,
        y: away_y,
        type: 'scatter',
        mode: 'lines',
        marker: {color: game.away_color},
        name: game.awayteam
    };

    let home_trace = {
        x: x,
        y: home_y,
        type: 'scatter',
        mode: 'lines',
        marker: {color: game.home_color},
        name: game.hometeam
    };

    let layout = {
        width: 300,
        height: 275,
        margin: {
            l: 15,
            r: 15,
            b: 75,
            t: 75,
            pad: 0
        },
        // title: 'Win Probabilities',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            color: 'white'
        },
        legend: {
            orientation: 'h',
            x: .5,
            y: 1.2,
            xanchor: 'center',
        },
        xaxis: {
            tickformat: '.0%',
            showgrid: false
        },
        yaxis: {
            showgrid: false
        },
        shapes: [
            {
                type: 'line',
                x0: game.away_hdi_lower,
                y0: 0,
                x1: game.away_hdi_lower,
                yref: 'paper',
                y1: 1,
                line: {
                    color: game.away_color,
                    width: 1,
                    dash: 'dot'
                },
            },
            {
                type: 'line',
                x0: game.away_hdi_upper,
                y0: 0,
                x1: game.away_hdi_upper,
                yref: 'paper',
                y1: 1,
                line: {
                    color: game.away_color,
                    width: 1,
                    dash: 'dot'
                }
            },
            {
                type: 'line',
                x0: game.home_hdi_lower,
                y0: 0,
                x1: game.home_hdi_lower,
                yref: 'paper',
                y1: 1,
                line: {
                    color: game.home_color,
                    width: 1,
                    dash: 'dot'
                }
            },
            {
                type: 'line',
                x0: game.home_hdi_upper,
                y0: 0,
                x1: game.home_hdi_upper,
                yref: 'paper',
                y1: 1,
                line: {
                    color: game.home_color,
                    width: 1,
                    dash: 'dot'
                }
            },
        ]
    }

    return(
        <Plot
            data={[away_trace, home_trace]}
            layout={layout}
        />
    )
}

export default BaePlot;