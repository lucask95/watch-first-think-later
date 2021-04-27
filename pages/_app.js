import "../styles/reset.css";
import "../styles/global.css";
import { Provider } from "next-auth/client";
import { useEffect } from "react";
import theme from "../util/theme";
import { ThemeProvider } from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ChakraProvider>
    </Provider>
  );
}
