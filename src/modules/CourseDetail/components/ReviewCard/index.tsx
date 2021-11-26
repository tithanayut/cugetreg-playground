import { Stack, useTheme } from '@mui/material'
import { useContext } from 'react'
import { MdFlag, MdOutlineStar } from 'react-icons/md'

import { GeneralChip } from '@/common/components/Chips'
import { ReviewInteraction } from '@/common/types/reviews'
import { getSemesterName } from '@/common/utils/getSemesterName'
import { ReviewReaction } from '@/modules/CourseDetail/components/ReviewReaction'
import { ReviewContext } from '@/modules/CourseDetail/context/Review'

import { Card, CardTerm, CardContent, CardRating, CardMaxRating } from './styled'
import { ReviewCardProps } from './types'

export const ReviewCard: React.FC<ReviewCardProps> = (data) => {
  const theme = useTheme()

  const term = `${data.academicYear} ${getSemesterName(data.semester)}`

  const { setInteraction, reportReview } = useContext(ReviewContext)

  const handleLikeClick = () => {
    setInteraction(data._id, ReviewInteraction.Like)
  }

  const handleDislikeClick = () => {
    setInteraction(data._id, ReviewInteraction.Dislike)
  }

  const handleReportClick = () => {
    reportReview(data._id)
  }

  return (
    <Card direction="column" spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center">
          <CardTerm>{term}</CardTerm>
          {data.pending && <GeneralChip type="reviewPending" />}
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <MdOutlineStar size={20} />
          <CardRating>{data.rating / 2}</CardRating>
          <CardMaxRating>จาก 5</CardMaxRating>
        </Stack>
      </Stack>
      <CardContent>{data.content}</CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={4}>
          <ReviewReaction
            type={ReviewInteraction.Like}
            pressed={data.myInteraction === ReviewInteraction.Like}
            reactionCount={data.likeCount}
            onClick={handleLikeClick}
          />
          <ReviewReaction
            type={ReviewInteraction.Dislike}
            pressed={data.myInteraction === ReviewInteraction.Dislike}
            reactionCount={data.dislikeCount}
            onClick={handleDislikeClick}
          />
        </Stack>
        <MdFlag size={24} color={theme.palette.primaryRange[50]} onClick={handleReportClick} />
      </Stack>
    </Card>
  )
}
