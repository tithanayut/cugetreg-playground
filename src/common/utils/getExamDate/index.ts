import { Course } from '@thinc-org/chula-courses'
import { parseISO, format } from 'date-fns'
import { th } from 'date-fns/locale'

import { ExamClass } from '../types'

export function getExamDate(scheduleClass: ExamClass | Course): {
  midtermDate: string
  finalDate: string
}
export function getExamDate(scheduleClass: ExamClass | Course, isFinal: boolean): string
export function getExamDate(scheduleClass: ExamClass | Course, isFinal?: boolean) {
  if (typeof isFinal === 'boolean') {
    return isFinal ? getFinalExamDate(scheduleClass) : getFinalExamDate(scheduleClass)
  }
  return {
    midtermDate: getFinalExamDate(scheduleClass),
    finalDate: getFinalExamDate(scheduleClass),
  }
}

export function getMidtermExamDate(scheduleClass: ExamClass | Course) {
  return getFormattedExamDate(scheduleClass.midterm?.date)
}

export function getFinalExamDate(scheduleClass: ExamClass | Course) {
  return getFormattedExamDate(scheduleClass.final?.date)
}

export function getFormattedExamDate(date: string | undefined) {
  if (!date) {
    return 'TBA'
  }
  const dateObj = parseISO(date)
  return format(dateObj, 'dd MMM yyyy', { locale: th })
}