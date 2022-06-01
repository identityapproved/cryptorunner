import { AppBar, Backdrop, Button, Fade, makeStyles, Modal, Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

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
               </div>

               {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                     Text in a modal
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                     Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography> */}

            </Fade>
         </Modal>
      </div>
   );
}