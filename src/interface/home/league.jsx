import React, { useEffect } from 'react'

const League = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div
    className='w-11/12 max-w-[1440px] mx-auto min-h-[calc(100vh-88px)] mt-[100px] grid grid-cols-4 gap-3'
    >League</div>
  )
}

export default League