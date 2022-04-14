import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './Coin';



function App() {

  const[coins,setCoins]=useState([]);
  const [search, setSearch] = useState('')

  useEffect(()=> {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
    }).catch(error => console.log(error))
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="App">
     <div className="coin-search">
       <h1>Search a Cryptocurrency</h1>
       <form action="">
         <input type="text" placeholder="Search" 
         className="coin-input" onChange={handleChange}/>

       </form>
       <p>*All prices are in CAD</p>
     </div>
     <div className="titles">
       <h4>Crypto</h4>
       <h4 className="title-push">Price</h4>
       <h4 className="title-push" style={{left:"93px"}}>Volume</h4>
       <h4 className="title-push">24h%</h4>
       <h4 className="title-push" style={{left:"38px"}}>Market Cap</h4>
     </div>
     {filteredCoins.map(coin => {
       return(
         <Coin 
         key={coin.id} 
         name={coin.name} 
         image={coin.image}
         symbol = {coin.symbol} 
         volume={coin.total_volume} 
         price={coin.current_price} 
         priceChange={coin.price_change_percentage_24h}
         marketcap={coin.market_cap}
         />
       )
     })}
    </div>
  );
}

export default App;
