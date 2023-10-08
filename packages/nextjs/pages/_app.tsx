import { useEffect } from "react";
import type { AppProps } from "next/app";
import { factoryAddress } from "../lib/constants";
// import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { CeloAlfajoresTestnet } from "@thirdweb-dev/chains";
import { ThirdwebProvider, localWallet, smartWallet } from "@thirdweb-dev/react";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
// import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
// import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
// import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

const personalWallet = localWallet(); // or any other wallet

export const smartWalletConfig = smartWallet(personalWallet, {
  factoryAddress: factoryAddress,
  gasless: true,
});

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  /* tslint:disable-next-line */
  // const [isDarkTheme, setIsDarkTheme] = useState(true);
  // const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  // useEffect(() => {
  //   setIsDarkTheme(isDarkMode);
  // }, [isDarkMode]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <NextNProgress />
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        activeChain={CeloAlfajoresTestnet}
        supportedWallets={[smartWalletConfig]}
      >
        {/* <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID} activeChain={CeloAlfajoresTestnet}> */}
        {/* <RainbowKitProvider
          chains={appChains.chains}
          avatar={BlockieAvatar}
          theme={isDarkTheme ? darkTheme() : lightTheme()}
        > */}
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="relative flex flex-col flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        <Toaster />
        {/* </RainbowKitProvider> */}
      </ThirdwebProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
