import { ApolloProvider } from '@apollo/client'
import { ThemeProvider, useMediaQuery } from '@material-ui/core'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import React from 'react'

import { AnalyticsProvider } from '@/common/context/Analytics'
import { useAnalytics } from '@/common/context/Analytics/hooks/useAnalytics'
import { darkTheme, lightTheme } from '@/configs/theme'
import { ShoppingCartModalContextProvider } from '@/modules/App/context/ShoppingCartModal'
import { SnackbarContextProvider } from '@/modules/App/context/Snackbar'
import { client } from '@/services/apollo'
import env from '@/utils/env/macro'

interface AppProviderProps {
  children: React.ReactNode
  forceDark: boolean
}

export function AppProvider({ children, forceDark }: AppProviderProps) {
  const prefersDarkMode =
    env.features.darkTheme &&
    // features.darkTheme is a constant
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMediaQuery('(prefers-color-scheme: dark)', {
      noSsr: true,
    })

  const { addEvent } = useAnalytics()

  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AnalyticsProvider value={{ addEvent }}>
          <SnackbarContextProvider>
            <ThemeProvider theme={prefersDarkMode || forceDark ? darkTheme : lightTheme}>
              <ShoppingCartModalContextProvider>{children}</ShoppingCartModalContextProvider>
            </ThemeProvider>
          </SnackbarContextProvider>
        </AnalyticsProvider>
      </LocalizationProvider>
    </ApolloProvider>
  )
}