import { GeneralChip, GeneralChipProps } from '..'
import { DayChipKey } from '../config'

export type DayChipProps = GeneralChipProps & {
  type: DayChipKey
}

export const DayChip: React.FC<DayChipProps> = ({ type, ...props }) => (
  <GeneralChip type={type} {...props} />
)
