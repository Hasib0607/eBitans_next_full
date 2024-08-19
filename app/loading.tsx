import { getSubdomainName } from "@/lib";
import getUrl from "@/utils/get-url";

const loading = async () => {

  const url = getUrl();
  const data = await getSubdomainName(url);
  const { design } = data;

  const No_Of_Loading_Spiner = design?.hero_slider || 1; 

  const renderLoader = () => {
    switch(No_Of_Loading_Spiner) {
      case 1:
        
        return (
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-600"></div>
        );
      case 2:
      
        return (
          <div className="w-16 h-16 bg-violet-600 animate-spin-slow transform rotate-45"></div>
        );
      case 3:
     
        return (
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 bg-violet-600 rounded-full animate-ping absolute"></div>
            <div className="w-8 h-8 bg-violet-800 rounded-full"></div>
          </div>
        );
      case 4:
      
        return (
          <div className="w-16 h-16 border-4 border-t-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
        );
      case 5:
       
        return (
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-violet-600 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-violet-600 rounded-full animate-bounce delay-200"></div>
            <div className="w-4 h-4 bg-violet-600 rounded-full animate-bounce delay-400"></div>
          </div>
        );
      default:
        
        return (
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-600"></div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {renderLoader()}
    </div>
  );
};

export default loading;
