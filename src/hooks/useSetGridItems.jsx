import React, { useState, useEffect } from 'react';

const useSetGridItems = () => {
  const [itemNum, setItemNum] = useState(10)
  const [itemStep, setItemStep] = useState(10)

  useEffect(() => {
    const handleResize = () => {
      const displayedBreedsNum = localStorage.getItem('displayedBreedsNum')

      if (displayedBreedsNum && parseInt(displayedBreedsNum) >= 9) {
        const screenWidth = window.innerWidth

        let roundedNum;
        if (screenWidth > 1441) {
          roundedNum = Math.floor(parseInt(displayedBreedsNum) / 9) * 9
          setItemStep(9)
        } else {
          roundedNum = Math.ceil(parseInt(displayedBreedsNum) / 10) * 10
          setItemStep(10)
        }

        setItemNum(roundedNum)
      }
    };

    // Initial check
    handleResize()


    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize);
  }, [])


  return {itemNum, itemStep}
};

export default useSetGridItems;
