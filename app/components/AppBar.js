'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SearchIcon from '@mui/icons-material/Search';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloudIcon from '@mui/icons-material/Cloud';
import ExploreIcon from '@mui/icons-material/Explore';
import Divider from '@mui/material/Divider';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar() {

    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDrawer = (open) => {
        setIsOpen(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
        >
            <List>

                <ListItem key={'WordCloud'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CloudIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Word Cloud'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'ThreadsExplorer'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ExploreIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Threads Explorer'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </Box>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => toggleDrawer(true)}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Threads Explorer
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <Drawer
                open={isOpen}
                onClose={() => toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </Box>
    );
}