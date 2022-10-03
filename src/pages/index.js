import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <input id="pleayer-search-name" type="search" placeholder="PizzaLawyer#11545"></input>
      <button id="pleayer-search-button">Search</button>
    </div>
  )
}
