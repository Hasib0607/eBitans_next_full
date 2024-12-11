"use client";
import Link from "next/link";
import { iconImg } from "@/site-settings/siteUrl";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";

const CategoryWithSubCat = ({
  item,
  select,
  setSelect,
  expandedCategory,
  setExpandedCategory,
}: any) => {
  const isExpanded = expandedCategory === item?.id;

  const toggleExpand = () => {
    if (isExpanded) {
      setExpandedCategory(null); // Collapse if already expanded
    } else {
      setExpandedCategory(item?.id); // Expand new category
    }
  };

  return (
    <div className="w-full border-b">
      <div className="flex gap-8 items-center py-2 px-2">
        <Link
          onClick={() => setSelect(item?.id)}
          href={"/category/" + item?.id}
          className={`flex-1 flex items-center gap-2 text-lg ${
            select === item.id ? "text-red-500" : "text-gray-900"
          }`}
        >
          <img src={iconImg + item?.icon} className="h-8 w-8" alt="" />
          <p className="ml-5">{item?.name}</p>
        </Link>
        {item?.cat && (
          <div className="px-4 h-full p-2">
            {isExpanded ? (
              <RiArrowDownSLine
                onClick={toggleExpand}
                className="h-4 w-4 lg:cursor-pointer text-gray-800"
              />
            ) : (
              <RiArrowRightSLine
                onClick={toggleExpand}
                className="h-4 w-4 lg:cursor-pointer text-gray-800"
              />
            )}
          </div>
        )}
      </div>
      {isExpanded && (
        <div>
          {item?.cat?.map((sub: any, idx: any) => (
            <div
              className="border-b last:border-none ml-[65px] mr-[30px]"
              key={idx}
            >
              <Link
                onClick={() => setSelect(sub?.id)}
                href={"/category/" + sub?.id}
              >
                <p
                  className={`px-2 pb-2 ${
                    select === sub.id ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {sub?.name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryWithSubCat;
