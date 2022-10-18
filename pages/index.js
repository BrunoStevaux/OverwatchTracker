import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

import { getPlayer } from '../Utilities/fetchPlayer'

export default function Home() {
  const [showAccounts, setShowAccounts] = useState([])

  const [playerSearch, setPlayerSearch] = useState('');

  const handlePlayerSearch = async (e) => {
    if(playerSearch.length < 1) return
    setPlayerSearch("")
    const test = await getPlayer(playerSearch)
    setShowAccounts(currentAccounts => [... currentAccounts, test])
  }

  const handleEnterKey = (e) => {
    if (e.keyCode !== 13) return

    handlePlayerSearch(e)
  }

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
        id="player-search-field"
        value={playerSearch}
        placeholder="PizzaLawyer#11545"
        onChange={(e) => { setPlayerSearch(e.currentTarget.value) }}
        onKeyUp={(e) => { handleEnterKey(e) }}
      ></input>
      <button
        type="button"
        // value={submit}
        className="btn btn-primary"
        id="player-search-button"
        onClick={(e) => handlePlayerSearch(e)}
      >
        Search
      </button>

      <div className="row gap-3">
        {showAccounts.map((account, id) => 
          <div
            className="col-2 border border-dark rounded"
            key={id}>
              {account.name} <br/>
              Tank: {account.tankSR} <br/>
              Damage: {account.damageSR} <br/>
              Support: {account.supportSR} <br />
            {/* Last Updated: {account.lastUpdated} <br /> */}
            </div>
        )}
      </div>
    </div>
  )
}
