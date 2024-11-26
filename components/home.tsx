import getUrl from "@/utils/get-url";
import RenderSection from "./_homepage/render-section";
import { getDomainInfo } from "@/lib";

const HomePage = async () => {
  const url = getUrl();
  const generalData = await getDomainInfo(url);

  let content = null;

  if (generalData) {
    const layout = generalData?.layout;
    const layoutposition = generalData?.layoutposition;

    const sortedLayout = layout
      ? layout.sort((a: any, b: any) => layoutposition[a] - layoutposition[b])
      : [];

      if(sortedLayout.length > 0){
        content =
        <div>
          {sortedLayout?.map((item: any, index: number) => (
              <RenderSection key={index} component={item} data={generalData} />
            ))}
        </div>;
      }
  }

  return content;

};

export default HomePage;
