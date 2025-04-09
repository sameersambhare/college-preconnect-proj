"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Card from '@/components/Card'
const features = [
  {
    id: 1,
    title: 'Find Your Perfect Roommate Today',
    description: 'Our smart matching algorithm connects you with like-minded peers.'
  },
  {
    id: 2,
    title: 'Engage in Collaborative Community Spaces',
    description: 'Share resources and support each other academically.'
  },
  {
    id: 3,
    title: 'Easily Share Notes and Resources',
    description: 'Access a wealth of shared knowledge at your fingertips.'
  }
]
const page = () => {
  return (
    <div>
      <main>
        {/*--------------------- First Page----- ------------ */}
        <section className='FirstPage w-full min-h-screen flex flex-col md:flex-row justify-between items-center py-12 md:py-0'>
          <div className="text-box w-full md:w-1/2 p-6 md:p-16 flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold"> Connect, Collaborate, and Thrive in Engineering</h1>
            <p className="text-base md:text-lg text-gray-600">Welcome to College PreConnect, where newly enrolled engineering students can forge lasting connections from day one. Our mission is to create a vibrant community that supports your academic journey and personal growth</p>
            <div className="flex gap-4 mt-4">
              <Button className="bg-orange-500 hover:bg-orange-600 px-4 md:px-6 py-2">Join Now</Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 px-4 md:px-6 py-2">Learn More</Button>
            </div>
          </div>
          <div className="image-box w-full md:w-1/2 md:h-screen mt-8 md:mt-0">
            <Image src={'/static/assets/banner1.png'} alt='banner1' width={500} height={500} className="h-full w-full object-cover"></Image>
          </div>
        </section>
        {/*--------------------- Second Page----- ------------ */}
        <section className='secondPage w-full min-h-screen p-6 md:p-20'>
            <h4 className="text-orange-500 font-medium mb-4">Connect</h4>

            <div className="second-text-box flex flex-col md:flex-row justify-between gap-6 md:gap-12 mt-4">
              <div className="w-full md:w-1/3">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">Discover Your College Community Today</h1>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-gray-600 text-base md:text-lg"> At College PreConnect, we empower newly enrolled engineering students to build lasting connections. Our platform facilitates roommate matching based on shared interests and preferences, ensuring a comfortable living environment. Join community spaces to collaborate on projects, share notes, and tackle academic challenges together</p>
              </div>
            </div>
            
            <div className="feature-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-16">
              {features.map((feature) => (
                <Card key={feature.id} title={feature.title} description={feature.description} />
              ))}
            </div>

            <div className="flex gap-4 mt-10 md:mt-16">
            <Button className="px-4 md:px-6 py-2">Join Now</Button>
           <Link href='/'>Learn More</Link>
            </div>
        </section>
        {/*--------------------- Third Page----- ------------ */}
        <section className='thirdPage w-full min-h-screen p-6 md:p-20 flex flex-col md:flex-row justify-between items-center'>
          <div className="third-page-text-box w-full md:w-1/2 flex flex-col gap-6 mb-8 md:mb-0">
            <h4 className="text-orange-500 font-medium mb-2">Connect</h4>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">Find Your Perfect Roommate Today</h1>
            <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8">Our roommate matching feature helps you connect with fellow students based on location and shared interests. Say goodbye to random assignments and hello to a living situation that feels like home</p>
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
              <div className="box-1">
                <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-2">50%</h2>
                <p className="text-gray-600">Match with students who share your passions</p>
              </div>
              <div className="box-2">
                <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-2">50%</h2>
                <p className="text-gray-600">Easily filter by location and interests</p>
              </div>
            </div>
          </div>
          <div className="image-box w-full md:w-1/2 flex justify-center items-center">
            <Image src={'/static/assets/banner3.png'} alt='banner2' width={700} height={700} className="max-w-full h-auto"></Image>
          </div>
        </section>
        {/*--------------------- Fourth Page----- ------------ */}
        <section className='fourthPage w-full min-h-screen p-6 md:p-20 bg-gray-50'>
          <div className="fourth-page-container flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="header-text flex flex-col gap-2 w-full md:w-1/2">
              <h4 className="text-orange-500 font-medium">Engage, Collaborate, and Discover</h4>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">Your Academic Community Awaits</h1>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <p className="text-gray-600 text-base md:text-lg">Connect with peers who share your academic interests and goals. Our community spaces allow you to collaborate on projects, share resources, and build lasting relationships that enhance your college experience.</p>
            </div>
          </div>
          <div className="image-box w-full pt-8 md:pt-16 flex justify-center items-baseline">
            <Image src={'/static/assets/Banner4.png'} alt='student community' width={800} height={800} className="rounded-lg object-cover max-w-full h-auto"></Image>
          </div>
        </section>
        {/*--------------------- Testimonials Section----- ------------ */}
        <section className='testimonialsPage w-full py-12 md:py-20 bg-gray-50'>
          <div className="testimonials-container max-w-6xl mx-auto px-6 md:px-0 flex flex-col gap-8">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight text-center mb-8 md:mb-12">Student Testimonials</h1>
            
            <div className="testimonials-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="testimonial flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="stars flex">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i} className="text-yellow-400">{star}</span>
                  ))}
                </div>
                <p className="text-gray-600">Found my perfect roommate and study group in the first week. This platform made my transition to college so much easier!</p>
                <div className="user flex items-center gap-3 mt-4">
                  <div className="avatar w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Image src={'/static/assets/avatar.png'} alt='avatar1' width={50} height={50}></Image>
                  </div>
                  <div className="user-info">
                    <h4 className="font-medium">Sarah J.</h4>
                    <p className="text-sm text-gray-500">Computer Science</p>
                  </div>
                </div>
              </div>
              
              <div className="testimonial flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="stars flex">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i} className="text-yellow-400">{star}</span>
                  ))}
                </div>
                <p className="text-gray-600">The community spaces helped me find study partners and friends with similar interests. Highly recommend!</p>
                <div className="user flex items-center gap-3 mt-4">
                  <div className="avatar w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Image src={'/static/assets/avatar.png'} alt='avatar1' width={50} height={50}></Image>
                  </div>
                  <div className="user-info">
                    <h4 className="font-medium">Michael T.</h4>
                    <p className="text-sm text-gray-500">Electrical Engineering</p>
                  </div>
                </div>
              </div>
              
              <div className="testimonial flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="stars flex">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i} className="text-yellow-400">{star}</span>
                  ))}
                </div>
                <p className="text-gray-600">The resource sharing feature saved me countless hours of research. This platform is a game-changer!</p>
                <div className="user flex items-center gap-3 mt-4">
                  <div className="avatar w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Image src={'/static/assets/avatar.png'} alt='avatar1' width={50} height={50}></Image>
                  </div>
                  <div className="user-info">
                    <h4 className="font-medium">Jason K.</h4>
                    <p className="text-sm text-gray-500">Mechanical Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/*--------------------- Call to Action Section----- ------------ */}
        <section className='ctaPage w-full py-12 md:py-16'>
          <div className="cta-container max-w-6xl mx-auto px-6 md:px-0 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
            <h2 className="text-xl md:text-2xl font-bold text-center md:text-left">Connect With Your Future Peers</h2>
            <Button className="bg-orange-500 hover:bg-orange-600 px-6 py-2">Join Now</Button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default page