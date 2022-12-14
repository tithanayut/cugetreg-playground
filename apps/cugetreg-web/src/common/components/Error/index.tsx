import { Box, BoxProps, css, styled } from '@mui/material'

export interface ErrorProps extends BoxProps {
  message?: string
  fullWidth?: boolean
}

interface ContainerProps {
  $fullwidth?: boolean
}

const Container = styled(Box)<ContainerProps>`
  ${({ $fullwidth }) =>
    $fullwidth ??
    css`
      width: 100%;
    `}
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const Error: React.FC<ErrorProps> = ({ fullWidth = false, message }) => {
  return (
    <Container $fullwidth={fullWidth} mr="auto">
      {message}
    </Container>
  )
}
