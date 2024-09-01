import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";
import { Suspense } from "react";
import RenderSection from "./_homepage/render-section";

const HomePage = async () => {
  const url = getUrl();
  const data = await getSubdomainName(url);
  const { layout } = data;

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
            layout.map((item: any, index: number) => (
              <RenderSection key={item} component={item} data={data} />
            ))}
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
