const googleMap = (): any => {
  return (
    <div className="relative w-full mt-[20px]">
      <div style={{ width: "100%" }}>
        <iframe
          title="map"
          width={"80%"}
          height={"300"}
          frameBorder="0"
          scrolling="no"
          src="https://maps.google.com/maps?q=23%C2%B045'54.1%22N%2090%C2%B025'41.0%22E&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
        >
          <a href="https://www.gps.ie/farm-gps/">farm gps</a>
        </iframe>
      </div>
    </div>
  );
};
export default googleMap;
