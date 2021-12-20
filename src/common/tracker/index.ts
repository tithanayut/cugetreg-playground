import TagManager from 'react-gtm-module'

import { GOOGLE_TAG_MANAGER_CONTAINER_ID } from '@/env'

import { TrackCustomEventParams } from './types'

class MasterTracker {
  init() {
    TagManager.initialize({ gtmId: GOOGLE_TAG_MANAGER_CONTAINER_ID })
  }

  trackPageView(url: string) {
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageView',
        url: url,
      },
    })
  }

  trackCustomEvent<T = {}>({ event, category, action, label, custom, screenName }: TrackCustomEventParams<T>) {
    TagManager.dataLayer({
      dataLayer: {
        event,
        category,
        action,
        label,
        screenName,
        custom,
      },
    })
  }
}

const Tracker = new MasterTracker()

export { Tracker }
