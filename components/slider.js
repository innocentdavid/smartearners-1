import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, EffectFade, Autoplay } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function Slider() {
  const sNextRef = useRef(null)
  const sPrevRef = useRef(null)

  return (
    <div>
      <Swiper
      modules={[Navigation, EffectFade, Autoplay]}
      navigation
      // navigation={{
      //   prevEl: sNextRef,
      //   nexlEl: sPrevRef
      // }}
      effect={'fade'}
      spead={800}
      loop
      autoplay={{ delay: 3000 }}
      className="mySwiper"
      slidesPerView={1}
      // spaceBetween={50}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className="flex justify-center">
        <img src="/images/01.jpg" alt="" className="w-full md:h-[300px] lg:h-[500px]" />
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <img src="/images/02.jpg" alt="" className="w-full md:h-[300px] lg:h-[500px]" />
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <img src="/images/03.jpg" alt="" className="w-full md:h-[300px] lg:h-[500px]" />
      </SwiperSlide>
      {/* <SwiperSlide className="flex justify-center">
        <img src="/images/IMG-20220824-WA0020.jpg" alt="" className="w-full md:h-[300px] lg:h-[500px]" />
      </SwiperSlide> */}

      {/* <div className="snp" ref={sNextRef}></div>
      <div className="snn" ref={sPrevRef}></div> */}
      {/* ... */}
    </Swiper>
    </div>
  )
}
