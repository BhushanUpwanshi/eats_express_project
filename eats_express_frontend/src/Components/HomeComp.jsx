import React, { useEffect } from 'react'
import BannerComp from './BannerComp'
import FavProductsComp from './FavProductsComp'
import { PromoBanner } from './PromoBanner'
import { CategoryBanner } from './CategoryBanner'


export default function HomeComp() {
  useEffect(() => {

  }, [location]);

  return (
    <div className=''>
      <BannerComp />
      <FavProductsComp />
      <PromoBanner />
      <CategoryBanner />
    </div>

  )
}
