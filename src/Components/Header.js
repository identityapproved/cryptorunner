import { AppBar, Container, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { darkTheme } from '../constants/darktheme';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles(() => ({
   title: {
      flex: 1,
      color: '#2ec4b6',
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      cursor: 'pointer',
   },
   select: {
      border: 'solid 1px #2ec4b6',
      padding: 6,
      width: 100,
      height: 46,
      marginRight: 13,
   }
}))

const Header = () => {
   const classes = useStyles();
   const navigate = useNavigate();

   const { currency, setCurrency, user } = CryptoState();

   return (
      <ThemeProvider theme={darkTheme}>
         <AppBar color='transparent' position='static'>
            <Container>
               <Toolbar>
                  <Typography
                     className={classes.title}
                     variant='h6'
                     onClick={() => navigate('/')}
                  >
                     Crypto Seeker
                  </Typography>
                  <Select
                     className={classes.select}
                     variant='outlined'
                     value={currency}
                     onChange={(e) => setCurrency(e.target.value)}
                  >
                     <MenuItem value={'USD'}>USD</MenuItem>
                     <MenuItem value={'EUR'}>EUR</MenuItem>
                     <MenuItem value={'UAH'}>UAH</MenuItem>
                  </Select>
                  {user ? <UserSidebar /> : <AuthModal />}
               </Toolbar>
            </Container>
         </AppBar>
      </ThemeProvider>
   )
}

export default Header