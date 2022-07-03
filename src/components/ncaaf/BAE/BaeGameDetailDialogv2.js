import {Dialog, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import BaePlot from "./BaePlot";
import BaeBetConditions from "./BaeBetConditions";


const BaeGameDetailDialogv2 = ({game, open, handleClose}) => {
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
            <DialogTitle>{game.awayteam} @ {game.hometeam}</DialogTitle>
            <DialogContent>
                { open ? <DialogContentText>
                    <Typography variant='h4'>Win Probabilities</Typography>
                    <BaePlot game={game} />
                    <Typography variant='h4'>Acceptable Odds</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <BaeBetConditions game={game} side='away' />
                        </Grid>
                        <Grid item xs={6}>
                            <BaeBetConditions game={game} side='home' />
                        </Grid>
                    </Grid>
                </DialogContentText> : undefined }
            </DialogContent>
        </Dialog>
    )
};

export default BaeGameDetailDialogv2;