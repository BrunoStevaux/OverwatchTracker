import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { getPlayer } from '../Utilities/fetchPlayer'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh, faClose, faChevronUp, faChevronDown, fa } from '@fortawesome/free-solid-svg-icons'
import moment from "moment"


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
    <div>
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

        <div
          className={styles.containerFluid}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          
          {showAccounts.map((account, id) => 
            <div class="card" style={{ width: "320px", margin: "3px" }}>
              {/* <img class="card-img-top" src={account.profileIcon}></img> */}
              <div class="card-body" key={id}>
                <div style={{display: "flex"}}>
                  <img src={account.profileIcon} width="40"></img>
                  <h5 class="card-header">{account.name}</h5>
                  <FontAwesomeIcon icon={faRefresh}/>
                  <FontAwesomeIcon icon={faClose}/>
                </div>
                <p class="card-text" style = {{color: "darkgrey"}}>Last Updated: {moment(account.lastUpdated).fromNow()}</p>
                <div style= {{display: "flex"}}>
                  <FontAwesomeIcon icon={faChevronDown}/>
                  <FontAwesomeIcon icon={faChevronUp} />
                  <p class="card-text">Tank: {account.tankSR}</p>
                </div>
                <div style= {{display: "flex"}}>
                  <FontAwesomeIcon icon={faChevronDown}/>
                  <FontAwesomeIcon icon={faChevronUp}/>
                  <p class="card-text">Damage: {account.damageSR}</p>
                </div>
                <div style= {{display: "flex"}}>
                  <FontAwesomeIcon icon={faChevronDown}/>
                  <FontAwesomeIcon icon={faChevronUp}/>
                  <p class="card-text">Support: {account.supportSR}</p>
                </div>
                <a href="#" class="card-link">View online</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}