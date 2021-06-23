import styled from '@emotion/styled'
import { ExamCard, ExamClass } from '../ExamCard'

interface ExamScheduleProps {
  classes: ExamClass[]
  isFinal: boolean
}

const ExamContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ExamCardItem = styled(ExamCard)`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export function ExamList({ classes, isFinal }: ExamScheduleProps) {
  const ExamList = classes.map((class_, index) => {
    return <ExamCardItem isFinal={isFinal} key={class_.courseNo} scheduleClass={class_} order={index + 1} />
  })

  return <ExamContainer>{ExamList}</ExamContainer>
}