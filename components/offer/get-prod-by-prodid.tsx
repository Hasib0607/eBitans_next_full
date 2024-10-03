import ProductCard from "./product-card";

const GetProductByProductId = ({ offerProducts }: any) => {
  return (
    <div className="sm:shadow-lg py-5 pb-16 sm:my-10 sm:rounded-md ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {offerProducts !== undefined && (
          <>
            {offerProducts?.map((item: any, id: any) => (
              <>
                <ProductCard key={id} item={item} />
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GetProductByProductId;
