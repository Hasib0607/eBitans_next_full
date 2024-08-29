import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";
import { Suspense } from "react";
import RenderSection from "./_homepage/render-section";

const HomePage = async () => {
  const url = getUrl();
  const data = await getSubdomainName(url);
  console.log(data, "data");
  const { layout } = data;

  return (
    <>
      <div>
        {/* {layout.map((c: any) => (
          <p>{c}</p>
        ))} */}
        <Suspense
          fallback={
            <p className="h-screen flex justify-center items-center bg-red-500">
              Loading...
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
