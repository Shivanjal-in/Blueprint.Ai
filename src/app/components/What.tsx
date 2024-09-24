import React from "react";
import Card from "./Card";
import { faFileAlt, faClock, faUsersGear, faHandshake, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faFileAlt, faClock, faUsersGear, faHandshake);

function What() {
  return (
    <section>
      {/* <div className='color'></div>
<div className='color'></div> */}
      <div id="what" className="my-32 space-y-8 flex flex-col justify-center items-center px-5 md:px-32">
        <p
          style={{ fontFamily: " 'Cinzel Variable', serif" }}
          className="text-3xl md:text-6xl text-center tracking-wider font-medium text-white  font-gradient"
        >
          What is AI SRS Generator?
        </p>
        <p className=" md:text-xl manrope text-center  text-gray-300 md:w-[60rem]">
          Whether you're working with an in-house team or collaborating with
          external development partners, ensuring that everyone is on the same
          page from the very beginning is paramount. Our tool helps you generate
          a concise yet detailed initial draft of your software requirements.
          This draft serves as a starting point that you can easily supplement
          and refine throughout the course of your project.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 ">
          <Card
            icon={faFileAlt}
            title="Effortless Drafting"
            description="Our tool assists you in creating a preliminary software requirement
            specification based on the information you provide. It generates a
            draft that outlines the fundamental aspects of your project."
            />
          <Card
            icon={faClock}
            title="Save Time and Resources"
            description="Instead of spending excessive time deliberating over every detail in the early stages, our tool jumpstarts the process. This means you can dedicate more time to the creative and strategic aspects of your project."
            />
          <Card
            icon={faUserGear}
            title="Customization Collaboration"
            description="The generated draft is not set in stone. It's a dynamic document that you can customize according to your specific needs. Collaborate with your team to add, modify, or remove requirements as the project evolves."
            />
          <Card
            icon={faHandshake}
            title="Minimize Misunderstandings"
            description="By having a foundational SRS in place, you reduce the risk of misunderstandings between you, your team, and your development partners. Everyone has a clear understanding of the project's scope and objectives."
          />
        </div>
      </div>
    </section>
  );
}

export default What;
