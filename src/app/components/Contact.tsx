import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/components/ui/use-toast";
import { Loader, Loader2 } from "lucide-react";


function Contact() {
  const { toast } = useToast();
  const [nameCheck, setNameCheck] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [subjectCheck, setSubjectCheck] = useState("");
  const [messageCheck, setMessageCheck] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameCheck === "") {
      toast({
        title: "Message Failed",
        description: "Include your name!",
        variant: "destructive",
      });
    } else if (emailCheck === "") {
      toast({
        title: "Message Failed",
        description: "Include your email!",
        variant: "destructive",
      });
    } else if (subjectCheck === "") {
      toast({
        title: "Message Failed",
        description: "Include a subject!",
        variant: "destructive",
      });
    } else if (messageCheck === "") {
      toast({
        title: "Message Failed",
        description: "Include a message!",
        variant: "destructive",
      });
    } else {
      setIsSubmitting(true);
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
          formRef.current as HTMLFormElement,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string
        )
        .then(
          (result) => {
            setIsSubmitting(false);
            console.log(result.text);
            toast({
              title: "Message Sent!",
              variant: "success",
            });
          },
          (error) => {
            console.log(error.text);
            toast({
              title: "An error occured :(",
              description: error.text,
              variant: "destructive",
            });
          }
        );
    }
  };
  return (
    <div
      id="contact"
      className="my-32 space-y-8 flex flex-col justify-center items-center px-5 md:px-32"
    >
      <p
        style={{ fontFamily: " 'Cinzel Variable', serif" }}
        className="text-4xl md:text-6xl text-center tracking-wider font-medium text-white  font-gradient"
      >
        Let's get in touch!
      </p>
      <p className="text-sm md:text-xl manrope text-center  text-gray-300">
        We are open to any suggestions and would greatly appreciate your input
        or feedback
      </p>
      <form
        className="floating-label black-container flex flex-col items-center justify-around w-full md:w-80 my-2 text-lg"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <input
          className="bg-transparent py-5 px-3 w-96 md:w-[35rem] custom-border2 outline-none"
          type="text"
          placeholder="Enter your full name"
          name="user_name"
          required
          onChange={(e) => setNameCheck(e.target.value)}
        />
        <input
          className="bg-transparent py-5 px-3 w-96 md:w-[35rem] custom-border2 outline-none"
          type="email"
          placeholder="Enter your email address"
          name="user_email"
          required
          onChange={(e) => setEmailCheck(e.target.value)}
        />
        <input
          className="bg-transparent py-5 px-3 w-96 md:w-[35rem] custom-border2 outline-none"
          type="text"
          placeholder="Enter the subject of your message"
          name="user_subject"
          required
          onChange={(e) => setSubjectCheck(e.target.value)}
        />
        <textarea
          className="bg-transparent py-5 px-3 w-96 md:w-[35rem] custom-border2 outline-none"
          rows={4}
          required
          name="message"
          placeholder="Enter your message here..."
          onChange={(e) => setMessageCheck(e.target.value)}
        ></textarea>
        <div className={`mt-10 button`}>
          <div className="button-layer"></div>
          <button
            type="submit"
            style={{ fontFamily: " 'Cinzel Variable', serif" }}
            className="bg-black px-4 py-3 w-full text-2xl  font-semibold tracking-wide flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-7 w-7  animate-spin" /> Sending...
              </>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
