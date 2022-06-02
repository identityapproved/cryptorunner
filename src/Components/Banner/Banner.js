import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
   banner: {
      backgroundImage: 'url(./banner.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
      height: '32%',
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
                     color: 'white',
                     marginBottom: 13,
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
            <Carousel />
         </Container>
      </div>
   )
}

export default Banner