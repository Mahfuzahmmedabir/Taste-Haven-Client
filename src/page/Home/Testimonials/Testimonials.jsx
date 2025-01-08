import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
const Testimonials = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/review')
      .then(res => res.json())
      .then(data => setReview(data));
  }, []);
  return (
    <section>
      <SectionTitle
        subHeading={'what our client say'}
        heading={'Testimonials'}
      ></SectionTitle>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        {/* <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}

        <div>
          {review.map(review => (
            <SwiperSlide key={review._id}>
              <div className="m-24">
                <p>{review.details}</p>
                <h2>{review.name}</h2>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default Testimonials;
