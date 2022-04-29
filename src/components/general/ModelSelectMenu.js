import {Button, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import CeloGameList from "../ncaaf/CeloGameList";
import ArmGameList from "../ncaaf/ArmGameList";

const ModelSelectMenu = ({setModel}) => {
    const [anchorEl, setAnchorEl] = useState(null | HTMLElement>(null));
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const selectModel = (component) => {
        setModel(component);
        handleClose();
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color='primary'
            >
                NCAAF
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => selectModel(<CeloGameList/>)}>CELO</MenuItem>
                <MenuItem onClick={() => selectModel(<ArmGameList/>)}>ARM</MenuItem>
            </Menu>
        </div>
    );
}

export default ModelSelectMenu;