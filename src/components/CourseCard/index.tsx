import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { Course } from '@thinc-org/chula-courses'
import { Add, Star } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { days } from './const'
import { useDisclosure } from '@/hooks/useDisclosure'
import { Select } from '../Select'
import { useCourseCard } from './useCourseCard'
import GenEdChip from '../Chips/catagories/GenEdChip'
import DayChip from '../Chips/catagories/DayChip'
import { PropsWithChildren } from 'react'

export interface CourseCardProps {
  course: Course
  rating?: number
}

export const CourseCard = (props: CourseCardProps) => {
  const { course, rating } = props
  const { t } = useTranslation('courseCard')
  const { isOpen: isExpanded, onToggle } = useDisclosure()

  const {
    isGenEd,
    classDays,
    courseCapacity,
    setSectionNumber,
    selectedSection,
    teachers,
    sectionNumbers,
    selectedSectionNumber,
  } = useCourseCard(course)

  const CardHeading = (
    <CardHeader
      sx={{ p: 4, pb: 0, pt: 3 }}
      title={
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant="h5">
                {course.courseNo} {course.abbrName}
              </Typography>
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
          {isGenEd && (
            <Stack direction="row" spacing={0.25} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Star />
              <Typography variant="h6">{rating}</Typography>
            </Stack>
          )}
        </Box>
      }
      action={
        <IconButton onClick={onToggle} color="primary">
          {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      }
    />
  )

  const CardDiscription = (
    <Grid container spacing={3}>
      <Grid item xs={6} sm="auto">
        <Stack spacing={0.5}>
          <Caption>{t('classDay')}</Caption>
          <div>
            {classDays.map((day) => (
              <DayChip type={day} key={day} sx={{ mb: 0.5, mr: 0.5 }} />
            ))}
          </div>
        </Stack>
      </Grid>
      {isGenEd && (
        <Grid item xs={6} sm="auto" sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <Stack spacing={0.5} alignItems="flex-start">
            <Caption>{t('genEd')}</Caption>
            <GenEdChip type={course.genEdType} />
          </Stack>
        </Grid>
      )}
      <Grid item xs={6} sm="auto">
        <Stack spacing={0.5}>
          {isGenEd ? (
            <>
              <Caption>{t('totalCapacity')}</Caption>
              <Typography variant="body1">
                GenEd {courseCapacity.current}/{courseCapacity.max}
              </Typography>
            </>
          ) : (
            <>
              <Caption>{t('condition')}</Caption>
              <Typography variant="body1">{course.courseCondition}</Typography>
            </>
          )}
        </Stack>
      </Grid>
      {isGenEd && (
        <Grid item xs={6} sm="auto" sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <Stack spacing={0.5}>
            <Caption>{t('rating')}</Caption>
            <Stack direction="row" spacing={0.25} color="primaryRange.100">
              <Star />
              <Typography variant="h6">{rating}</Typography>
            </Stack>
          </Stack>
        </Grid>
      )}
    </Grid>
  )

  const CardHiddenDescription = (
    <Grid container spacing={3} sx={{ mt: 0 }}>
      <Grid item xs={6} sm="auto" sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Select
          items={sectionNumbers}
          value={selectedSectionNumber}
          onChange={(e) => setSectionNumber(e.target.value as string)}
          name="sectionNo"
        />
      </Grid>
      <Grid item xs={6} sm="auto">
        <Stack spacing={0.5}>
          <Caption>{t('teacher')}</Caption>
          <Typography variant="body1" sx={{ maxWidth: '15ch' }}>
            {teachers.join(', ')}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={6} sm="auto">
        <Stack spacing={0.5}>
          <Caption>{t('time')}</Caption>
          <Stack>
            {selectedSection.classes.map((sectionClass, index) => (
              <Typography variant="body1" key={`${selectedSection.sectionNo}.${index}`}>
                {days[sectionClass.dayOfWeek]} {sectionClass.period.start}-{sectionClass.period.end}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6} sm="auto">
        <Stack spacing={0.5}>
          <Caption>{t('classRoom')}</Caption>
          <Stack>
            {selectedSection.classes.map((sectionClass, index) => (
              <Typography variant="body1" key={`${selectedSection.sectionNo}.${index}`}>
                {sectionClass.building} {sectionClass.room}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6} sm="auto">
        <Stack spacing={0.5}>
          <Caption>{t('note')}</Caption>
          <Typography variant="body1">{selectedSection.note}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={6} sm="auto">
        <Stack spacing={0.5}>
          <Caption>{t('capacity')}</Caption>
          <Typography variant="body1">
            {selectedSection.capacity.current}/{selectedSection.capacity.max}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )

  const CardSideActions = (
    <Stack
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexBasis: 'auto',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        ml: 2,
      }}
    >
      <Collapse in={isExpanded}>
        <Select
          items={sectionNumbers}
          value={selectedSectionNumber}
          onChange={(e) => setSectionNumber(e.target.value as string)}
          name="sectionNo"
        />
      </Collapse>
      <Button startIcon={<Add />} color="primary" variant="contained" fullWidth disableElevation>
        {t('select')}
      </Button>
    </Stack>
  )

  const CardBody = (
    <CardContent sx={{ px: 4, py: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
        <Stack>
          {CardDiscription}
          <Collapse in={isExpanded}>{CardHiddenDescription}</Collapse>
        </Stack>
        {CardSideActions}
      </Box>
    </CardContent>
  )

  const CardFooter = (
    <CardActions sx={{ p: 4, pt: 0, display: { sm: 'none' } }}>
      <Button startIcon={<Add />} color="primary" variant="contained" fullWidth disableElevation>
        {t('select')}
      </Button>
    </CardActions>
  )

  return (
    <Card variant="outlined">
      {CardHeading}
      {CardBody}
      {CardFooter}
    </Card>
  )
}

export const Caption = ({ children }: PropsWithChildren<{}>) => (
  <Typography variant="caption" color="primaryRange.100">
    {children}
  </Typography>
)