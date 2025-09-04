// File: pages/_app.js

import '../styles/globals.css'; // This line imports Tailwind CSS styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;