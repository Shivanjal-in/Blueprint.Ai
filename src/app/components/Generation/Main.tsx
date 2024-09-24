import React from "react";

interface MainProps {
  main: string;
  setMain: React.Dispatch<React.SetStateAction<string>>;
}
function Main({ main, setMain }: MainProps) {
  return (
    <>
      <p
        className="text-xl  text-center  text-gray-300 tracking-wide"
        style={{ fontFamily: " 'Cinzel Variable', serif" }}
      >
        Describe the main idea of your software:
      </p>
      <div className="bg-[#00000029] rounded-2xl floating-label  px-5  pb-5">
        <input
          className="bg-transparent py-5 px-3 mt-2 w-96 md:w-[28rem]  custom-border2 outline-none poppins-regular"
          type="text"
          placeholder="Enter the main idea"
          name="main"
          value={main}
          onChange={(e) => setMain(e.target.value)}
          required
        />
      </div>
      <p className="text-sm md:text-base px-5 md:px-0 text-center md:text-left w-[400px] md:w-[500px]">
        For instance, A marketplace for freelancers and service workers, whether
        it's marketing, development, healthcare, finance, consulting, or any
        other type of service. Users can register in the app, post their offers,
        search and find other offers, contact the owner in case an interesting
        proposal is found, and complete the transaction/exchange (outside of the
        platform). All users and listings are posted (available for other users)
        only after Admin's approval. So that Admins can control the quality of
        the community.
      </p>
    </>
  );
}

export default Main;
