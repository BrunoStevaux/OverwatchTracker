import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Component, useState, useEffect } from 'react'
import { getPlayer, increaseRank, decreaseRank, updateTime} from '../Utilities/fetchPlayer'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh, faClose, faChevronUp, faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import moment from "moment"

export default function Home() {

  const [showAccounts, setShowAccounts] = useState([])
  const [playerSearch, setPlayerSearch] = useState('')

  const loadAccounts = () => {
    try {
      console.log("Attempting to load from localstorage")
      let localAccounts = localStorage.getItem('savedAccounts')
      localAccounts = JSON.parse(localAccounts)

      if(localAccounts.length < 1) return

      setShowAccounts(localAccounts)

      console.log(`Loaded ${localAccounts.length} account(s)`)
    } catch (e) { console.log(e) }
  }

  const handlePlayerSearchInput = async (e) => {
    if (playerSearch.length < 1) {
      return // Check if there is any input
    }
    // https://eu.forums.blizzard.com/en/blizzard/t/battle-tag-regex-expression/444
    // (^([A-zÀ-ú][A-zÀ-ú0-9]{2,11})|(^([а-яёА-ЯЁÀ-ú][а-яёА-ЯЁ0-9À-ú]{2,11})))(#[0-9]{4,})$

    if (showAccounts.filter(account => account.name == playerSearch).length > 0) { // Check that account is not duplicate
      alert(`Account "${playerSearch}" already added`)
      return
    }
    addPlayer(playerSearch) // Add player to our list
    setPlayerSearch("") // Reset the search field
  }

  const addPlayer = async (account) => {
    const newAccount = await getPlayer(account)
    setShowAccounts(currentAccounts => [...currentAccounts, newAccount])
    saveToLocal()
  }

  const handleEnterKey = (e) => {
    if (e.keyCode !== 13) return
    handlePlayerSearchInput(e)
  }

  const saveToLocal = () => {
    console.log("Saved to localstorage")
    localStorage.setItem('savedAccounts', JSON.stringify(showAccounts));
  }

  // const updateAllAccounts = () => {

  //   setShowAccounts()
  //   showAccounts.forEach(account => {
  //     account.lastUpdated = updateTime()
  //   })
  // }

  const updateAccount = (id) => {
    console.log(`Updating account [${showAccounts[id].name}]`)

    let buffer = showAccounts.filter(account => account.name == showAccounts[id].name)[0]
    buffer.lastUpdated = updateTime()

    setShowAccounts[id] = buffer
    setShowAccounts(currentAccounts => [...currentAccounts])

    saveToLocal()
  }

  const removeAccount = (id) => {
    console.log(`Removing account [${showAccounts[id].name}] - id ${id}`)    
    setShowAccounts(showAccounts.filter(account => 
      account.name !== showAccounts[id].name
    ))
    console.log(`Success`)
    saveToLocal()
  }

  const rankUp = (id, role) => {
    let buffer = showAccounts.filter(account => account.name == showAccounts[id].name)[0]
    if(role == "tank") buffer.tankSR = increaseRank(buffer.tankSR)
    if(role == "damage") buffer.damageSR = increaseRank(buffer.damageSR)
    if(role == "support") buffer.supportSR = increaseRank(buffer.supportSR)

    updateAccount(id)
  }

  const rankDown = (id, role) => {
    let buffer = showAccounts.filter(account => account.name == showAccounts[id].name)[0]
    if(role == "tank") buffer.tankSR = decreaseRank(buffer.tankSR)
    if(role == "damage") buffer.damageSR = decreaseRank(buffer.damageSR)
    if(role == "support") buffer.supportSR = decreaseRank(buffer.supportSR)

    updateAccount(id)
  }

  useEffect(() => {
    console.log("Page loaded.");
    loadAccounts()
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div className="container bg-secondary">
          <div className="d-flex flex-row">
            <div className="p-2">
              <img src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltbcf2689c29fa39eb/622906a991f4232f0085d3cc/Masthead_Overwatch2_Logo.png?auto=webp" height="20"/>
            </div>
            <div className="p-2">
              <h1> Account Tracker </h1>
            </div>
          </div>
        </div>
        <div class="search-bar">
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
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </button>
        </div>
        <div
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}
        >
          
          {showAccounts.map((account, id) => 
          <div className="card" style={{ width: "320px", margin: "3px", borderRadius: "10px" }} id={id} key={id}>
            {/* <img class="card-img-top" src={account.profileIcon}></img> */}
            <div className="card-body">
              <div style={{display: "flex"}}>
                <img src={account.profileIcon} width="40"></img>
                <h5 className="card-header">{account.name}</h5>
                <button className="refresh-button" onClick={() => updateAccount(id)}> <FontAwesomeIcon icon={faRefresh}/> </button>
                <button className="delete-button" onClick={() => removeAccount(id)}> <FontAwesomeIcon icon={faClose}/> </button>
              </div>

              <p className="card-text" style={{ color: "darkgrey" }}>Last Updated: {moment(account.lastUpdated).fromNow()}, {account.lastUpdated}</p>
              <div style={{ display: "flex" }}>
                <button onClick={() => rankDown(id, "tank")}><FontAwesomeIcon icon={faChevronDown}/></button>
                <button onClick={() => rankUp(id, "tank")}><FontAwesomeIcon icon={faChevronUp} /></button>
              
                <p className="card-text">Tank: {account.tankSR}</p>
              </div>

              <div style= {{display: "flex"}}>
                <button onClick={() => rankDown(id, "damage")}><FontAwesomeIcon icon={faChevronDown}/></button>
                <button onClick={() => rankUp(id, "damage")}><FontAwesomeIcon icon={faChevronUp}/></button>
                <p className="card-text">Damage: {account.damageSR}</p>
              </div>

              <div style= {{display: "flex"}}>
                <button onClick={() => rankDown(id, "support")}><FontAwesomeIcon icon={faChevronDown}/></button>
                <button onClick={() => rankUp(id, "support")}><FontAwesomeIcon icon={faChevronUp}/></button>
                <p className="card-text">Support: {account.supportSR}</p>
              </div>

                <a target="_blank" rel="noopener noreferrer" href={ account.url } className="card-link">View online</a>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}