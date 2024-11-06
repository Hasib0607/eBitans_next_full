import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";
import { Suspense } from "react";
import RenderSection from "./_homepage/render-section";

const HomePage = async () => {
  const url = getUrl();
  const data = await getSubdomainName(url);
  const layout = data?.layout;
  const layoutposition = data?.layoutposition;

  const sortedLayout = layout.sort(
    (a: any, b: any) => layoutposition[a] - layoutposition[b]
  );

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
          {layout &&
            sortedLayout.map((item: any, index: number) => (
              <RenderSection key={item} component={item} data={data} />
            ))}
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
