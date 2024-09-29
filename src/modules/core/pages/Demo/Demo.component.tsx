import React from 'react';
import { Carousel } from 'antd';
import ReactPlayer from 'react-player/lazy';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import { data } from './data';

// import { Spin } from 'antd';

// import { usePokemonListQuery } from '../../../shared/apis/baseApi';

const Demo: React.FC = () => {
  // const { data, isSuccess, isLoading } = usePokemonListQuery('');

  // if (isSuccess) {
  //   console.log('Data: ', data);
  // }

  return (
    <div className="bg-white h-screen w-full m-1">
      {/* <Carousel vertical></Carousel> */}

      <Swiper
        className="mySwiper bg-blue-500 h-screen w-[400px]"
        direction={'vertical'}
        // pagination={{
        //   clickable: true
        // }}
        modules={[Pagination]}
        lazy={true}
      >
        {data.map((item, index) => (
          <SwiperSlide className="h-screen w-full flex items-center">
            <Carousel className="bg-red-500 w-full h-screen" autoplay autoplaySpeed={5000}>
              {item.media.map((mediaItem, index2) => (
                <div className="w-full h-screen">
                  <div className="h-full flex items-center justify-center bg-black">
                    {mediaItem.type === 'image' ? (
                      <img
                        src={mediaItem.url}
                        alt=""
                        width={'100%'}
                        height={'100%'}
                        loading="lazy"
                        className="object-cover"
                      />
                    ) : (
                      <ReactPlayer url={mediaItem.url} playing={true} height={'100%'} />
                    )}

                    {/* <div className="w-[400px] overflow-x-auto absolute bottom-0 flex items-center">
                      {item.products.map((product) => (
                        <div className="flex-1 h-20 bg-white mb-10 rounded-lg opacity-80 p-4">
                          <span>{product.name}</span>
                        </div>
                      ))}
                    </div> */}

                    {mediaItem.type === 'image' &&
                      mediaItem.annotations.map((annotation) => (
                        <div
                          className="absolute h-6 w-6 rounded-full bg-red-500 z-[10000] hover:scale-110 transition duration-500 hover:duration-500 cursor-pointer border-white border-2 border-solid"
                          style={{ left: annotation.x, top: annotation.y }}
                        ></div>
                      ))}

                    {/* <video controls>
                      <source
                        src="https://videos.pexels.com/video-files/3015527/3015527-hd_1920_1080_24fps.mp4"
                        type="video/mp4"
                      />
                    </video> */}
                  </div>
                </div>
              ))}
            </Carousel>
            {/* </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Demo;

// https://videos.pexels.com/video-files/3015527/3015527-hd_1920_1080_24fps.mp4

// https://videos.pexels.com/video-files/8045821/8045821-hd_1080_1920_25fps.mp4
