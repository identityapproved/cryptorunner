import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
   banner: {
      backgroundImage: 'url(./banner.jpg)',
      backgroundBlendMode: 'darken',
   },
   bannerContent: {
      height: 400,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 23,
      justifyContent: 'space-around',
   },
   tagline: {
      display: 'flex',
      height: '40%',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center'
   }


}))

const Banner = () => {
   const classes = useStyles()
   return (
      <div className={classes.banner}>
         <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
               <Typography
                  variant='h2'
                  style={{
                     fontWeight: 'bold',
                     marginBottom: 16,
                     fontFamily: 'Poppins'
                  }}
               >
                  Crypto Seeker
               </Typography>

               <Typography
                  variant='subtitle1'
                  style={{
                     color: 'lightgrey',
                     textTransform: 'capitalize',
                     fontFamily: 'Poppins'
                  }}
               >
                  Get all info about your favorite Crypto
               </Typography>
            </div>
         </Container>
      </div>
   )
}

export default Banner