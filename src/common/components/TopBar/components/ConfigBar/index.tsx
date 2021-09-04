import { Typography } from '@material-ui/core'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

import { Analytics } from '@/common/context/Analytics/components/Analytics'
import { REPORT_PROBLEM, STUDY_PROGRAM_DROPDOWN } from '@/common/context/Analytics/constants'
import { useCourseGroup } from '@/common/hooks/useCourseGroup'
import { Spacer } from '@/components/Spacer'
import { sessionIdStore } from '@/store/sessionIdStore'

import { StudyProgramDropdown } from '../StudyProgramDropdown'
import { FlexContainer } from '../styled'
import { ConfigBarLayout, ConfigBarItem, ConfigBarItemLink } from './styled'

export const ConfigBar = observer(() => {
  const { t } = useTranslation('configBar')

  const { academicYear, semester } = useCourseGroup()

  const sessionId = sessionIdStore.sessionId
  const reportProblemLink = `https://airtable.com/shruwAAfn1763TgMU?prefill_Session_ID=${sessionId}`

  return (
    <ConfigBarLayout>
      <FlexContainer>
        <Spacer />
        <Analytics elementName={STUDY_PROGRAM_DROPDOWN}>{({ log }) => <StudyProgramDropdown log={log} />}</Analytics>
        <ConfigBarItem>
          <Typography variant="subtitle2">
            {academicYear}/{semester}
          </Typography>
        </ConfigBarItem>
        <Analytics elementName={REPORT_PROBLEM}>
          <ConfigBarItemLink href={reportProblemLink} target="_blank" rel="noreferrer">
            <Typography variant="subtitle2">{t('reportAProblem')}</Typography>
          </ConfigBarItemLink>
        </Analytics>
      </FlexContainer>
    </ConfigBarLayout>
  )
})
