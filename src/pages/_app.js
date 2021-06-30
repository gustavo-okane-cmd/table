import React from "react";
import App from "next/app";
import Head from "next/head";
// import { ThemeProvider } from '@material-ui/styles';
import { ThemeProvider } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { StyledEngineProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/core/styles";
// import { wrapper } from "../store/store";
import theme from "../theme";

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Head>
                    <title>Tabela com colunas</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                </Head>
                <StylesProvider injectFirst>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </StylesProvider>
            </>
        );
    }
}

export default MyApp;
