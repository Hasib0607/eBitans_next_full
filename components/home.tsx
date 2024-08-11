import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";
import { Suspense } from "react";
import RenderSection from "./_homepage/render-section";

const HomePage = async () => {
  const url = getUrl();

  const data = await getSubdomainName(url);
  const { layout, design } = data;

  return (
    <>
      <div
        className={`${
          design?.template_id === "34" ? "bg-thirty-one" : "bg-white"
        } mx-auto`}
      >
        <Suspense>
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
