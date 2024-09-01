const FeaturedTwentySix = () => {
  const waveStyle = `
    .svg {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .containerDiv {
        display: inline-block;
        position: absolute;
        width: 100%;
        vertical-align: middle;
        overflow: hidden;
        top: 10;
        left: 0;
    }
    
    `;
  return (
    <div className="mt-10 relative">
      <style>{waveStyle}</style>

      <div className="containerDiv ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="0.1"
            d="M0,0L40,26.7C80,53,160,107,240,138.7C320,171,400,181,480,170.7C560,160,640,128,720,138.7C800,149,880,203,960,202.7C1040,203,1120,149,1200,122.7C1280,96,1360,96,1400,96L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="z-[1] relative">twenty six</div>
      <div className="">
        <h1>hlwwww</h1>
      </div>
    </div>
  );
};

export default FeaturedTwentySix;
