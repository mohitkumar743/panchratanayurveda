import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  {
    url: '/slider/slider1.png', // Image from public/slider folder
    caption: 'Slide 1',
  },
  {
    url: '/slider/slider2.png', // Image from public/slider folder
    caption: 'Slide 2',
  },
  {
    url: '/slider/slider3.png', // Image from public/slider folder
    caption: 'Slide 3',
  },
];

function Slidebar() {
  return (
    <div className="slide-container w-full">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              className="w-full lg:min-h-[75vh] sm:min-h-[35vh] min-h-[35vh]  bg-cover  bg-center"
              style={{
                backgroundImage: `url(${slideImage.url})`,
              }}
            >
              {/* Optional caption */}
              {/* <span className="absolute bottom-5 left-5 text-white text-xl sm:text-2xl lg:text-3xl font-bold bg-opacity-50 bg-black p-3">
                {slideImage.caption}
              </span> */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default Slidebar;
