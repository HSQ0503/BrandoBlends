"use client";

import DynamicIcon from '@/helpers/DynamicIcon';
import ImageFallback from '@/helpers/ImageFallback';
import { markdownify } from '@/lib/utils/textConverter';
import { useEffect, useRef } from 'react';
import { Swiper as SwiperClass } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { GallerySection } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Gallery = ({ data }: { data: GallerySection }) => {
  const { title, images } = data;
  const swiperRef = useRef<SwiperClass | null>(null);

  // Initialize Swiper
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, []);

  return (
    <section className="section relative pt-0">
      <div className="container">
        <div className="row">
          <div className="col-12" data-aos="fade-up-sm">
            <div className="flex gap-5 flex-wrap items-center justify-between">
              {title && <h2 dangerouslySetInnerHTML={markdownify(title)} />}
              <div className="flex gap-4">
                <button
                  id="gallery-slider-arrow-left"
                  className="w-14 h-14 hover:bg-green-100 duration-300 transition-colors flex justify-center items-center bg-green-50 border border-border/20 rounded-full text-green-500">
                  <DynamicIcon icon={"FaChevronLeft"} />
                </button>
                <button
                  id="gallery-slider-arrow-right"
                  className="w-14 h-14 hover:bg-green-100 duration-300 transition-colors flex justify-center items-center bg-green-50 border border-border/20 rounded-full text-green-500">
                  <DynamicIcon icon={"FaChevronRight"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-10 pt-16">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          loop={true}
          speed={800}
          autoplay={{
            delay: 1400,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '#gallery-slider-arrow-right',
            prevEl: '#gallery-slider-arrow-left',
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="testimonial-slider"
        >
          {images?.map((item, i) => (
            <SwiperSlide key={i}>
              <ImageFallback
                className="lg:h-[32rem] md:h-[22rem] object-cover rounded-md"
                width={1000}
                height={600}
                src={item}
                alt={`photo of ${title}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
