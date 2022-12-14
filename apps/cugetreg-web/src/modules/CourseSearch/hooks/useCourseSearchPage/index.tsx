import { useContext, useEffect, useState } from 'react'

import { useMediaQuery, useTheme } from '@mui/material'

import { ShoppingCartModalContext } from '@web/common/context/ShoppingCartModal'

export const useCourseSearchPage = () => {
  const [openFilterBar, setOpenFilterBar] = useState(false)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    setOpenFilterBar(isDesktop)
  }, [isDesktop])

  const { onOpen } = useContext(ShoppingCartModalContext)

  const toggleFilterBar = () => {
    setOpenFilterBar((open) => !open)
  }

  const handleCloseFilterBar = () => {
    setOpenFilterBar(false)
  }

  return { openFilterBar, toggleFilterBar, onOpen, handleCloseFilterBar }
}
