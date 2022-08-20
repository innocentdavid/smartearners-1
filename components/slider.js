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
        <img src="/images/239aea4431a36bbfee37a891a0303492.png/" alt="" className="w-full md:h-[300px] lg:h-[400px] object-cover" />
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <img src="/images/354d8cfd841268167900ba516bfeeacd.png/" alt="" className="w-full md:h-[300px] lg:h-[400px] object-cover" />
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <img src="/images/1150c43c77b18703fcb5ab79587b7348.png/" alt="" className="w-full md:h-[300px] lg:h-[400px] object-cover" />
      </SwiperSlide>

      {/* <div className="snp" ref={sNextRef}></div>
      <div className="snn" ref={sPrevRef}></div> */}
      {/* ... */}
    </Swiper>
    </div>
  )
}
