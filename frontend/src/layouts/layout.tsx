import React, { createContext, useEffect, useRef } from "react"
import gsap from "gsap"

export const LayoutContext = createContext("")


export default function LayoutProdvider({children}: {children: React.ReactNode}) {
  const leftArrowRef = useRef<HTMLDivElement>(null)
  const rightArrowRef = useRef<HTMLDivElement>(null)
  const leftArrowBodyRef = useRef<HTMLDivElement>(null)
  const rightArrowBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial states
    gsap.set(leftArrowRef.current, { scaleX: 0, transformOrigin: "left center" })
    gsap.set(rightArrowRef.current, { scaleX: 0, transformOrigin: "right center" })

    // Create animation timeline with a more violent/dynamic easing
    const tl = gsap.timeline({
      defaults: { ease: "elastic.out(1, 0.3)" },
      delay: 0.5,
    })

    // Animate arrows stretching from their fixed positions
    tl.to(leftArrowRef.current, {
      scaleX: 1,
      duration: 1.2,
    }).to(
      rightArrowRef.current,
      {
        scaleX: 1,
        duration: 1.2,
      },
      "-=0.9",
    ) // Start slightly before the first animation ends

    return () => {
      // Cleanup
      tl.kill()
    }
  }, [])

  return (
    <LayoutContext.Provider value={""} >
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Left arrow (pointing right) - Cyan */}
        <div ref={leftArrowRef} className="absolute left-0 top-1/4 -translate-y-1/2 h-24 flex items-center">
          <div ref={leftArrowBodyRef} className="h-full bg-[#00c8ff] flex items-center justify-center w-[40vw]">
            <span className="text-white font-bold text-2xl px-8">cache me</span>
          </div>
          <div className="h-0 w-0 border-t-[48px] border-t-transparent border-l-[48px] border-l-[#00c8ff] border-b-[48px] border-b-transparent" />
        </div>

        {children}

        {/* Right arrow (pointing left) - Blue */}
        <div
          ref={rightArrowRef}
          className="absolute right-0 top-3/4 -translate-y-1/2 h-24 flex items-center flex-row-reverse"
        >
          <div ref={rightArrowBodyRef} className="h-full bg-[#0000ff] flex items-center justify-center w-[40vw]">
            <span className="text-white font-bold text-2xl px-8">if you can</span>
          </div>
          <div className="h-0 w-0 border-t-[48px] border-t-transparent border-r-[48px] border-r-[#0000ff] border-b-[48px] border-b-transparent" />
        </div>
      </div>
    </div>
    </LayoutContext.Provider>
  )
}