import React from "react";
import cover from "../assets/cover.png";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-2">
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="p-2 flex justify-center">
          <img src={cover} alt="cover"  className=" max-h-fit w-auto"/>
        </div>
        <div className="flex flex- justify-center flex-col items-center">
          <h1 className="text-4xl text-white font-bold">Welcome To Chess</h1>
          <p className="text-lg text-white mt-2">Play Chess on #3 Website </p>
          <div className="mt-4">
          <button onClick={()=>navigate("/game")} className="bg-blue-500 hover:bg-blue:700 text-white font-bold py-2 px-4 rounded">
            PLAY ONLINE
          </button>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Landingpage;
