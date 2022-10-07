import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

import { getPlayer } from '../Utilities/fetchPlayer'

const accounts = [...Array(5)]
export default function Home() {

  const [playerSearch, setPlayerSearch] = useState('');
  let test = "Hello"

  const handlePlayerSearch = async (e) => {
    test = await getPlayer(playerSearch)
    console.log(test)
  }

  // const getAccounts

  return (
    <div className={styles.container}>
      <div className="container bg-secondary">
        <div className="d-flex flex-row">
          <div className="p-2">
            <img src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltbcf2689c29fa39eb/622906a991f4232f0085d3cc/Masthead_Overwatch2_Logo.png?auto=webp" height="20"/>
          </div>
          <div className="p-2">
            Account Tracker
          </div>
        </div>
      </div>


      <input
        type="search"
        value={playerSearch}
        placeholder="PizzaLawyer#11545"
        onChange={(e) => { setPlayerSearch(e.currentTarget.value) }}
      ></input>
      <button
        type="button"
        className="btn btn-primary"
        id="pleayer-search-button"
        onClick={(e) => handlePlayerSearch(e)}
      >
        Search
      </button>

      <div className="row gap-3">
        {accounts.map((account, id) => 
          <div className="col-sm border border-dark rounded" key={id} style={{width: "200px"}}>
            PizzaLawyer#11545
            Tank: Master 2
            Damage: Grandmaster 3
            Support: Unplaced
          </div>
        )}
      </div>
    </div>
  )
}
