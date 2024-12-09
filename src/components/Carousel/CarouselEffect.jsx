import React from 'react'
import classes from"./Carousel.module.css"
import {images } from './images/data'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

function CarouselEffect() {
  return (
    <>
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={false}
      showStatus={false}>
     {images.map((imageLink,i)=>{return <img key={i} src={imageLink} alt=""/>})
      }
      </Carousel>
      <div className={classes.hero_img}></div>
    </>
  )
}

export default CarouselEffect
