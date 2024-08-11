"use client"
import React, { useState } from 'react'
import parse from 'html-react-parser'
import useTheme from '@/hooks/use-theme'
import { useDispatch } from 'react-redux'
import { getPrice } from '@/utils/get-price'
import { toast } from 'react-toastify'
import httpReq from '@/utils/http/axios/http.service'
import { addToCartList } from '@/redux/features/product.slice'
import SectionHeadingTwentyNine from '@/components/section-heading/section-heading-twentynine'
import Link from 'next/link'
import { productImg } from '@/site-settings/siteUrl'
import Rate from '@/utils/rate'
import BDT from '@/utils/bdt'
import { FaCartPlus } from 'react-icons/fa'
import QuikView from '@/components/quick-view'
import Details from '@/components/_product-details-page/product-details/three/details'

const FeatureProductTwentyNine = ({feature_product, design , store_id}:any) => {

    const {  makeid } = useTheme()
    const dispatch = useDispatch()
    const [view, setView] = useState(false)

    if (feature_product.length === 0) {
        return null
    }

    const styleCss = `
    .bg-color {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .btn-feature-product {
        color: ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .btn-feature-product:hover {
        color: ${design?.text_color};
        border: 1px solid ${design?.header_color};
    }
 `
    const price = (getPrice(feature_product[0]?.regular_price, feature_product[0]?.discount_price, feature_product[0]?.discount_type))

    const filterOfferProduct = (item:any) => {

        let cartItem = {}
        let productDetails = {
            id: item?.id,
            store_id
        }
        toast("Added to Cart", {
            type: 'success', autoClose: 1000,
        })

        httpReq.post('get/offer/product', productDetails)
            .then(res => {


                if (!res?.error) {

                    let itemRegularPrice = (getPrice(item?.regular_price, item?.discount_price, item?.discount_type))
                    let campaignPrice = (getPrice(itemRegularPrice, parseInt(res?.discount_amount), res?.discount_type))
                    if (res?.discount_amount === null) {

                        cartItem = {
                            cartId: makeid(100),
                            price: itemRegularPrice,
                            color: null,
                            size: null,
                            additional_price: null,
                            volume: null,
                            unit: null,
                            ...item

                        }
                    } else {


                        cartItem = {
                            cartId: makeid(100),
                            price: campaignPrice,
                            color: null,
                            size: null,
                            additional_price: null,
                            volume: null,
                            unit: null,
                            ...item

                        }
                    }

                } else {
                    cartItem = {
                        cartId: makeid(100),
                        price: price,
                        color: null,
                        size: null,
                        additional_price: null,
                        volume: null,
                        unit: null,
                        ...item

                    }
                }
                dispatch(addToCartList({ ...cartItem }))
            })

    }


    const add_cart_item = () => {
        if (feature_product[0]?.variant === '1') {
            setView(!view)
        } else {
            filterOfferProduct(feature_product[0])
        }
    }

    return (
        <div className='sm:container px-5 sm:py-10 py-5 w-full'>
            <style>{styleCss}</style>
            <div>
                <SectionHeadingTwentyNine title={"Top Featured Products"} />
            </div>
            <div className='md:grid lg2:grid-cols-2 md:grid-cols-1 gap-5'>

                <div className='hidden md:block w-full'>
                    {
                        feature_product?.slice(0, 1).map((productData:any) =>
                            <div key={productData.id} className="grid grid-cols-2 gap-x-3 p-5 justify-items-center group">
                                <Link href={'/product/' + productData?.id + '/' + productData?.slug} ><div className='w-full relative'>
                                    <img src={productImg + productData?.image[0]} alt="" className='h-auto min-w-full' />
                                    <div className='absolute bg-gray-100 z-[1] group-hover:h-full h-0 w-full left-0 bottom-0 bg-opacity-10 duration-500 '></div>
                                </div></Link>
                                <div>
                                    <Link href={'/product/' + productData?.id + '/' + productData?.slug}><p>{productData?.name}</p></Link>
                                    <Rate rating={productData?.rating} />
                                    <div className='flex items-center gap-2'>
                                        <p className='text-sm py-1 rounded-lg'><BDT price={getPrice(productData?.regular_price, productData?.discount_price, productData?.discount_type)} /></p>
                                        <h1 className='line-through text-xs'>
                                            {productData?.discount_type === 'no_discount' || productData?.discount_price === '0.00' ? " " : <p> <BDT price={productData?.regular_price} /></p>}
                                        </h1>
                                    </div>
                                    <div>
                                        <p>{parse(`${productData?.description?.slice(0, 250)}`)} {productData?.description?.length > 250 && "..."}</p>
                                    </div>

                                    {productData?.quantity !== "0" && <div onClick={add_cart_item} className=' bg-black text-white flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer mt-10'>
                                        <FaCartPlus />
                                        <p className=''>Add to Cart</p>
                                    </div>}
                                </div>

                            </div>)
                    }
                </div>
                <div className='grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5'>
                    {
                        feature_product?.slice(1, 5).map((productData:any) =>
                            <div key={productData.id} className="grid grid-cols-2 gap-x-5 group">
                                <div className='h-full w-full relative'>
                                    <img src={productImg + productData?.image[0]} alt="" className='h-auto min-w-full' />
                                    <div className='absolute bg-gray-100 z-[1] group-hover:h-full h-0 w-full left-0 bottom-0 bg-opacity-10 duration-500 '></div>
                                </div>
                                <div>
                                    <Link href={'/product/' + productData?.id + '/' + productData?.slug} ><p>{productData?.name}</p></Link>
                                    <Rate rating={productData?.rating} />
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-sm py-1 rounded-lg'><BDT price={getPrice(productData?.regular_price, productData?.discount_price, productData?.discount_type)} /></p>
                                        <h1 className='line-through text-xs '>
                                            {productData?.discount_type === 'no_discount' || productData.discount_price === '0.00' ? " " : <p> <BDT price={productData.regular_price} /></p>}
                                        </h1>
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
            </div>
            <QuikView open={view} setOpen={setView} >
                <Details data={{ product_id: feature_product[0]?.id }} />
            </QuikView>
        </div>
    )
}

export default FeatureProductTwentyNine;