import { CircularProgress, styled } from '@mui/material'

export interface LoadingProps {
  loading: boolean
}

const Container = styled('div')`
  margin: ${({ theme }) => theme.spacing(2, 'auto', 0, 'auto')};
  width: 100%;
  min-height: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const Loading: React.FC<LoadingProps> = ({ loading }) => {
  if (!loading) return <Container />

  return (
    <Container>
      <CircularProgress color="primary" disableShrink sx={{ animationDuration: '500ms' }} />
    </Container>
  )
}
