import RootLayOut from "@/components/RootLayOut";
import  store, { persistor }  from "@/lib/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SessionProvider } from 'next-auth/react';



export default function App({ Component,  pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <div className="font-bodyFont bg-gray-300 min-w-[30rem]">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>

        <SessionProvider session={session}>
          <div className="font-bodyFont bg-gray-300 min-w-[30rem]">

      <RootLayOut>

      <Component {...pageProps} />

      </RootLayOut>
          </div>
        </SessionProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}
