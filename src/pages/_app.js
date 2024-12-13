import "@/styles/globals.css";

import { ThemeProvider, withAuthenticator } from "@aws-amplify/ui-react";
import config from "../aws-exports";
import { Amplify } from "aws-amplify";
import { NavBarHeader, NavBarHeader2, studioTheme } from "@/ui-components";

import "@aws-amplify/ui-react/styles.css";

Amplify.configure(config);

import { signOut } from 'aws-amplify/auth';

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={studioTheme}>
      <NavBarHeader width={"100%"}/>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default withAuthenticator(App)