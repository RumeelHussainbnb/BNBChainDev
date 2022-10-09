import '../style.css';
import PlausibleProvider from 'next-plausible';

import { AppWrapper } from '../context/AppContext';
import '@solana/wallet-adapter-react-ui/styles.css';

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  return library
}

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <PlausibleProvider domain="soldev.app" trackOutboundLinks={true}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <AppWrapper>
              <Component {...pageProps} />
            </AppWrapper>
          </Web3ReactProvider>
      </PlausibleProvider>
    </div>
  );
}
