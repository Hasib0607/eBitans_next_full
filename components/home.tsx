import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";
import { Suspense } from "react";
import RenderSection from "./_homepage/render-section";

const HomePage = async () => {
  const url = getUrl();
  const head = "layout,layoutposition,category,banner,brand,testimonials,design";

  const data = await getSubdomainName(url,head);
  
  const layout = data?.layout;
  const layoutposition = data?.layoutposition;

  const sortedLayout = layout
    ? layout.sort((a: any, b: any) => layoutposition[a] - layoutposition[b])
    : []; // Default to an empty array if layout is undefined

  return (
    <>
      <div>
        <Suspense
          fallback={
            <p className="h-screen flex justify-center items-center bg-[#e74c3c]">
              Loading from home...
            </p>
          }
        >
          {sortedLayout.length > 0 &&
            sortedLayout?.map((item: any, index: number) => (
              <RenderSection key={index} component={item} data={data} />
            ))}
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
