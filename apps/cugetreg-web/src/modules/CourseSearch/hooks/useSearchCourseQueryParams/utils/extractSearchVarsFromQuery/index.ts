import { DayOfWeek, GenEdType } from '@thinc-org/chula-courses'

import { CourseGroup } from '@web/common/hooks/useCourseGroup/types'
import { SearchCourseVars } from '@web/services/apollo/query/searchCourse'

import { QueryParams } from '../../types'
import { removeUndefinedValue } from '../removeUndefinedValue'

export function extractSearchVarsFromQuery(
  query: QueryParams,
  courseGroup: CourseGroup
): SearchCourseVars {
  const { keyword, genEdTypes, dayOfWeeks, startTime, endTime } = query

  const genEdTypeArray = genEdTypes ? genEdTypes.split(',') : undefined
  const dayOfWeekArray = dayOfWeeks ? dayOfWeeks.split(',') : undefined

  const filter = removeUndefinedValue({
    keyword: keyword ? keyword : undefined,
    genEdTypes: genEdTypeArray ? (genEdTypeArray as GenEdType[]) : undefined,
    dayOfWeeks: dayOfWeekArray ? (dayOfWeekArray as DayOfWeek[]) : undefined,
    periodRange:
      startTime && endTime
        ? {
            start: startTime,
            end: endTime,
          }
        : undefined,
  })

  return { filter, courseGroup }
}
