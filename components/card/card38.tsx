import useTheme from '@/hooks/use-theme'
import { addToCartList } from '@/redux/features/product.slice'
import { productImg } from '@/site-settings/siteUrl'
import { getPrice } from '@/utils/get-price'
import httpReq from '@/utils/http/axios/http.service'
import { getCampaignProduct } from '@/utils/http/get-campaign-product'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosEye } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import QuikView from '../quick-view'
import Details from '../_product-details-page/product-details/three/details'
import BDT from '@/utils/bdt'

// import Details from '../../layouts/productDetails/fourteen/Details';


const Card38 = ({ item }:any) => {

    const { design, makeid, store_id } = useTheme()
    const [camp, setCamp] = useState<any>(null)

    const dispatch = useDispatch()

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const [view, setView] = useState(false)


    const productGetPrice = getPrice(item.regular_price, item.discount_price, item.discount_type)
    const campPrice = (getPrice(productGetPrice, parseInt(camp?.discount_amount), camp?.discount_type))

    useEffect(() => {
        async function handleCampaign() {
            try {
                const response = await getCampaignProduct(item, store_id);
                if (!response?.error) {
          setCamp(response)
        } // the API response object
            } catch (error) {
                console.error(error);
            }
        }

        handleCampaign();
    }, [item, store_id])

    const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .card-text-color:hover {
        color:  ${design?.header_color};
    }
    .cart-color {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
       
    }
  
  }
  `

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
                        price: productGetPrice,
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
        if (item?.variant.length !== 0) {
            setView(!view)
        } else {
            filterOfferProduct(item)
        }
    }


    return (
        <div>
            <div className='group relative overflow-hidden'>
                <style>{styleCss}</style>

                <div className='relative overflow-hidden'>
                    <img src={productImg + item.image[0]} alt="" className='h-auto min-w-full object-cover' />

                    <div onClick={() => setView(!view)} className='top-3 right-3 opacity-0 group-hover:opacity-100 h-10 w-10 rounded-full items-center lg:cursor-pointer bg-white searchHover flex justify-center absolute duration-500'>
                        <IoIosEye className='text-lg text-center' />
                    </div>
                </div>


                <div className='flex flex-col gap-3 py-3 justify-center items-center'>
                    <div className='text-gray-700 text-base font-bold card-text-color'>
                        <Link href={'/product/' + item?.id + '/' + item?.slug} > <h1 className='whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2'>{item?.name}</h1>  </Link>
                    </div>

                    <div className='text-sm font-semibold text-black flex items-center gap-2'>
                        <p>BDT {camp?.status === "active" ? campPrice : productGetPrice}</p>
                        {camp?.status !== "active" && (item.discount_type === 'no_discount' || item.discount_price === '0.00') ? " " : <p className='line-through text-gray-500'> <BDT price={Math.trunc(item.regular_price)} /></p>}
                    </div>


                    <div onClick={add_cart_item} className=''>
                        <p className=' font-medium border px-3 py-1 w-max lg:cursor-pointer border-hover searchHover duration-500'>{store_id === 1187 ? 'অর্ডার করুন' : 'Add to Cart'}</p>
                    </div>
                </div>




            </div>
            <QuikView open={view} setOpen={setView} >
                <Details data={{ product_id: item?.id }} />
            </QuikView>

        </div>

    )
}

export default Card38;


