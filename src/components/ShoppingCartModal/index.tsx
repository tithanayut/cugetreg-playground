import { useContext } from 'react'
import { Dialog, IconButton, DialogTitle, makeStyles } from '@material-ui/core'
import { ImCross } from 'react-icons/im'
import ShoppingPanel from '@/components/ShoppingPanel'
import { ShoppingCartModalContext } from '@/context/ShoppingCartModal'

const modalStyle = makeStyles(() => ({
  closeBtn: {
    position: 'absolute',
    right: '1em',
    top: '0em',
  },
}))

export function ShoppingCartModal() {
  const { isOpen, onClose } = useContext(ShoppingCartModalContext)
  const modalSty = modalStyle()
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        รายวิชาที่ถูกเลือก{' '}
        <IconButton onClick={onClose} className={modalSty.closeBtn}>
          <ImCross />
        </IconButton>
      </DialogTitle>
      <ShoppingPanel />
    </Dialog>
  )
}