import { CircularProgress, makeStyles, ThemeProvider } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { HistoricalChart } from '../config/api'
import { darkTheme } from '../constants/darktheme'
import { CryptoState } from '../CryptoContext'
import { Chart, registerables } from 'chart.js';
import { chartDays } from '../config/chartData'
import SelectButton from './SelectButton'
Chart.register(...registerables);

const CoinInfo = ({ coin }) => {
   const [historicalData, setHistoricalData] = useState()
   const [days, setDays] = useState(1)

   const { currency } = CryptoState()

   const fetchHistoricalData = async () => {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

      setHistoricalData(data.prices)
   }

   useEffect(() => {
      fetchHistoricalData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currency, days])

   const useStyles = makeStyles((theme) => ({
      container: {
         width: '75%',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         marginTop: 25,
         padding: 40,
         [theme.breakpoints.down('md')]: {
            width: '100%',
            padding: 20,
            marginTop: 0,

         }
      }
   }))

   const classes = useStyles()

   return (
      <ThemeProvider theme={darkTheme}>
         <div className={classes.container}>
            {
               !historicalData ? (
                  <CircularProgress
                     style={{ color: 'darkgray' }}
                     size={250}
                     thickness={1}
                  />
               ) : (
                  <>
                     <Line
                        data={{
                           labels: historicalData.map((coin) => {
                              let date = new Date(coin[0])
                              let time = `${date.getHours()}:${date.getMinutes()}`
                              return days === 1 ? time : date.toLocaleDateString()
                           }),
                           datasets: [{
                              data: historicalData.map((coin) => coin[1]),
                              label: `Price ( Past ${days} Days) in ${currency}`,
                              borderColor: '#2ec4b6'
                           }]
                        }}
                        options={{
                           elements: {
                              point: {
                                 radius: 1,
                              }
                           }
                        }}
                     />
                     <div style={{
                        display: 'flex',
                        marginTop: 20,
                        justifyContent: 'space-around',
                        width: '100%'
                     }}>
                        {chartDays.map((d) => (
                           <SelectButton
                              key={d.value}
                              onClick={() => setDays(d.value)}
                              selected={d.value === days}
                           >{d.label}</SelectButton>
                        ))}
                     </div>
                  </>
               )
            }
         </div>
      </ThemeProvider>
   )
}

export default CoinInfo