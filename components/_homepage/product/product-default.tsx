"use client";
import Card14 from "@/components/card/card14";

const DefaultProduct = ({ product }: any) => {
  return (
    <>
      <div className="container my-9">
        <h4 className="font-semibold text-3xl text-left mx-4 md:m-0">
          {"Products"}
        </h4>
      </div>
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 sm:px-4">
          {product?.slice(0, 8).map((item: any, id: any) => (
            <a
              key={id}
              href="https://admin.ebitans.com/design/homepage/product"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{item.name}</p>
              <Card14 item={item} key={id} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default DefaultProduct;
