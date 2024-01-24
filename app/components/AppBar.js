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
import { Add, BarChart, Group } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function SearchAppBar() {
    const pathname = usePathname()
    const id = pathname.split('/')[2]

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
            <Link href={`/`}>
            <ListItem key={'Title'} disablePadding>
                <ListItemButton>
                    <ListItemText primary={'Explore Threads'} />
                </ListItemButton>
            </ListItem>
            </Link>
            <Divider />
            <List>
                <ListItem key={'ThreadsExplorer'} disablePadding>
                    <Link href={`/group/${id}`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ExploreIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Threads Explorer'} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem key={'Users Dashboard'} disablePadding onClick={() => console.log('+')}>
                    <Link href={`/stats/${id}`}>
                        <ListItemButton>
                            <ListItemIcon>
                                <BarChart />
                            </ListItemIcon>
                            <ListItemText primary={'Stats Explorer'} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider />
        </Box>
    );


    return (
        <Box sx={{ flexGrow: 1, pt: 8 }}>
            <AppBar position="fixed">
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
                        sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                    >
                        Threads Explorer
                    </Typography>

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