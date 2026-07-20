import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { testimonials } from '../../data/content';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3600, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      spaceBetween={20}
      breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      className="testimonials-swiper mt-10"
    >
      {testimonials.map((item) => (
        <SwiperSlide key={item.name} className="h-[22rem] sm:h-80">
          <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mb-4 flex gap-1 text-amber-400" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="leading-7 text-slate-700 dark:text-slate-300">&ldquo;{item.quote}&rdquo;</p>
            <div className="mt-auto pt-5">
              <h3 className="font-heading font-bold text-ink dark:text-white">{item.name}</h3>
              <p className="text-sm text-muted dark:text-slate-400">{item.role}</p>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
