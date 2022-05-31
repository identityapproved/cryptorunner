import { makeStyles } from '@material-ui/core';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import CoinPage from './Pages/CoinPage';
import HomePage from './Pages/HomePage';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    minHeight: '100vh'
  },
}))

function App() {
  const classes = useStyles()

  return (

    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} exact />
        <Route path='/coins/:id' element={<CoinPage />} />
      </Routes>
    </div>

  );
}

export default App;
