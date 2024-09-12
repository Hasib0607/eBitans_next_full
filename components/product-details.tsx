"use client";
import useTheme from "@/hooks/use-theme";
import { useParams } from "next/navigation";
import { lazy, useEffect, useState } from "react";

export interface UpdateData {
  product_id: string;
  store_id: number;
  slug: string;
}

type ParamsType = {
  productID: string;
  slug: string;
};

// Lazy load components
const componentsMap: any = {
  one: lazy(
    () => import("@/components/_product-details-page/product-details/one/one")
  ),
  two: lazy(
    () => import("@/components/_product-details-page/product-details/two/two")
  ),
  three: lazy(
    () =>
      import("@/components/_product-details-page/product-details/three/three")
  ),
  four: lazy(
    () => import("@/components/_product-details-page/product-details/four/four")
  ),
  five: lazy(
    () => import("@/components/_product-details-page/product-details/five/five")
  ),
  six: lazy(
    () => import("@/components/_product-details-page/product-details/six/six")
  ),
  seven: lazy(
    () =>
      import("@/components/_product-details-page/product-details/seven/seven")
  ),
  eight: lazy(
    () =>
      import("@/components/_product-details-page/product-details/eight/eight")
  ),
  nine: lazy(
    () => import("@/components/_product-details-page/product-details/nine/nine")
  ),
  ten: lazy(
    () => import("@/components/_product-details-page/product-details/ten/ten")
  ),
  eleven: lazy(
    () =>
      import("@/components/_product-details-page/product-details/eleven/eleven")
  ),
  twelve: lazy(
    () =>
      import("@/components/_product-details-page/product-details/twelve/twelve")
  ),
  thirteen: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/thirteen/thirteen"
      )
  ),
  fourteen: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/fourteen/fourteen"
      )
  ),
  fifteen: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/fifteen/fifteen"
      )
  ),
  sixteen: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/sixteen/sixteen"
      )
  ),
  seventeen: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/seventeen/seventeen"
      )
  ),
  eighteen: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/eighteen/eighteen"
      )
  ),
  nineteen: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/nineteen/nineteen"
      )
  ),
  twenty: lazy(
    () =>
      import("@/components/_product-details-page/product-details/twenty/twenty")
  ),
  twentyone: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/twenty-one/twenty-one"
      )
  ),
  twentytwo: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/twenty-two/twentytwo"
      )
  ),

  // gtm here
  twentythree: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/twenty-three/twentythree"
      )
  ),
  twentyfour: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/twenty-four/twenty-four"
      )
  ),
  twentyfive: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/twenty-five/twenty-five"
      )
  ),
  twentysix: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/twenty-six/twenty-six"
      )
  ),
  twentyseven: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/twenty-seven/twenty-seven"
      )
  ),
  twentyeight: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/twenty-eight/twenty-eight"
      )
  ),
  twentynine: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/twenty-nine/twenty-nine"
      )
  ),

  // gtm start here
  thirty: lazy(
    () =>
      import("@/components/_product-details-page/product-details/thirty/thirty")
  ),
  thirtythree: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/thirty-three/thirty-three"
      )
  ),
  thirtyfour: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/thirty-four/thirty-four"
      )
  ),
  thirtyfive: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/thirty-five/thirty-five"
      )
  ),
  thirtysix: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/thirty-six/thirty-six"
      )
  ),
  thirtyseven: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/thirty-seven/thirty-seven"
      )
  ),
  thirtyeight: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/thirty-eight/thirty-eight"
      )
  ),
  thirtynine: lazy(
    () =>
      import(
        "@/components/_product-details-page/product-details/thirty-nine/thirty-nine"
      )
  ),
  forty: lazy(
    () =>
      import("@/components/_product-details-page/product-details/forty/forty")
  ),
};

const ProductDetails = () => {
  const { productID: product_id, slug } = useParams<ParamsType>();
  const [updatedData, setUpdatedData] = useState<UpdateData>({
    product_id: "",
    store_id: 0,
    slug: "",
  });

  const { design, store_id } = useTheme();

  useEffect(() => {
    setUpdatedData({ product_id, store_id, slug });
  }, [product_id, store_id, slug]);

  const RenderComponent = componentsMap["eleven"] || null;
  // const RenderComponent = componentsMap[design?.single_product_page] || null;

  return (
    <>
      {RenderComponent && (
        <RenderComponent
          updatedData={updatedData}
          data={{ product_id, slug }}
        />
      )}
    </>
  );
};

export default ProductDetails;
