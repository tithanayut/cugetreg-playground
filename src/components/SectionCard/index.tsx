import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Course, Section } from '@thinc-org/chula-courses'
import { useTranslation } from 'react-i18next'
import GenEdChip from '../Chips/catagories/GenEdChip'
import { CustomButton } from '../common/CustomButton'
import { Caption } from '../CourseCard/components/Caption'
import { days } from '../CourseCard/const'
import { SectionStatus } from './components/SectionStatus'

interface SectionCardProps {
  section: Section
  course: Course
}

export const SectionCard = (props: SectionCardProps) => {
  const { section, course } = props
  const { t } = useTranslation('sectionCard')

  const SelectButton = (
    <CustomButton loading={false} startIcon={<Add />} color="primary" variant="contained" fullWidth disableElevation>
      {t('select')}
    </CustomButton>
  )

  return (
    <Card variant="outlined">
      <CardHeader
        sx={{ p: 4, pb: 0, pt: 3 }}
        title={
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
              <Typography variant="h5">{t('section', { sectionNo: section.sectionNo })}</Typography>
              {course.genEdType !== 'NO' && <GenEdChip type={course.genEdType} />}
            </Stack>
            <SectionStatus
              capacity={section.capacity}
              status={
                section.closed ? 'closed' : section.capacity.current === section.capacity.max ? 'full' : 'avialable'
              }
            />
          </Box>
        }
      />
      <CardContent sx={{ px: 4, py: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
          <Table
            sx={{
              width: { xs: '100%', sm: 'auto' },
              'td, th': { border: 0, p: 0 },
              'td ~ td, th ~ th': {
                pl: { xs: 2, sm: 5 },
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Caption>{t('teacher')}</Caption>
                </TableCell>
                <TableCell>
                  <Caption>{t('time')}</Caption>
                </TableCell>
                <TableCell>
                  <Caption>{t('classRoom')}</Caption>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {section.classes.map((sectionClass, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1" sx={{ maxWidth: '15ch' }}>
                      {sectionClass.teachers.join(', ')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" key={index}>
                      {days[sectionClass.dayOfWeek]} {sectionClass.period.start}-{sectionClass.period.end}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" key={index}>
                      {sectionClass.building} {sectionClass.room}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Stack
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'flex-end',
              flexBasis: 'auto',
              ml: 2,
            }}
          >
            {SelectButton}
          </Stack>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 4, pt: 0, display: { sm: 'none' } }}>{SelectButton}</CardActions>
    </Card>
  )
}
