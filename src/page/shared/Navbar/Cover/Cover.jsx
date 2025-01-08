import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({ img, title }) => {
  return (
    <div>
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
      >
        <div className="hero-content  h-[400px] text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl uppercase font-bold">{title}</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
        <div style={{ height: '200px' }} />
      </Parallax>
    </div>
  );
};

export default Cover;
