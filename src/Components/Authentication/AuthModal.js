import { AppBar, Backdrop, Box, Button, Fade, makeStyles, Modal, Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import GoogleButton from 'react-google-button';
import Login from './Login';
import Signup from './Signup';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { auth } from '../../firebase';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme) => ({
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      color: 'white',
      borderRadius: 10,
   },
   google: {
      padding: 23,
      paddingTop: 0,
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      gap: 23,
      fontSize: 13,

   }
}))


export default function AuthModal() {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   const { setAlert } = CryptoState();
   const googleProvider = new GoogleAuthProvider()

   const signInWithGoogle = () => {
      signInWithPopup(auth, googleProvider)
         .then((res) => {
            setAlert({
               open: true,
               message: `Successfully. Welcome ${res.user.email}`,
               type: 'success'
            })

            handleClose()
         })
         .catch(error => {
            setAlert({
               open: true,
               message: error.message,
               type: 'error'
            })
            return
         })
   }

   const classes = useStyles()

   return (
      <div>
         <Button
            onClick={handleOpen}
            variant='contained'
            style={{
               width: 85,
               height: 46,
               marginLeft: 13,
               backgroundColor: '#2ec4b6',
               color: 'white'
            }}
         >
            Login
         </Button>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={open}>
               <div className={classes.paper}>
                  <AppBar
                     position='static'
                     style={{ backgroundColor: 'transparent', color: 'white' }}
                  >
                     <Tabs
                        value={value}
                        onChange={handleChange}
                        variant='fullWidth'
                        style={{ borderRadius: 10 }}
                     >
                        <Tab label="Sign Up" />
                        <Tab label="Log In" />
                     </Tabs>
                  </AppBar>

                  {value === 0 && <Signup handleClose={handleClose} />}
                  {value === 1 && <Login handleClose={handleClose} />}

                  <Box className={classes.google}>
                     <span style={{ borderTop: '1px solid white' }}></span>
                     <GoogleButton
                        type='light'
                        style={{
                           width: '100%',
                           outline: 'none',
                           fontFamily: "Popping",
                           fontSize: 23,
                           backgroundColor: '#2ec4b6',
                           fontWeight: 'bold'
                        }}
                        onClick={signInWithGoogle}
                     />
                  </Box>
               </div>


            </Fade>
         </Modal>
      </div>
   );
}