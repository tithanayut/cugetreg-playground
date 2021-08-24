import { CardHeader, Grid, IconButton, Link, Typography } from '@material-ui/core'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import { useTranslation } from 'react-i18next'

import { useCourseGroup } from '@/common/hooks/useCourseGroup'
import GenEdChip from '@/components/Chips/catagories/GenEdChip'
import { Flex } from '@/components/Flex'
import { Analytics } from '@/context/Analytics/components/Analytics'
import { LinkWithAnalytics } from '@/context/Analytics/components/LinkWithAnalytics'
import { COURSE_TITLE, EXPAND_BUTTON } from '@/context/Analytics/components/const'

import { useCourseCardContext } from '../useCourseCard'

interface CardHeadingProps {
  isExpanded: boolean
  onToggle: () => void
}

export function CardHeading({ isExpanded, onToggle }: CardHeadingProps) {
  const { t } = useTranslation('courseCard')
  const { course, isGenEd } = useCourseCardContext()
  const { studyProgram } = useCourseGroup()

  return (
    <CardHeader
      sx={{ p: 4, pb: 0, pt: 3 }}
      title={
        <Flex justify="space-between">
          <Grid container spacing={1}>
            <Grid item>
              <LinkWithAnalytics
                href={`/${studyProgram}/courses/${course.courseNo}`}
                passHref
                elementName={COURSE_TITLE}
                elementId={course.courseNo}
              >
                <Typography variant="h5" color="primaryRange.500" component={Link}>
                  {course.courseNo} {course.abbrName}
                </Typography>
              </LinkWithAnalytics>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="primaryRange.100">
                {t('credit', { credit: course.credit })}
              </Typography>
            </Grid>
            {isGenEd && (
              <Grid item>
                <GenEdChip sx={{ display: { xs: 'none', sm: 'inline-flex' } }} type={course.genEdType} />
              </Grid>
            )}
          </Grid>
          {/* rating is not implemented yet */}
          {/* {isGenEd && (
            <Stack direction="row" spacing={0.25} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Star />
              <Typography variant="h6">{rating}</Typography>
            </Stack>
          )} */}
        </Flex>
      }
      action={
        <Analytics elementName={EXPAND_BUTTON} elementId={course.courseNo}>
          <IconButton onClick={onToggle} color="primary">
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Analytics>
      }
    />
  )
}
