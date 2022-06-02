import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Avatar, makeStyles } from '@material-ui/core';
import { CryptoState } from '../../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../../helpers/commasInNumber';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { doc, setDoc } from 'firebase/firestore';


const useStyles = makeStyles({
   container: {
      width: 320,
      padding: 23,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Poppins',
   },
   profile: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '13px',
      height: '92%'
   },
   picture: {
      width: 200,
      height: 200,
      cursor: 'pointer',
      backgroundColor: '#cbf3f0',
      objectFit: 'contain'
   },
   logout: {
      height: 46,
      width: '100%',
      backgroundColor: '#cbf3f0',
      marginTop: 23,
      fontFamily: "Poppins",
      cursor: 'pointer',
      '&:hover': {
         backgroundColor: '#2ec4b6',
      },
   },
   watchlist: {
      flex: 1,
      width: '100%',
      backgroundColor: 'grey',
      borderRadius: 10,
      padding: 13,
      paddingTop: 13,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 13,
      overflowY: 'auto'
   },
   coin: {
      padding: 13,
      borderRadius: 5,
      color: 'black',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#2ec4b6',
      boxShadow: '0 0 6px black'
   }
});

export default function UserSidebar() {
   const classes = useStyles();
   const [state, setState] = React.useState({
      right: false,
   });

   const { user, setAlert, watchlist, coins, symbol } = CryptoState()

   const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }

      setState({ ...state, [anchor]: open });
   };

   const logOut = () => {
      signOut(auth)

      setAlert({
         open: true,
         type: 'success',
         message: 'You are logged out!'
      })

      toggleDrawer()
   }

   const removeFromWatchlist = async (coin) => {
      const coinRef = doc(db, 'watchlist', user.uid)

      try {
         await setDoc(coinRef, {
            coins: watchlist.filter((watch) => watch !== coin?.id)
         }, {
            merge: true
         })

         setAlert({
            open: true,
            message: `${coin.name} removed from the watchlist.`,
            type: 'success',
         })
      } catch (error) {
         setAlert({
            open: true,
            message: error.message,
            type: 'error',
         })
      }
   }

   return (
      <div>
         {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
               <Avatar
                  onClick={toggleDrawer(anchor, true)}
                  style={{
                     height: 46,
                     width: 46,
                     marginLeft: 13,
                     cursor: 'pointer',
                     backgroundColor: '#cbf3f0'
                  }}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
               />
               <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
               >
                  <div className={classes.container}>
                     <div className={classes.profile}>
                        <Avatar
                           className={classes.picture}
                           src={user.photoURL}
                           alt={user.displayName || user.email}
                        />
                        <span
                           style={{
                              width: '100%',
                              fontSize: 16,
                              textAlign: 'center',
                              fontWeight: 'bold',
                              wordWrap: 'break-word'
                           }}
                        >
                           {user.displayName || user.email}
                        </span>
                        <span style={{ fontSize: 15, textShadow: '0 0 5px black' }}>Watchlist</span>
                        <div
                           className={classes.watchlist}>
                           {coins.map((coin) => {
                              if (watchlist.includes(coin.id)) {
                                 return (
                                    <div
                                       key={coin.name}
                                       className={classes.coin}>
                                       <span>{coin.name}</span>
                                       <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                          {symbol}
                                          {numberWithCommas(coin?.current_price.toFixed(2))}
                                          <RiDeleteBin5Line
                                             style={{ cursor: 'pointer' }}
                                             fontSize='18'
                                             onClick={() => removeFromWatchlist(coin)}
                                          />
                                       </span>
                                    </div>
                                 )
                              }
                           })}
                        </div>
                        <Button
                           variant='contained'
                           className={classes.logout}
                           onClick={logOut}
                        >Log Out</Button>
                     </div>
                  </div>
               </Drawer>
            </React.Fragment>
         ))}
      </div>
   );
}