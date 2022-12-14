import { IconType } from 'react-icons'

import { BlockToolbarButtonProps, MarkToolbarButtonProps } from '@udecode/plate-toolbar'

import { RichTextActionType, RichTextBlockType, RichTextMarkType } from '../../constants'

export interface ToolbarButtonProps extends MarkToolbarButtonProps, BlockToolbarButtonProps {
  id: string
  mode: 'mark' | 'block' | 'code_block' | 'list' | 'none'
  type: RichTextMarkType | RichTextBlockType | RichTextActionType
  icon: IconType
}
