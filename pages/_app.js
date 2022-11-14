import '@/styles/globals.css'
import '../styles/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
    
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    document.body.style.backgroundColor = "background-size: cover";
    document.body.style.backgroundImage = "url('https://images8.alphacoders.com/104/1049882.jpg')";

  }, []);

  return <Component {...pageProps} />;
}

export default MyApp