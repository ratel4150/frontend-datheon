// File: frontend-datheon/src/app/(lang)/[lang]/landing/page.tsx
// src\app\(lang)\[lang]\landing\page.tsx

import {  Box } from '@mui/material'
import { Hero } from '@datheon/widgets/hero'
import { OurServices } from '@datheon/widgets/our-services'
import { WorkProcess } from '@datheon/widgets/work-process'
import { Testimonials } from '@datheon/widgets/testimonials'
import { OurTeam } from '@datheon/widgets/our-team'
import { OurSpecializedSectors } from '@datheon/widgets/our-specialized-sectors'
import { WhyChooseUs } from '@datheon/widgets/why-choose-us'
import { Footer } from '@datheon/widgets/footer'


type Props = {
  params: Promise<{ lang: string }>
}



export default async function LandingPage({ params }: Props) {
  const { lang } = await params

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
      <Hero lang={lang} />
  
        <OurServices lang={lang}/>
        <WorkProcess lang={lang}/>
        <Testimonials lang={lang}/>
        <OurTeam lang={lang}/>
        <OurSpecializedSectors lang={lang}/>
        <WhyChooseUs lang={lang}/>
        <Footer />
    </Box>
  )
}

export async function generateStaticParams() {
  return ['es', 'en', 'fr'].map((lang) => ({ lang }))
}
