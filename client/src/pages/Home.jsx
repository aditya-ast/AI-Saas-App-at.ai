import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import AiTools from '../component/AiTools'
import Testimonials from '../component/Testimonial'
import Pricing from '../component/Pricing'
import Footer from '../component/Footer'


function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <AiTools/>
      <Testimonials/>
      <Pricing/>
      <Footer/>
    </>
  )
}

export default Home