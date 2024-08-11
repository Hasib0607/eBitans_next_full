import React from "react";

const CallForPrice = ({
  product,
  headerSetting,
  cls,
  price,
  store_id,
}: any) => {
  return (
    <>
      {price === 0 && (
        <div>
          <a href={"tel:+88" + headerSetting?.phone}>
            <p className={cls}>
              {store_id !== 2875 ? "Call for Price" : "Select Book"}
            </p>
          </a>
        </div>
      )}
    </>
  );
};

export default CallForPrice;
