import React from "react";
import { MdMarkEmailUnread, MdPermPhoneMsg } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
const Contact = () => {
  const handleContact = (e) => {
    e.preventDefault();
    e.target.reset();
    toast.success("Thanks for contacting us.");
  };
  return (
    <div className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div>
          <h1 className="text-3xl font-semibold mb-4 font-bebas tracking-wider">
            Let's Donate Together
          </h1>
          <div className="flex flex-col justify-center space-y-4">
            <p>
              If you have any questions, need assistance, or want to learn more
              about our services, feel free to reach out! We're here to help.
              You can contact us via phone, email, or through our online form,
              and a member of our team will get back to you as soon as possible.
              We look forward to hearing from you!
            </p>
            <div>
              <h1 className="flex items-center gap-2">
                <MdMarkEmailUnread size={20} />
                <span className="font-semibold text-lg"> donor@hive.com</span>
              </h1>
              <h1 className="flex items-center gap-2">
                <MdPermPhoneMsg size={20} />
                <span className="font-semibold text-lg">
                  {" "}
                  (+880)-1610945101
                </span>
              </h1>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold uppercase font-bebas tracking-wider">
            Contact Us
          </h1>
          <form onSubmit={handleContact}>
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="lg:w-1/2">
                <label htmlFor="name" className="block text-xm label">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border px-4 py-3 w-full outline-none"
                />
              </div>
              <div className="lg:w-1/2">
                <label htmlFor="email" className="block text-xm label">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="border px-4 py-3 w-full outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-xm label">
                Message
              </label>
              <textarea
                name=""
                placeholder="Enter your message"
                id=""
                className="border px-4 py-3 w-full resize-none h-32 outline-none"
              ></textarea>
            </div>
            <button className="bg-primary flex items-center gap-2 text-white rounded-md font-semibold px-4 py-2 mt-2">
              Send
              <BsSendFill size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
