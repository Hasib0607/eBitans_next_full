import httpReq from "@/utils/http/axios/http.service";
import { useEffect, useState } from "react";
import Skeleton from "../loader/skeleton";
import ProductCard from "./product-card";

const GetProductByCatId = ({ categories }: any) => {
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setLoader(true);
    let temp: any = [];
    categories?.map((id: any) => {
      httpReq
        .post("getcatproducts", { id: parseInt(id) })
        .then((res) => {
          if (res?.error) {
            httpReq
              .post("getsubcatproduct", { id: parseInt(id) })
              .then((res) => {
                if (!res?.error) {
                  temp = [...temp, ...res?.data?.data];
                  setLoader(false);
                  setProduct(temp);
                }
              });
          } else {
            temp = [...temp, ...res?.data?.data];
            setProduct(temp);
            // temp = [...res, ...temp]
            setLoader(false);
          }
          // setProduct(temp)
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
      return null;
    });
  }, [categories]);

  if (loader) {
    return <Skeleton />;
  }

  return (
    <div className="sm:shadow-lg pt-5 pb-16 sm:my-10 sm:rounded-md ">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {product?.map((item, id) => (
            <>
              <ProductCard key={id} item={item} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GetProductByCatId;
