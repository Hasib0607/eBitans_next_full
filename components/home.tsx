import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";
import { Suspense } from "react";
import RenderSection from "./_homepage/render-section";

const HomePage = async () => {
  const url = getUrl();
  const data = await getSubdomainName(url);
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
            <p className="h-screen flex justify-center items-center bg-red-500">
              Loading from home...
            </p>
          }
        >
          {sortedLayout.length > 0 &&
            sortedLayout?.map((item: any, index: number) => (
              <RenderSection key={item} component={item} data={data} />
            ))}
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
