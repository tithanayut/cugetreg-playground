import React from 'react'
import styled from '@emotion/styled'
import { Button, ButtonProps } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import TableChartIcon from '@material-ui/icons/TableChart'
import { useTranslation } from 'react-i18next'
import { ShoppingState } from '@/components/ShoppingPanel/hooks'

const ErrorButton = styled(Button)`
  color: ${({ theme }) => theme.palette.error.main};
  border-color: ${({ theme }) => theme.palette.error.main};
`

export interface ActionButtonProps extends ButtonProps {
  status: ShoppingState
  selectedCoursesNumnber: number
  removeAllSelectedCourses: () => void
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  selectedCoursesNumnber,
  removeAllSelectedCourses,
  status,
  ...props
}) => {
  const { t } = useTranslation('shoppingPanel')

  const defaultButtonProps: ButtonProps = {
    ...props,
    fullWidth: true,
    color: 'primary',
    variant: 'contained',
  }

  if (status === ShoppingState.Default) {
    return (
      <Button {...defaultButtonProps} startIcon={<TableChartIcon />}>
        {t('makeSchedule.default')}
      </Button>
    )
  }
  return (
    <ErrorButton
      {...defaultButtonProps}
      startIcon={<DeleteIcon />}
      variant="outlined"
      onClick={removeAllSelectedCourses}
    >
      {t('makeSchedule.delete', { number: selectedCoursesNumnber })}
    </ErrorButton>
  )
}