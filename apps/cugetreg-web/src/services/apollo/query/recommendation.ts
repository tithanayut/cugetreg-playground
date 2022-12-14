import { gql } from '@apollo/client'

import { CourseGroup } from '@web/common/hooks/useCourseGroup/types'

export interface CourseKey {
  semesterKey: CourseGroup
  courseNo: string
}

export interface RecommendationParam {
  req: {
    variant: string
    semesterKey: CourseGroup
    selectedCourses: CourseKey[]
  }
}

export interface RecommendationResponse {
  recommend: {
    courses: {
      courseNameEn: string
      key: CourseKey
    }[]
  }
}

export const RECOMMENDATION_QUERY = gql`
  query RecommendCourseText($req: CourseRecommendationRequest!) {
    recommend(req: $req) {
      courses {
        courseNameEn
        key {
          semesterKey {
            semester
            studyProgram
          }
          courseNo
        }
      }
    }
  }
`
