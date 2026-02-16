import React from 'react'
import HomeBanner from '../components/Landing/HomeBanner'
// import AboutUsBox from '../components/Landing/AboutUsBox'
// import OurServiceBox from '../components/Landing/OurServiceBox'
// import ProfileBox from '../components/Landing/ProfileBox'
// import SoftwareAreaBox from '../components/SharedSection/SoftwareAreaBox'
import FeaturedBox from '../components/Landing/FeaturedBox'
import OurRecognition from '../components/Landing/OurRecognition'
import OngoingArea from '../components/Landing/OngoingArea'
import ScheduleVisit from '../components/Landing/ScheduleVisit'
import AboutUsBox from '../components/SharedSection/AboutUsBox'


const Landing = () => { 
  return (
    <>
      <HomeBanner />

      <AboutUsBox />

      <FeaturedBox />
 
      {/* <OurRecognition /> */}

      <ScheduleVisit />

      <OngoingArea />

      {/* <AboutUsBox />
 
      <OurServiceBox />

      <ProfileBox />

      <SoftwareAreaBox /> */}
    </>
  )
}

export default Landing