// src\types\react-gtm-module.d.ts
declare module 'react-gtm-module' {
  interface TagManagerArgs {
    gtmId: string
    auth?: string
    preview?: string
    dataLayerName?: string
    dataLayer?: object
  }

  const TagManager: {
    initialize: (args: TagManagerArgs) => void
    dataLayer: {
      push: (data: object) => void
    }
  }

  export default TagManager
}