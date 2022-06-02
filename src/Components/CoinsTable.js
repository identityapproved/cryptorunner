import { Container, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';

import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
   },
   pagination: {
      '& .MuiPaginationItem-root': {
         color: '#cbf3f0'
      },
      '& .MuiPaginationItem-root:hover': {
         color: '#2ec4b6',
      },
      '& .Mui-selected': {
         border: '1px solid #cbf3f0',
         color: '#2ec4b6',
         backgroundColor: 'transparent'
      }
   }
}))

const CoinsTable = () => {
   const [search, setSearch] = useState('')
   const navigate = useNavigate()
   const classes = useStyles()
   const [page, setPage] = useState(1)

   const { currency, symbol, coins, loading, fetchCoins } = CryptoState()

   useEffect(() => {
      fetchCoins();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currency])

   const handleSearch = () => {
      return coins.filter((coin) => coin.name.toLowerCase().includes(search)) || coins.filter((coin) => coin.symbol.toLowerCase().includes(search))
   }

   return (
      <ThemeProvider theme={darkTheme}>
         <Container style={{ textAlign: 'center' }}>
            <Typography
               variant='h4'
               style={{ margin: 16, fontFamily: 'Poppins', color: '#cbf3f0' }}
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
                                    color: '#cbf3f0',
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
                        {handleSearch()
                           .slice((page - 1) * 10, (page - 1) * 10 + 10)
                           .map((row) => {
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
                                       {symbol}{' '}{numberWithCommas(row.current_price)}
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
                                       {symbol}{' '}{numberWithCommas(row.market_cap)}
                                    </TableCell>

                                 </TableRow>
                              )
                           })}
                     </TableBody>
                  </Table>
               )}
            </TableContainer>
            <Pagination
               style={{
                  padding: 20,
                  width: "100%",
                  display: 'flex',
                  justifyContent: 'center'
               }}
               classes={{ ul: classes.pagination }}
               count={+(handleSearch()?.length / 10).toFixed(0)}
               onChange={(_, value) => {
                  setPage(value)

                  window.scroll(0, 466)
               }}
            />
         </Container>
      </ThemeProvider >
   )
}

export default CoinsTable