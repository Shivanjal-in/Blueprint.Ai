"use client"
import React, { useState } from "react";

interface PraiseProps {
  name: string;
  praises: string[];
  setPraises: React.Dispatch<React.SetStateAction<string[]>>;
}

const Praise: React.FC<PraiseProps> = ({ name, praises, setPraises }) => {
  const [select, setSelect] = useState(false);
  const handleClick = () => {
    setSelect(!select);
    if (!select) {
      setPraises([...praises, name]);
    } else {
      setPraises(praises.filter((praise) => praise !== name));
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`rounded-full ${!select?"bg-[#0000008b] glass":"praise-gradient"} hover:scale-105 transition-all duration-200 ease-in font-medium text-center px-4 py-2 cursor-pointer`}
    >
      {name}
    </div>
  );
};

export default Praise;
