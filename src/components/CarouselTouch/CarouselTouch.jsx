import { useEffect, useRef } from "react";
import "./carouselTouch.css";

export const CarouselTouch = ({ images, title, setSelectedImage }) => {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // carousel variables
    let initialPosition = null;
    let isMoving = false;
    let transformValue = 0;
    let lastPageX = 0;

    const gestureStart = (event) => {
      initialPosition = event.pageX;
      isMoving = true;
      const transformMatrix = window
        .getComputedStyle(trackRef.current)
        .getPropertyValue("transform");
      if (transformMatrix !== "none") {
        transformValue = parseInt(transformMatrix.split(",")[4].trim());
      }
    };

    const gestureMove = (event) => {
      if (isMoving) {
        const currentPosition = event.pageX;
        if (currentPosition - lastPageX > 0) {
          if (transformValue > 0) return;
        } else {
          if (
            Math.abs(transformValue) >
            trackRef.current.offsetWidth - carouselRef.current.offsetWidth
          )
            return;
        }

        // diff: relative difference between where the mouse is now from where it started
        const diff = currentPosition - initialPosition;

        // This style is applied inline, so getComputedStyle() is needed to extract it in above code
        trackRef.current.style.transform = `translateX(${
          transformValue + diff
        }px)`;
      }
      lastPageX = event.pageX;
    };

    const gestureEnd = (event) => {
      isMoving = false;
    };

    if (window.PointerEvent) {
      trackRef.current.addEventListener("pointerdown", gestureStart);
      trackRef.current.addEventListener("pointermove", gestureMove);
      trackRef.current.addEventListener("pointerup", gestureEnd);
    } else {
      trackRef.current.addEventListener("touchdown", gestureStart);
      trackRef.current.addEventListener("touchmove", gestureMove);
      trackRef.current.addEventListener("touchup", gestureEnd);

      trackRef.current.addEventListener("mousedown", gestureStart);
      trackRef.current.addEventListener("mousemove", gestureMove);
      trackRef.current.addEventListener("mouseup", gestureEnd);
    }
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="track" ref={trackRef}>
        {images.map((item, index) => (
          <div className="card" key={`${title}-${index}`}>
            <img
              draggable={false}
              src={item}
              alt={`${title} gallery`}
			  onClick={() => setSelectedImage(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
