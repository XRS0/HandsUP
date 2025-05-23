import { useRef, useState } from "react";

type UseAnimationOptions = {
  trigger?: 'hover' | 'click';
  initialVsibility?: boolean;
  closeOnOutsideClick?: boolean;
};

const useAnimation = <T extends HTMLElement = HTMLElement>(
  options: UseAnimationOptions = {}
) => {
  const {
    trigger= "click",
    initialVsibility = false,
    // closeOnOutsideClick = true
  } = options;
  
  const [isVisible, setIsVisible] = useState(initialVsibility);
  const [isFadeOut, setIsFadeOut] = useState(false);

  const containerRef = trigger === "hover" ? useRef<T>(null) : null;

  const handleOpen = (newVisibility: React.MouseEvent<T>) => {
    if (newVisibility && !isVisible) {
      setIsVisible(true);
      setIsFadeOut(false);
    } else {
      setIsFadeOut(true);
    }
  }

  const handleAnimationEnd = (e: React.AnimationEvent<T>) => {
    //the animation name of blovk must be `fadeOut${blockName}`
    if (e.animationName.includes("fadeOut") && isFadeOut) {   
        setIsVisible(false);
        setIsFadeOut(false);
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<T>) => {
    if (
      trigger === "hover" &&
      containerRef?.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsFadeOut(true);
    }
  };

  const eventHandlers = {
    ...(trigger === 'hover' && {
      onMouseEnter: handleOpen as React.MouseEventHandler<T>,
      onMouseLeave: handleMouseLeave as React.MouseEventHandler<T>,
    }),
  };

  return {
    ...(trigger === 'hover' && { containerRef, eventHandlers }),
    isVisible,
    isFadeOut,
    handleOpen,
    handleAnimationEnd
  };
}

export default useAnimation;