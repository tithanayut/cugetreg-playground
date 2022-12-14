import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useLog } from '@web/common/context/Analytics/hooks/useLog'

interface TrackPageChangeProps {
  children: React.ReactNode
}

export function TrackPageChange({ children }: TrackPageChangeProps) {
  const { log } = useLog('visit')
  const router = useRouter()

  useEffect(() => {
    log()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  return <>{children}</>
}
