import { Course } from '@thinc-org/chula-courses'
import { useTranslation } from 'react-i18next'
import { useStyles, Column, ColumnHeader } from './styles'

interface PropTypes {
  courses?: Course[]
}

export function CR11({ courses }: PropTypes) {
  const classes = useStyles()
  const totalCredit = courses?.reduce((accumulator, course) => accumulator + course.credit, 0)
  const { t } = useTranslation('cr11')

  const Items = courses?.map((course, i) => {
    return (
      <tr key={course.courseNo}>
        <Column variant="body1">{i + 1}</Column>
        <Column variant="body1">{course.courseNo}</Column>
        <Column variant="body1">{course.abbrName}</Column>
        <Column variant="body1">
          {course.sections[0].sectionNo} {t('only')}
        </Column>
        <Column variant="body1">{course.credit}.0</Column>
      </tr>
    )
  })

  return (
    <table className={classes.table}>
      <tr className={classes.header}>
        <ColumnHeader variant="h6">{t('order')}</ColumnHeader>
        <ColumnHeader variant="h6">
          <span className={classes.desktop}>{t('courseNo')}</span>
          <span className={classes.mobile}>{t('courseNoMobile')}</span>
        </ColumnHeader>
        <ColumnHeader variant="h6">{t('abbrName')}</ColumnHeader>
        <ColumnHeader variant="h6">{t('section')}</ColumnHeader>
        <ColumnHeader variant="h6">
          <span className={classes.desktop}>{t('credit')}</span>
          <span className={classes.mobile}>{t('creditMobile')}</span>
        </ColumnHeader>
      </tr>
      {Items}
      <tr className={classes.totalCredit}>
        <td></td>
        <td></td>
        <td></td>
        <Column variant="h6">{t('totalCredit')}</Column>
        <Column variant="h6">{totalCredit}.0</Column>
      </tr>
    </table>
  )
}
