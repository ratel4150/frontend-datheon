// src/components/landing/ClientScripts.tsx
'use client'

import { useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel'
import ReactGA from 'react-ga4'
import TagManager from 'react-gtm-module'
export default function ClientScripts() {
  useEffect(() => {
    


    // --- Facebook Pixel ---
    ReactPixel.init('1270008318053841')
    ReactPixel.pageView()

    // --- Google Analytics 4 ---
    ReactGA.initialize('G-93CPBCE62D')
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname })

        // --- Google Tag Manager (GTM) ---
    TagManager.initialize({ gtmId: 'GTM-K8HG4C55' })

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = 'zsiqscript'
    script.defer = true
    script.innerHTML = `
      var $zoho=$zoho || {};
      $zoho.salesiq = $zoho.salesiq || {
        widgetcode:"siq47f05f818f0afe57e009eb6710ff838404cbc1d79270985759bb59f04a3b66c8",
        values:{}, ready:function(){}
      };
    `
    document.body.appendChild(script)

    const secondScript = document.createElement('script')
    secondScript.src = 'https://salesiq.zoho.com/widget'
    secondScript.async = true
    document.body.appendChild(secondScript)

    return () => {
      document.body.removeChild(script)
      document.body.removeChild(secondScript)
    }
  }, [])

  return null
}
