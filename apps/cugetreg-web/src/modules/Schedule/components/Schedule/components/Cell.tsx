import { PropsWithChildren } from 'react'

import { styled } from '@mui/material'

import { useDimensions } from '../dimensions'

type CellProps = PropsWithChildren<{
  x: number
  y: number
}>

const CellLayout = styled('div')(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.primaryRange[10],
  textAlign: 'center',
  padding: '0.125em',
}))

export function Cell({ x, y, children }: CellProps) {
  const { getCell } = useDimensions()
  return <CellLayout style={{ ...getCell(y, x) }}>{children}</CellLayout>
}
