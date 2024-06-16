import React from 'react'

const FutzoneTV = () => {
  
  return (
    <div className='relative h-screen overflow-hidden mt-[88px] flex justify-center items-center'>
      <div className='w-full h-full blur-[10px] '>
        <img className='w-full h-full' src="https://play-lh.googleusercontent.com/8LOZoIKHuQjZCzjFU0rkNFYtaJZCpzFJfiWXFwGQhi0jxJpNJdQyiW1W-20KIlvZS74=w526-h296-rw" alt="" />
      </div>
        <div className='absolute text-white clamp1 shadow-sm bg-secondary p-3 rounded-[12px] mx-[12px] text-center'>
            <span className='font-bold'>Futzone TV</span> | Yaqinda ishga tushadi!!!
        </div>
    </div>
  )
}

export default FutzoneTV