import Button from "./Button";
import styles from "./App.module.css";
//import { useState, useEffect } from "react";
import { func } from "prop-types";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  const [coins, setCoins] = useState([]);

  const [dollar, setDollar] = useState(0);
  const [btcPrice, setBtcPrice] = useState(null);
  console.log(btcPrice);

  const selectOnchange = (event) => {
    setBtcPrice(coins[event.target.value]);
  };

  const onChange = (event) => {
    setDollar(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      //fetchdata("/users")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setBtcPrice(json[0]);
      });

    // fetch에 url 삽입가능
    // cors 에러 확인 , http-proxy-middleware 설치 후  setupProxy.js 파일 생성으로 해결
    /*  -- 과제 
     input 생성 후 달러를 입력하면, 선택한 코인을 얼마나 살 수 있는지 알려주는 기능
     */
  }, []);
  return (
    <div>
      <h1>The coins! {loading ? "" : `(${coins.length})`} </h1>

      {loading ? (
        <strong>loading...</strong>
      ) : (
        <select onChange={selectOnchange}>
          {coins.map((coin, index) => (
            <option key={coin.id} value={index}>
              {coin.name} ({coin.symbol}) : $({coin.quotes.USD.price}) USD
            </option>
          ))}
        </select>
      )}
      <div>
        <input
          value={dollar}
          onChange={onChange}
          type="number"
          placeholder="달러"
        />

        <hr />
        <strong>
          선택한 코인 가격 :{btcPrice.name} ({btcPrice.symbol}) :
          {dollar / btcPrice.quotes.USD.price}
        </strong>
      </div>
    </div>
  );
}

export default App;
