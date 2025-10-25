import React from 'react'

const Svg = () => {
  return (
    <>
       {/* --- Waves Background --- */}
      <div className="absolute top-0 left-0 w-full -z-10">
        {/* First Wave - Base */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-[120px] sm:h-[150px] md:h-[100px] lg:h-[140px] xl:h-[200px]"
        >
          <path
            fill="var(--secondary-color)"
            fillOpacity="0.3"
            d="M0,160L60,176C120,192,240,224,360,208C480,192,600,128,720,96C840,64,960,64,1080,80C1200,96,1320,128,1380,144L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>

        {/* Second Wave - Overlay */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-[80px] sm:h-[100px] md:h-[180px] lg:h-[200px] xl:h-[200px] absolute top-0 left-0"
        >
          <path
            fill="var(--tertiary-color)"
            fillOpacity="0.3"
            d="M0,224L60,202.7C120,181,240,139,360,101.3C480,64,600,32,720,21.3C840,11,960,21,1080,37.3C1200,53,1320,75,1380,85.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
    </>
  )
}

export default Svg
