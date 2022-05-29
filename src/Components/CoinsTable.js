import { Container, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { darkTheme } from '../constants/darktheme';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from '../helpers/commasInNumber';

const useStyles = makeStyles(() => ({
   row: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      fontFamily: 'Poppins',
      '&:hover': {
         backgroundColor: '#131111'
      }
   }
}))

const CoinsTable = () => {
   const [coins, setCoins] = useState([])
   const [loading, setLoading] = useState(false)
   const [search, setSearch] = useState('')
   const navigate = useNavigate()
   const classes = useStyles()

   const { currency, symbol } = CryptoState()

   const fetchCoins = async () => {
      setLoading(true)

      const { data } = await axios.get(CoinList(currency))

      setLoading(false)
      setCoins(data)
   }

   useEffect(() => {
      fetchCoins();
   }, [currency])

   const handleSearch = () => {
      return coins.filter((coin) => coin.name.toLowerCase().includes(search)) || coins.filter((coin) => coin.symbol.toLowerCase().includes(search))
   }

   return (
      <ThemeProvider theme={darkTheme}>
         <Container style={{ textAlign: 'center' }}>
            <Typography
               variant='h4'
               style={{ margin: 16, fontFamily: 'Poppins' }}
            >
               Market Cap Cryptocurrency Prices
            </Typography>

            <TextField
               label='Search cryptocurrency...'
               variant='outlined'
               style={{ marginBottom: 20, width: '100%' }}
               onChange={(e) => setSearch(e.target.value)}
            />

            <TableContainer>
               {loading ? (
                  <LinearProgress style={{ backgroungColor: '#C39EA0' }} />
               ) : (
                  <Table>
                     <TableHead style={{ backgroungColor: '#EEBC1D' }}>
                        <TableRow>
                           {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                              <TableCell
                                 style={{
                                    color: 'black',
                                    fontWeight: '700',
                                    fontFamily: 'Poppins'
                                 }}
                                 key={head}
                                 align={head === 'Coin' ? 'inherit' : 'right'}
                              >
                                 {head}
                              </TableCell>
                           ))}
                        </TableRow>
                     </TableHead>

                     <TableBody>
                        {handleSearch().map((row) => {
                           const profit = row.price_change_percentage_24h > 0;
                           return (
                              <TableRow
                                 onClick={() => navigate(`/coins/${row.id}`)}
                                 key={row.name}
                                 className={classes.row}
                              >
                                 <TableCell
                                    component='th'
                                    scope='row'
                                    style={{
                                       display: 'flex',
                                       gap: 15,
                                    }}
                                 >
                                    <img
                                       src={row.image}
                                       alt={row.name}
                                       height='50'
                                       style={{ marginBottom: 10 }}
                                    />
                                    <div style={{
                                       display: 'flex',
                                       flexDirection: 'column'
                                    }}>
                                       <span style={{
                                          textTransform: 'uppercase',
                                          fontSize: 23,
                                       }}
                                       >{row.symbol}</span>
                                       <span>{row.name}</span>
                                    </div>
                                 </TableCell>

                                 <TableCell align='right'>
                                    {symbol}{' '}{numberWithCommas(row.current_price.toFixed(2))}
                                 </TableCell>

                                 <TableCell align='right'
                                    style={{
                                       color: profit > 0 ? 'green' : 'red',
                                       fontWeight: 500
                                    }}
                                 >
                                    {profit && '+'}
                                    {row.price_change_percentage_24h.toFixed(2)}%
                                 </TableCell>

                                 <TableCell align='right'>
                                    {symbol}{' '}{numberWithCommas(row.market_cap.toString())}
                                 </TableCell>

                              </TableRow>
                           )
                        })}
                     </TableBody>
                  </Table>
               )}
            </TableContainer>
         </Container>
      </ThemeProvider >
   )
}

export default CoinsTable