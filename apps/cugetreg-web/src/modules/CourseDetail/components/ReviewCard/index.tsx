import { MdDelete, MdEdit, MdOutlineStar } from 'react-icons/md'

import { IconButton, Stack, useTheme } from '@mui/material'
import DOMPurify from 'isomorphic-dompurify'

import { GeneralChip } from '@web/common/components/Chips'
import { OtherChipKey } from '@web/common/components/Chips/config'
import { HighlightHTML } from '@web/common/components/HighlightHTML'
import { ReviewInteractionType, ReviewStatus } from '@web/common/types/reviews'
import { getSemesterName } from '@web/common/utils/getSemesterName'
import { scrollToReviewForm } from '@web/modules/CourseDetail/components/ReviewForm/functions'

import { useReviewContext } from '../../context/Review'
import { ReviewReaction } from '../ReviewReaction'
import { Card, CardMaxRating, CardRating, CardRejectedMessage, CardTerm } from './styled'
import { ReviewCardProps } from './types'

const getChipType = (status: ReviewStatus): OtherChipKey | null => {
  switch (status) {
    case ReviewStatus.Pending:
      return 'reviewPending'
    case ReviewStatus.Rejected:
      return 'reviewRejected'
    default:
      return null
  }
}

export const ReviewCard: React.FC<ReviewCardProps> = (data) => {
  const theme = useTheme()
  const actionIconProps = {
    size: 24,
    color: theme.palette.primaryRange[50],
  }

  const term = `${data.academicYear} ${getSemesterName(data.semester)}`

  const chipType = getChipType(data.status)

  const { setInteraction, deleteMyReview, editMyReview, formLoaded } = useReviewContext()

  const handleLikeClick = () => {
    setInteraction(data._id, ReviewInteractionType.Like)
  }

  const handleDislikeClick = () => {
    setInteraction(data._id, ReviewInteractionType.Dislike)
  }

  const handleDeleteClick = () => {
    deleteMyReview(data._id)
  }

  const handleEditClick = () => {
    scrollToReviewForm()
    editMyReview(data._id)
  }

  return (
    <Card direction="column" spacing={2} pending={data.status !== ReviewStatus.Approved}>
      <Stack direction="row" justifyContent="space-between" gap={1} flexWrap="wrap">
        <Stack direction="row" spacing={2} alignItems="center">
          <CardTerm>{term}</CardTerm>
          {chipType && <GeneralChip type={chipType} />}
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <MdOutlineStar size={20} />
          <CardRating>{data.rating / 2}</CardRating>
          <CardMaxRating>????????? 5</CardMaxRating>
        </Stack>
      </Stack>
      <HighlightHTML dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/** Left side */}
        {data.status === ReviewStatus.Rejected ? (
          <CardRejectedMessage>?????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????</CardRejectedMessage>
        ) : (
          <Stack direction="row" spacing={3}>
            <ReviewReaction
              type={ReviewInteractionType.Like}
              pressed={data.myInteraction === ReviewInteractionType.Like}
              reactionCount={data.likeCount}
              onClick={handleLikeClick}
            />
            <ReviewReaction
              type={ReviewInteractionType.Dislike}
              pressed={data.myInteraction === ReviewInteractionType.Dislike}
              reactionCount={data.dislikeCount}
              onClick={handleDislikeClick}
            />
          </Stack>
        )}

        {/** Right side */}
        {data.isOwner ? (
          <Stack direction="row" spacing={1} ml="auto">
            <IconButton size="small" onClick={handleEditClick} disabled={!formLoaded}>
              <MdEdit {...actionIconProps} />
            </IconButton>
            <IconButton size="small" onClick={handleDeleteClick}>
              <MdDelete {...actionIconProps} />
            </IconButton>
          </Stack>
        ) : (
          // <IconButton size="small" onClick={handleReportClick}>
          //   <MdFlag {...actionIconProps} />
          // </IconButton>
          <></>
        )}
      </Stack>
    </Card>
  )
}
