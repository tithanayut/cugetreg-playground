import { useEffect } from 'react'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ThemeProvider, CssBaseline, useMediaQuery } from '@material-ui/core'
import Head from 'next/head'

import '@/styles/globals.css'
import '@/i18n'
import { darkTheme, lightTheme } from '@/configs/theme'
import { TopBar } from '@/components/TopBar'
import { Container } from '@/components/Container'
import env from '@/utils/env/macro'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { ApolloProvider } from '@apollo/client'

function removeElement(id: string) {
  const element = document.getElementById(id)
  element?.parentElement?.removeChild(element)
}

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps, forceDark }: AppProps) {
  const prefersDarkMode =
    env.features.darkTheme &&
    // features.darkTheme is a constant
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMediaQuery('(prefers-color-scheme: dark)', {
      noSsr: true,
    })

  useEffect(() => {
    removeElement('jss-server-side')
    if (env.features.darkTheme) {
      removeElement('cgr-dark')
    }
  })

  return (
    <>
      <Head>
        <title>CU Get Reg</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={prefersDarkMode || forceDark ? darkTheme : lightTheme}>
            <CssBaseline />
            <TopBar />
            <Container>
              <Component {...pageProps} />
            </Container>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
