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
  const [playerSearch, setPlayerSearch] = useState('')

  const handlePlayerSearchInput = async (e) => {
    if (playerSearch.length < 1) return // Check if there is any input



    if (showAccounts.filter(account => account.name == playerSearch).length > 0) { // Check that account is not duplicate
      alert(`Account "${playerSearch}" already added`)
      return
    }
    addPlayer(playerSearch) // Add player to our list
    setPlayerSearch("") // Reset the search field
  }

  const addPlayer = async (account) => {
    const newAccount = await getPlayer(account)
    setShowAccounts(currentAccounts => [... currentAccounts, newAccount])
  }

  const handleEnterKey = (e) => {
    if (e.keyCode !== 13) return
    handlePlayerSearchInput(e)
  }

  const updateAccount = (account, id) => {
    console.log(account.name)
    console.log(showAccounts[id])
  }

  const removeAccount = (account, id) => {
    console.log(`Removing account [${showAccounts[id].name}] - id ${id}`)    
    setShowAccounts(showAccounts.filter(account => 
      account.name !== showAccounts[id].name
      ))
    console.log(`Success`)
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
          className="btn btn-primary"
          id="player-search-button"
          onClick={(e) => handlePlayerSearchInput(e)}
        >
          Search
        </button>

        <div
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          
          {showAccounts.map((account, id) => 
            <div className="card" style={{ width: "320px", margin: "3px" }} id={id} key={id}>
              {/* <img class="card-img-top" src={account.profileIcon}></img> */}
              <div className="card-body">
                <div style={{display: "flex"}}>
                  <img src={account.profileIcon} width="40"></img>
                  <h5 className="card-header">{account.name}</h5>
                  <button className="btn btn-success" onClick={(e) => updateAccount(account, id)}> <FontAwesomeIcon icon={faRefresh}/> </button>
                  <button className="btn btn-danger" onClick={(e) => removeAccount(account, id)}> <FontAwesomeIcon icon={faClose}/> </button>
                </div>

                <p className="card-text" style = {{color: "darkgrey"}}>Last Updated: {moment(account.lastUpdated).fromNow()}</p>
                <div style= {{display: "flex"}}>
                  <button><FontAwesomeIcon icon={faChevronDown}/></button>
                  <button><FontAwesomeIcon icon={faChevronUp}/></button>
                  <p className="card-text">Tank: {account.tankSR}</p>
                </div>

                <div style= {{display: "flex"}}>
                  <button><FontAwesomeIcon icon={faChevronDown}/></button>
                  <button><FontAwesomeIcon icon={faChevronUp}/></button>
                  <p className="card-text">Damage: {account.damageSR}</p>
                </div>

                <div style= {{display: "flex"}}>
                  <button><FontAwesomeIcon icon={faChevronDown}/></button>
                  <button><FontAwesomeIcon icon={faChevronUp}/></button>
                  <p className="card-text">Support: {account.supportSR}</p>
                </div>

                <a href="#" className="card-link">View online</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}