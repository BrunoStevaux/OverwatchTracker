import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Tooltip } from "@nextui-org/react";
import {
  getPlayer,
  increaseRank,
  decreaseRank,
  updateTime,
  getRank,
} from "../Utilities/fetchPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRefresh,
  faClose,
  faChevronUp,
  faChevronDown,
  faMagnifyingGlass,
  faSort,
  faClock,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

let azSortAsc = true;
let dateSortAsc = true;
let tankSortAsc = true;
let damageSortAsc = true;
let supportSortAsc = true;
let flexSortAsc = true;

export default function Home() {
  const [showAccounts, setShowAccounts] = useState([]); // Account cards
  const [playerSearch, setPlayerSearch] = useState(""); // Search bar
  const [allowDelete, setAllowDelete] = useState(false); // Delete button
  const TANK = "tank";
  const DAMAGE = "damage";
  const SUPPORT = "support";

  // Loads all accounts on first boot
  const loadAccounts = () => {
    try {
      console.log("Attempting to load from localstorage");
      let localAccounts = localStorage.getItem("savedAccounts");
      localAccounts = JSON.parse(localAccounts);

      if (localAccounts.length < 1) return;

      setShowAccounts(localAccounts);

      console.log(`Loaded ${localAccounts.length} account(s)`);
    } catch (e) {
      console.log(e);
    }
  };

  // Called every time the search button is clicked or enter is pressed
  const handlePlayerSearchInput = async (e) => {
    if (playerSearch.length < 1) {
      return; // Check if there is any input
    }

    // Check if discriminator is provided
    let account = playerSearch.split("#");
    if (account.length < 2) {
      alert(`Please provide a discriminator (# symbol followed by 3-6 digits)`);
      return;
    }

    // Name check
    if (account[0].length < 3 || account[0].length > 12) {
      alert(`Account "${account[0]}" must be between 3 and 12 characters.`);
      return;
    }

    // Number check
    if (parseInt(account[1]) < 1000 || parseInt(account[1]) > 999999) {
      alert(`"${account[1]}" is not a valid discriminator`);
      return;
    }

    // Make sure that the account is unique
    if (
      showAccounts.filter((account) => account.name == playerSearch).length > 0
    ) {
      alert(`Account "${playerSearch}" already added`);
      return;
    }
    addPlayer(playerSearch); // Add player to our list
    setPlayerSearch(""); // Reset the search field
  };

  // Adds a player to our accounts list
  const addPlayer = async (account) => {
    const newAccount = await getPlayer(account);
    setShowAccounts((currentAccounts) => [...currentAccounts, newAccount]); // Updates the screen with the new account
    let newArray = [...showAccounts, newAccount]; // Create new array with the new account. Only used for saving
    saveToLocal(newArray);
  };

  // Anytime a key is pressed while in the search bar
  const handleEnterKey = (e) => {
    if (e.keyCode !== 13) return; // If NOT enter, leave
    handlePlayerSearchInput(e);
  };

  // Saves accounts to local storage
  const saveToLocal = (accountsToSave) => {
    localStorage.setItem("savedAccounts", JSON.stringify(accountsToSave));
    console.log("Saved to localstorage");
  };

  // Updates the accounts
  async function updateAccount(id) {
    console.log(`Updating account [${showAccounts[id].name}]`);

    // Fetch the account from our list
    let buffer = showAccounts.filter(
      (account) => account.name == showAccounts[id].name
    )[0];
    // IMPLEMENT API HERE !
    // IMPLEMENT API HERE !
    // IMPLEMENT API HERE !
    // IMPLEMENT API HERE !
    // IMPLEMENT API HERE !
    // IMPLEMENT API HERE !
    // IMPLEMENT API HERE !
    // IMPLEMENT API HERE !
    // IMPLEMENT API HERE !
    // IMPLEMENT API HERE !

    // Right now we can just update the time to show that something has occured.
    buffer.lastUpdated = await updateTime(); // Update the info

    setShowAccounts[id] = buffer; // Put updated account back in list
    setShowAccounts((currentAccounts) => [...currentAccounts]); // Refresh the account list

    // Not adding or removing account, so no race condition to worry about
    // (for some reason lol)
    saveToLocal(showAccounts);
  }

  // Removes an account from our list of accounts
  const removeAccount = (id) => {
    // Return the account that matches the ID's account name
    let newAccountList = showAccounts.filter(
      (account) => account.name !== showAccounts[id].name
    );
    setShowAccounts(newAccountList); // Refresh the account list
    saveToLocal(newAccountList); // Save
  };

  // Updates a specific role depending on which role is used in the function call
  // Only used for custom accounts
  const rankUp = (id, role) => {
    let buffer = showAccounts.filter(
      (account) => account.name == showAccounts[id].name
    )[0];
    if (role == TANK) buffer.tankSR = increaseRank(buffer.tankSR);
    if (role == DAMAGE) buffer.damageSR = increaseRank(buffer.damageSR);
    if (role == SUPPORT) buffer.supportSR = increaseRank(buffer.supportSR);

    updateAccount(id);
  };

  // Updates a specific role depending on which role is used in the function call
  // Only used for custom accounts
  const rankDown = (id, role) => {
    let buffer = showAccounts.filter(
      (account) => account.name == showAccounts[id].name
    )[0];
    if (role == TANK) buffer.tankSR = decreaseRank(buffer.tankSR);
    if (role == DAMAGE) buffer.damageSR = decreaseRank(buffer.damageSR);
    if (role == SUPPORT) buffer.supportSR = decreaseRank(buffer.supportSR);

    updateAccount(id);
  };

  const sortAZ = () => {
    azSortAsc = !azSortAsc;
    let sortedAccounts = showAccounts;
    if (azSortAsc)
      sortedAccounts.sort(function (a, b) {
        return ("" + b.name).localeCompare(a.name);
      });
    else
      sortedAccounts.sort(function (a, b) {
        return ("" + a.name).localeCompare(b.name);
      });
    setShowAccounts(sortedAccounts);
    setShowAccounts((currentAccounts) => [...currentAccounts]); // Refresh the account list
    saveToLocal(sortedAccounts);
  };

  const sortDateAdded = () => {
    dateSortAsc = !dateSortAsc;
    let sortedAccounts = showAccounts;
    if (dateSortAsc)
      sortedAccounts.sort(function (a, b) {
        return b.addedDate - a.addedDate;
      });
    else
      sortedAccounts.sort(function (a, b) {
        return a.addedDate - b.addedDate;
      });
    setShowAccounts(sortedAccounts);
    setShowAccounts((currentAccounts) => [...currentAccounts]); // Refresh the account list
    saveToLocal(sortedAccounts);
  };

  const sortTank = () => {
    tankSortAsc = !tankSortAsc;
    let sortedAccounts = showAccounts;
    if (tankSortAsc)
      sortedAccounts.sort(function (a, b) {
        return getRank(b.tankSR) - getRank(a.tankSR);
      });
    else
      sortedAccounts.sort(function (a, b) {
        return getRank(a.tankSR) - getRank(b.tankSR);
      });
    setShowAccounts(sortedAccounts);
    setShowAccounts((currentAccounts) => [...currentAccounts]); // Refresh the account list
    saveToLocal(sortedAccounts);
  };

  const sortDamage = () => {
    damageSortAsc = !damageSortAsc;
    let sortedAccounts = showAccounts;
    if (damageSortAsc)
      sortedAccounts.sort(function (a, b) {
        return getRank(b.damageSR) - getRank(a.damageSR);
      });
    else
      sortedAccounts.sort(function (a, b) {
        return getRank(a.damageSR) - getRank(b.damageSR);
      });
    setShowAccounts(sortedAccounts);
    setShowAccounts((currentAccounts) => [...currentAccounts]); // Refresh the account list
    saveToLocal(sortedAccounts);
  };

  const sortSupport = () => {
    supportSortAsc = !supportSortAsc;
    let sortedAccounts = showAccounts;
    if (supportSortAsc)
      sortedAccounts.sort(function (a, b) {
        return getRank(b.supportSR) - getRank(a.supportSR);
      });
    else
      sortedAccounts.sort(function (a, b) {
        return getRank(a.supportSR) - getRank(b.supportSR);
      });
    setShowAccounts(sortedAccounts);
    setShowAccounts((currentAccounts) => [...currentAccounts]); // Refresh the account list
    saveToLocal(sortedAccounts);
  };

  const sortFlex = () => {
    flexSortAsc = !flexSortAsc;
    let sortedAccounts = showAccounts;
    if (flexSortAsc)
      sortedAccounts.sort(function (a, b) {
        return (
          getRank(b.tankSR) +
          getRank(b.damageSR) +
          getRank(b.supportSR) -
          (getRank(a.tankSR) + getRank(a.damageSR) + getRank(a.supportSR))
        );
      });
    else
      sortedAccounts.sort(function (a, b) {
        return (
          getRank(a.tankSR) +
          getRank(a.damageSR) +
          getRank(a.supportSR) -
          (getRank(b.tankSR) + getRank(b.damageSR) + getRank(b.supportSR))
        );
      });
    setShowAccounts(sortedAccounts);
    setShowAccounts((currentAccounts) => [...currentAccounts]); // Refresh the account list
    saveToLocal(sortedAccounts);
  };

  // Refreshes all accounts
  const refreshAll = () => {
    for (let i = 0; i < showAccounts.length; i++) {
      updateAccount(i);
      console.log(`updating ${showAccounts[i].name}`);
    }
    setShowAccounts((currentAccounts) => [...currentAccounts]); // Refresh the account list
    saveToLocal(sortedAccounts);
  };

  // Deletes all couunts
  const deleteAll = () => {
    setShowAccounts([]);
    saveToLocal([]);
  };

  // Toggles the ability to delete all accounts
  const toggleDelete = () => {
    setAllowDelete(!allowDelete);
  };

  // This is called upon loading the page. It is what initially loads our accounts
  useEffect(() => {
    console.log("Page loaded.");
    loadAccounts();
  }, []);

  return (
    <div>
      <Head>
        <title>OW2 Tracker</title>
      </Head>

      <div className={styles.container}>
        <div className="ow-header">
          <img
            src="https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltbcf2689c29fa39eb/622906a991f4232f0085d3cc/Masthead_Overwatch2_Logo.png?auto=webp"
            height="30"
          />
          <h1> Account Tracker </h1>
        </div>
        <div className="search-bar">
          <input
            type="search"
            className="player-search-field"
            value={playerSearch}
            placeholder="PizzaLawyer#11545"
            onChange={(e) => {
              setPlayerSearch(e.currentTarget.value);
            }}
            onKeyUp={(e) => {
              handleEnterKey(e);
            }}
          ></input>
          <button
            type="button"
            className="player-search-button"
            onClick={(e) => handlePlayerSearchInput(e)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px",
            flexWrap: "wrap",
          }}
        >
          <Tooltip content={"Sort alphabetically"}>
            <button className="sort-button" onClick={(e) => sortAZ()}>
              A-Z <FontAwesomeIcon icon={faSort} />
            </button>
          </Tooltip>
          <Tooltip content={"Sort by date added"}>
            <button className="sort-button" onClick={(e) => sortDateAdded()}>
              <FontAwesomeIcon icon={faClock} />{" "}
              <FontAwesomeIcon icon={faSort} />
            </button>
          </Tooltip>
          <Tooltip content={"Sort by tank rating"}>
            <button className="sort-button" onClick={(e) => sortTank()}>
              Tank <FontAwesomeIcon icon={faSort} />
            </button>
          </Tooltip>
          <Tooltip content={"Sort by damage rating"}>
            <button className="sort-button" onClick={(e) => sortDamage()}>
              Damage <FontAwesomeIcon icon={faSort} />
            </button>
          </Tooltip>
          <Tooltip content={"Sort by support rating"}>
            <button className="sort-button" onClick={(e) => sortSupport()}>
              Support <FontAwesomeIcon icon={faSort} />
            </button>
          </Tooltip>
          <Tooltip content={"Sort by combined rating"}>
            <button className="sort-button" onClick={(e) => sortFlex()}>
              Flex <FontAwesomeIcon icon={faSort} />
            </button>
          </Tooltip>
          <Tooltip content={"Refreshes all accounts"}>
            <button className="sort-button" onClick={(e) => refreshAll()}>
              Refresh All <FontAwesomeIcon icon={faRefresh} />
            </button>
          </Tooltip>

          {allowDelete == true && (
            <Tooltip content={"Deletes all accounts"}>
              <button
                className="sort-button deleteAll-button"
                onClick={(e) => deleteAll()}
              >
                Delete All <FontAwesomeIcon icon={faClose} />
              </button>
            </Tooltip>
          )}

          {allowDelete == false && (
            <Tooltip content={"Deletes all accounts"}>
              <button
                className="sort-button deleteAll-button"
                disabled
                onClick={(e) => deleteAll()}
              >
                Delete All <FontAwesomeIcon icon={faClose} />
              </button>
            </Tooltip>
          )}

          {allowDelete == true && (
            <Tooltip content={"Lock deletion"}>
              <button
                className="sort-button deleteAll-button"
                onClick={(e) => toggleDelete()}
              >
                <FontAwesomeIcon icon={faLockOpen} />
              </button>
            </Tooltip>
          )}

          {allowDelete == false && (
            <Tooltip content={"Unlock deletion"}>
              <button
                className="sort-button deleteAll-button"
                onClick={(e) => toggleDelete()}
              >
                <FontAwesomeIcon icon={faLock} />
              </button>
            </Tooltip>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "left",
          }}
        >
          {showAccounts.map((account, id) => (
            <div
              className="card"
              style={{
                width: "310px",
                margin: "3px",
                borderRadius: "10px",
              }}
              id={id}
              key={id}
            >
              {/* <img class="card-img-top" src={account.profileIcon}></img> */}
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <img
                      className="player-icon"
                      src={account.profileIcon}
                      width="40"
                    ></img>
                    <h5 className="player-name card-header">{account.name}</h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Tooltip content={"Refresh account"}>
                      <button
                        className="refresh-button"
                        onClick={() => updateAccount(id)}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faRefresh} />{" "}
                      </button>
                    </Tooltip>

                    <Tooltip content={"Delete account"}>
                      <button
                        className="delete-button"
                        onClick={() => removeAccount(id)}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faClose} />{" "}
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <Tooltip
                  content={moment(account.lastUpdated).format(
                    "MMM Do YYYY h:mm:ss a"
                  )}
                >
                  <p className="card-text" style={{ color: "darkgrey" }}>
                    Last Updated: {moment(account.lastUpdated).fromNow()}
                  </p>
                </Tooltip>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {account.custom == true && (
                    <>
                      <button
                        className="rank"
                        onClick={() => rankDown(id, TANK)}
                      >
                        <FontAwesomeIcon icon={faChevronDown} />
                      </button>
                      <button className="rank" onClick={() => rankUp(id, TANK)}>
                        <FontAwesomeIcon icon={faChevronUp} />
                      </button>
                    </>
                  )}
                  <p className="card-text">Tank: {account.tankSR}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {account.custom == true && (
                    <>
                      <button
                        className="rank"
                        onClick={() => rankDown(id, DAMAGE)}
                      >
                        <FontAwesomeIcon icon={faChevronDown} />
                      </button>
                      <button
                        className="rank"
                        onClick={() => rankUp(id, DAMAGE)}
                      >
                        <FontAwesomeIcon icon={faChevronUp} />
                      </button>
                    </>
                  )}

                  <p className="card-text">Damage: {account.damageSR}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {account.custom == true && (
                    <>
                      <button
                        className="rank"
                        onClick={() => rankDown(id, SUPPORT)}
                      >
                        <FontAwesomeIcon icon={faChevronDown} />
                      </button>
                      <button
                        className="rank"
                        onClick={() => rankUp(id, SUPPORT)}
                      >
                        <FontAwesomeIcon icon={faChevronUp} />
                      </button>
                    </>
                  )}
                  <p className="card-text">Support: {account.supportSR}</p>
                </div>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={account.url}
                  className="card-link"
                >
                  View online
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
