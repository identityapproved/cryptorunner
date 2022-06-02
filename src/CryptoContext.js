import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from './config/api'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const Crypto = createContext()

const CryptoContext = ({ children }) => {
   const [currency, setCurrency] = useState('USD')
   const [symbol, setSymbol] = useState('$')
   const [coins, setCoins] = useState([])
   const [loading, setLoading] = useState(false)
   const [user, setUser] = useState(null)
   const [watchlist, setWatchlist] = useState([])
   const [alert, setAlert] = useState({
      open: false,
      message: '',
      type: 'success'
   })

   useEffect(() => {
      if (user) {
         const coinRef = doc(db, 'watchlist', user.uid)

         const unsubscribe = onSnapshot(coinRef, (coin) => {
            if (coin.exists()) {
               setWatchlist(coin.data().coins)
            } else {
               console.log('No Items in Watchlist');
            }
         })

         return () => {
            unsubscribe()
         }
      }

   }, [user])


   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user) setUser(user)
         else setUser(null)
      })
   }, [])


   const fetchCoins = async () => {
      setLoading(true)

      const { data } = await axios.get(CoinList(currency))

      setLoading(false)
      setCoins(data)
   }

   useEffect(() => {
      if (currency === 'USD') {
         setSymbol('$')
      } else if (currency === 'EUR') {
         setSymbol('€')
      } else if (currency === 'UAH') {
         setSymbol('₴')
      }
   }, [currency])


   return (
      <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist }}>
         {children}
      </Crypto.Provider>
   )
}

export default CryptoContext;

export const CryptoState = () => {
   return useContext(Crypto)
}