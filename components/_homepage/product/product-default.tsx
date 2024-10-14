"use client";
import Card14 from "@/components/card/card14";
import useHeaderSettings from "@/utils/query/use-header-settings";

const DefaultProduct = ({ product }: any) => {
  const { data, error } = useHeaderSettings();
  const { title, title_color } = data?.data?.custom_design?.product?.[0] || {};
  if (error) {
    return <p> error from headersettings</p>;
  }

  return (
    <>
      <div className="container my-9">
        <h4
          style={{ color: title_color }}
          className="font-semibold text-3xl text-left mx-4 md:m-0"
        >
          {title || "Products"}
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
