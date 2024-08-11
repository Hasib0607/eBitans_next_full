import useTheme from '@/hooks/use-theme';
import { getPrice } from '@/utils/get-price';
import { getCampaignProduct } from '@/utils/http/get-campaign-product';
import Taka from '@/utils/taka';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import QuikView from '../quick-view';
import Details from '../_product-details-page/product-details/three/details';
import { productImg } from '@/site-settings/siteUrl';


const Card8 = ({ item }:any) => {

    const [open, setOpen] = useState(false)
    const [camp, setCamp] = useState<any>(null)
    const { store_id } = useTheme()

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

    return (
        <>

            <Link href={'/product/' + item?.id + '/' + item?.slug} className='p-3 group bg-white  ' >
                <div className="flex justify-center " >
                    <div className="flex flex-row  md:flex-row   ">

                        <div className=' w-[100px] h-[100px]  '>
                            <img className=" w-full  h-full object-cover border" src={productImg + item?.image[0]} alt="Mountain" />
                        </div>
                        <div className="px-5 flex flex-col justify-start">
                            <p className=" text-sm font-normal antialiased mb-2 text-gray-500 menu-hover card5itemCategory whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">{item.name}</p>

                            <div className="px-1 pt-4 pb-2 text-gray-700 text-sm font-bold antialiased mb-2 flex items-center gap-2" >
                                <Taka tk={camp?.status === "active" ? campPrice : productGetPrice} />
                                {camp?.status !== "active" && (item.discount_type === 'no_discount' || item.discount_price === '0.00') ? " " : <p className='line-through text-sm'> <Taka tk={Math.trunc(item.regular_price)} /></p>}
                            </div>

                        </div>
                    </div>
                </div>
                <QuikView open={open} setOpen={setOpen} >
                    <Details data={{ product_id: item?.id }} />
                </QuikView>
            </Link>
        </>

    );
};

export default Card8;