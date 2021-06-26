import { getRedirectUrl } from '@/utils/network/auth'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { NavBarItem } from './NavBarItem'
import PersonIcon from '@material-ui/icons/Person'
import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import { ImWarning, ImGoogleDrive } from 'react-icons/im'
import { observer } from 'mobx-react'
import { gDriveStore, GDriveSyncState } from '@/store/gDriveState'
import { authStore } from '@/store/meStore'
import { useRouter } from 'next/router'

export const GDriveIndicator = observer(({ gdriveStore }: { gdriveStore: { gDriveState: GDriveSyncState } }) => {
  const mpr = new Map([
    [GDriveSyncState.IDLE, <></>],
    [
      GDriveSyncState.FAIL,
      <>
        <ImWarning size="2em" /> Can&apos;t connect to Google Drive. Data won&apos;t be saved
      </>,
    ],
    [
      GDriveSyncState.SYNCING,
      <>
        <CircularProgress />
      </>,
    ],
    [
      GDriveSyncState.SYNCED,
      <>
        <ImGoogleDrive size="2em" />
      </>,
    ],
    [
      GDriveSyncState.SYNCERR,
      <>
        <ImWarning size="2em" /> Sync failed. Data won&apos;t be saved
      </>,
    ],
  ])
  return <Box>{mpr.get(gdriveStore.gDriveState)}</Box>
})

export default observer(function UserButton() {
  const userName = authStore.auth?.firstName
  const router = useRouter()

  const onLogin = useCallback(() => {
    const uri = getRedirectUrl()
    router.push(uri)
  }, [])
  const onLogout = useCallback(() => authStore.clear(), [])

  const { t } = useTranslation()

  if (userName)
    return (
      <NavBarItem>
        <Grid margin="1em" container>
          <Grid item paddingLeft="1em">
            <GDriveIndicator gdriveStore={gDriveStore} />
          </Grid>
          <Grid padding="0.2em" item>
            <PersonIcon />
          </Grid>
          <Grid item>
            <Typography variant="h4">{userName}</Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={onLogout}>
          Logout
        </Button>
      </NavBarItem>
    )
  else return <NavBarItem onClick={onLogin}>{t('navBar:signin')}</NavBarItem>
})
