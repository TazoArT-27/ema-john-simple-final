import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShopIcon from '@material-ui/icons/Shop';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import { Button } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

// const Header = () => {
    const [ loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <>
        
        <div className={classes.root}>
        <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                    style={{outline: 'none'}}
                >
                    <MenuIcon />
                </IconButton>
                <Link to='/' style={{textDecoration: 'none', color:'white'}}>
                    <Typography variant="h6">
                    Online Shopping
                    </Typography>
                </Link>
                <Button onClick={() => setLoggedInUser({})} style={{marginLeft: '1060px', outline:'none'}} color="inherit">Logout</Button>
                </Toolbar>
                
                
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                <IconButton style={{outline: 'none'}} onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </div>
                <Divider />
                <List>
                {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))} */}
                <Link to='/shop' style={{textDecoration: 'none', color:'grey'}}>
                    <ListItem button>
                        <ListItemIcon><ShopIcon></ShopIcon></ListItemIcon>
                        <ListItemText primary='Shop' />
                    </ListItem>
                </Link>
                <Link to='/review' style={{textDecoration: 'none', color:'grey'}}>
                    <ListItem button>
                        <ListItemIcon><RateReviewIcon></RateReviewIcon></ListItemIcon>
                        <ListItemText primary='Review' />
                    </ListItem>
                </Link>
                <Link to='/inventory' style={{textDecoration: 'none', color:'grey'}}>
                    <ListItem button>
                        <ListItemIcon><AspectRatioIcon></AspectRatioIcon></ListItemIcon>
                        <ListItemText primary='Inventory' />
                    </ListItem>
                </Link>
                {/* <ListItem button>
                    <ListItemIcon><ShopIcon></ShopIcon></ListItemIcon>
                    <ListItemText primary='Shop' />
                </ListItem> */}

                </List>
                {/* <Divider />
                <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List> */}
            </Drawer>
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />


            </main>
    </div>
        
        </>
    );
// };
}

// export default Header;

{/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#"><img src={logo} alt=""/></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                    <Link className="nav-link nav-title" to="/shop">Shop</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link nav-title" to="/review">Order Review</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link nav-title" to="/inventory">Inventory</Link>
                </li>
                <li>
                <ExitToAppIcon style={{color: ''}} button onClick={() => setLoggedInUser({})} ></ExitToAppIcon>
                </li>
                </ul>
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                </form>
                
            </div>
        </nav> */}