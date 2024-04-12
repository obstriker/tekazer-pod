import React from 'react'

const Section = () => {
  return (
    <>
    <section className="relative block px-6 py-10 md:py-20 md:px-10 ">
          <div className="relative mx-auto max-w-7xl flex flex-wrap justify-between flex-row">
          <div className="sm:text mx-auto max-w-lg text-center md:w-1/2 md:text-left">
          <span className="text-main my-3 block font-medium uppercase tracking-wider ">Branding</span>
          <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text  font-bold text-transparent  text-3xl sm:text-4xl">Brand Your Landing Page</h2>
          <p className=" my-4 bg-transparent font-medium leading-relaxed tracking-wide text-gray-400">Your landing page should reflect the aesthetic, the design and the energy of the brand you've already created. With NextJs, you can customize the page's details to create a truly unique page that refines your look and feel. We make designing and launching easy, no matter what your product is.</p>
          <div className="my-8 mx-auto flex max-w-md flex-wrap justify-center gap-3 text-xs text-gray-400 md:mx-0 md:justify-start">
          <div className="flex items-center justify-center gap-2 rounded-md border border-neutral-700/30 bg-neutral-800/50 py-1 px-3 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="17" height="17" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none">
          </path>
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2">
          </path>
          <polyline points="7 9 12 4 17 9">
          </polyline>
          <line x1="12" y1="4" x2="12" y2="16">
          </line>
          </svg> Easy Uploads</div>
          <div className="flex items-center justify-center gap-2 rounded-md border border-neutral-700/30 bg-neutral-800/50 py-1 px-3 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-autofit-down" width="17" height="17" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinejoin="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none">
          </path>
          <path d="M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8">
          </path>
          <path d="M18 4v17">
          </path>
          <path d="M15 18l3 3l3 -3">
          </path>
          </svg> Automatic Autofit</div>
          <div className="flex items-center justify-center gap-2 rounded-md border border-neutral-700/30 bg-neutral-800/50 py-1 px-3 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-stars" width="17" height="17" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinejoin="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none">
          </path>
          <path d="M17.8 19.817l-2.172 1.138a0.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a0.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a0.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a0.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a0.39 .39 0 0 1 -.567 .411l-2.172 -1.138z">
          </path>
          <path d="M6.2 19.817l-2.172 1.138a0.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a0.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a0.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a0.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a0.39 .39 0 0 1 -.567 .411l-2.172 -1.138z">
          </path>
          <path d="M12 9.817l-2.172 1.138a0.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a0.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a0.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a0.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a0.39 .39 0 0 1 -.567 .411l-2.172 -1.138z">
          </path>
          </svg> Premium Support</div>
          <div className="flex items-center justify-center gap-2 rounded-md border border-neutral-700/30 bg-neutral-800/50 py-1 px-3 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wind" width="17" height="17" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinejoin="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none">
          </path>
          <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24">
          </path>
          <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24">
          </path>
          <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24">
          </path>
          </svg> Windy Environment</div>
          <div className="flex items-center justify-center gap-2 rounded-md border border-neutral-700/30 bg-neutral-800/50 py-1 px-3 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bolt" width="17" height="17" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinejoin="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none">
          </path>
          <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3">
          </polyline>
          </svg> Really Fast</div>
          </div>
          </div>
          <div className="flex w-full items-center justify-center md:w-1/2 md:px-8">
          <div className="rounded-lg  px-20 py-10 bg-gradient-to-r from-indigo-600 to-red-600">
          <div className="relative inline-block overflow-hidden rounded-lg border-neutral-800 border">
          <img alt="" src="https://demo.templatemonster.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFeature.Notifications.1efd7c19.png&amp;w=640&amp;q=75" width="250" height="257" decoding="async" data-nimg="1" className="inline-block color-transparent" loading="lazy" />
          </div>
          </div>
          </div>
          </div>
  </section>
  </>
  )
}

export default Section