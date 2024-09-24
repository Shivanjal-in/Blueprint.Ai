interface TimelineProps {
  currentStep: number;
  step:number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

function Timeline({ currentStep, setCurrentStep, step }: TimelineProps) {
  const handleClick = (num:number) => {
    setCurrentStep(num);
  };

  return (
    <div className=" bg-transparent w-full py-5 text-xs md:text-base rounded-2xl flex justify-start items-center">
      <div className="flex gap-5">
      <div onClick={() => handleClick(1)}
          className={`rounded-full cursor-pointer p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 1
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          1
        </div>
      </div>
      <div
        className={`w-4 md:w-5 border-t-2    ${
          currentStep >= 2 ? "border-[#0253b9]" : "border-[#c5c5c59c]"
        }`}
      ></div>
      <div className="flex gap-5">
        <div
        onClick={() => handleClick(2)}
          className={`rounded-full ${step<2?"pointer-events-none opacity-40":""} cursor-pointer p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 2
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          2
        </div>
      </div>
      <div
        className={`w-4 md:w-5 border-t-2    ${
          currentStep >= 3 ? "border-[#0253b9]" : "border-[#c5c5c59c]"
        }`}
      ></div>
      <div className="flex gap-5 ">
        <div
        onClick={() => handleClick(3)}
          className={`rounded-full ${step<3?"pointer-events-none opacity-40":""} cursor-pointer p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 3
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          3
        </div>
      </div>
      <div
        className={`w-4 md:w-5 border-t-2    ${
          currentStep >= 4 ? "border-[#0253b9]" : "border-[#c5c5c59c]"
        }`}
      ></div>
      <div className="flex gap-5 ">
        <div
        onClick={() => handleClick(4)}
          className={`rounded-full ${step<4?"pointer-events-none opacity-40":""} p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 4
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          4
        </div>
      </div>
      <div
        className={`w-4 md:w-5 border-t-2    ${
          currentStep >= 5 ? "border-[#0253b9]" : "border-[#c5c5c59c]"
        }`}
      ></div>
      <div className="flex gap-5 ">
        <div
        onClick={() => handleClick(5)}
          className={`rounded-full ${step<5?"pointer-events-none opacity-40":""} cursor-pointer p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 5
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          5
        </div>
      </div>
      <div
        className={`w-4 md:w-5 border-t-2    ${
          currentStep >= 6 ? "border-[#0253b9]" : "border-[#c5c5c59c]"
        }`}
      ></div>
      <div className="flex gap-5 ">
        <div
        onClick={() => handleClick(6)}
          className={`rounded-full ${step<6?"pointer-events-none opacity-40":""} cursor-pointer p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 6
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          6
        </div>
      </div>
      <div
        className={`w-4 md:w-5 border-t-2    ${
          currentStep >= 7 ? "border-[#0253b9]" : "border-[#c5c5c59c]"
        }`}
      ></div>
      <div className="flex gap-5 ">
        <div
        onClick={() => handleClick(7)}
          className={`rounded-full ${step<7?"pointer-events-none opacity-40":""} cursor-pointer p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 7
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          7
        </div>
      </div>
      <div
        className={`w-4 md:w-5 border-t-2    ${
          currentStep >= 8 ? "border-[#0253b9]" : "border-[#c5c5c59c]"
        }`}
      ></div>
      <div className="flex gap-5 ">
        <div
        onClick={() => handleClick(8)}
          className={`rounded-full ${step<8?"pointer-events-none opacity-40":""} cursor-pointer p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 8
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          8
        </div>
      </div>
      <div
        className={`w-4 md:w-5 border-t-2    ${
          currentStep >= 9 ? "border-[#0253b9]" : "border-[#c5c5c59c]"
        }`}
      ></div>
      <div className="flex gap-5 ">
        <div
        onClick={() => handleClick(9)}
          className={`rounded-full ${step<9?"pointer-events-none opacity-40":""} cursor-pointer p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 9
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          9
        </div>
      </div>
      <div
        className={`w-4 md:w-5 border-t-2    ${
          currentStep >= 10 ? "border-[#0253b9]" : "border-[#c5c5c59c]"
        }`}
      ></div>
      <div className="flex gap-5 ">
        <div
        onClick={() => handleClick(10)}
          className={`rounded-full ${step<10?"pointer-events-none opacity-40":""} cursor-pointer p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 10
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          10
        </div>
      </div>
      <div
        className={`w-4 md:w-5 border-t-2    ${
          currentStep >= 11 ? "border-[#0253b9]" : "border-[#c5c5c59c]"
        }`}
      ></div>
      <div className="flex gap-5 ">
        <div
        onClick={() => handleClick(11)}
          className={`rounded-full ${step<11?"pointer-events-none opacity-40":""} cursor-pointer p-2 md:p-3 w-6 h-6 md:w-8 md:h-8 flex justify-center items-center font-semibold ${
            currentStep >= 11
              ? "text-white bg-[#0253b9]"
              : "text-gray-300 bg-[#00000029] custom-border3"
          }`}
        >
          11
        </div>
      </div>
      
    </div>
  );
}

export default Timeline;
