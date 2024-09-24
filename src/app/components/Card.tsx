import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface CardProps {
  title: string;
  description: string;
  icon: IconDefinition;
}
function Card({ title, description, icon }: CardProps) {
  return (
    <div className="overflow-hidden custom-border4 shadow-md rounded-3xl max-w-screen-sm m-auto mt-4 flex flex-col justify-center items-center">
      <div className="md:h-80 bg-[#00000046] glass w-96 md:w-[30rem] p-14 flex flex-col gap-4 ">
        <div className="flex justify-center items-center gap-8 translate-x-2">
            <FontAwesomeIcon icon={icon} size="2xl" className="scale-150"/> 
            <p style={{ fontFamily: " 'Cinzel Variable', serif" }} className="text-2xl md:text-3xl text-gray-200">{title}</p>
        </div>
        <p className="text-sm md:text-base manrope text-[#ccc]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Card;
