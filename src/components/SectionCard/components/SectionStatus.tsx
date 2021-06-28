import { Typography, TypographyProps } from '@material-ui/core'
import { Capacity } from '@thinc-org/chula-courses'
import { useTranslation } from 'react-i18next'

export type AvailableStatus = 'avialable' | 'full' | 'closed'
export interface SectionStatusProps extends TypographyProps {
  status: AvailableStatus
  capacity: Capacity
}

const style = {
  avialable: {
    backgroundColor: 'highlight.green.300',
    color: 'highlight.green.700',
  },
  full: {
    backgroundColor: 'highlight.red.300',
    color: 'highlight.red.700',
  },
  closed: {
    backgroundColor: 'highlight.red.500',
    color: 'white',
  },
}

export const SectionStatus = (props: SectionStatusProps) => {
  const { status, capacity, ...rest } = props
  const { t } = useTranslation('sectionCard')
  return (
    <Typography
      variant="h6"
      sx={{
        px: 2,
        py: 0.5,
        ml: 1,
        borderRadius: 1,
        whiteSpace: 'nowrap',
        height: 'fit-content',
        ...style[status],
        ...rest.sx,
      }}
    >
      {t(status, capacity)}
    </Typography>
  )
}
