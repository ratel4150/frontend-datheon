// File: frontend-datheon/src/app/(lang)/[lang]/landing/page.tsx
// src\app\(lang)\[lang]\landing\page.tsx

import {  Box } from '@mui/material'

import OurServices from '../../../../../components/landing/OurSrvices'
import WorkProcess from '../../../../../components/landing/WorkProcess'
import Testimonials from '../../../../../components/landing/Testimonials'
import OurTeam from '../../../../../components/landing/OurTeam'
import OurSpecializedSectors from '../../../../../components/landing/OurSpecializedSectors'
import WhyChooseUs from '../../../../../components/landing/WhyChooseUs'
import Footer from '../../../../../components/landing/Footer'
import { HeroResponsive } from '../../../../../components/landing/HeroResponsive'
import { TechnologyEcosystem } from '../../../../../components/landing/Technologyecosystem'
import { SystemArchitecture } from '../../../../../components/landing/Systemarchitecture'


type Props = {
  params: Promise<{ lang: string }>
}



export default async function LandingPage({ params }: Props) {
  const { lang } = await params

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
      <HeroResponsive lang={lang} />
      <TechnologyEcosystem lang={lang} />
      <SystemArchitecture lang={lang} />
  
        <OurServices lang={lang}/>
        <WorkProcess lang={lang}/>
        <Testimonials lang={lang}/>
        <OurTeam lang={lang}/>
        <OurSpecializedSectors lang={lang}/>
        <WhyChooseUs lang={lang}/>
        <Footer />
      {/*   <AboutPreview lang={lang} />
        <ServicesPreview lang={lang} />
        <Testimonials lang={lang} />
        <PricingPreview lang={lang} />
        <ContactPreview lang={lang} /> */}
     
     {/*  <FinalCTA lang={lang} /> */}
    </Box>
  )
}

export async function generateStaticParams() {
  return ['es', 'en', 'fr'].map((lang) => ({ lang }))
}
