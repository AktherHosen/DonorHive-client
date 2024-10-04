import React from "react";

const Featured = () => {
  return (
    <div>
      <h1 className="font-bold font-bebas uppercase text-2xl my-4 tracking-wider">
        SERVICES
      </h1>
      <hr />
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-2">
          <img
            src="https://i.ibb.co.com/ZfMh4D4/blood-donation.png"
            className="h-full w-full"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-end space-y-3 p-2">
          <h1 className="text-8xl font-bold text-gray-300">01</h1>
          <h2 className="uppercase font-bold text-2xl">
            {" "}
            Donation <span className="text-primary font-extrabold">
              Blood
            </span>{" "}
          </h2>
          <p className="text-justify">
            Donating blood is a simple, lifesaving act where individuals
            voluntarily give their blood to help those in need. Blood donations
            are crucial for surgeries, emergencies, and treating medical
            conditions like anemia or cancer. By donating, you provide a vital
            resource that can save lives, improve health, and support hospitals
            in times of crisis. It's a generous way to contribute to your
            community and make a meaningful difference in the lives of others.
          </p>
        </div>
        <div className="flex flex-col justify-center space-y-3 p-2">
          <h1 className="text-8xl font-bold text-gray-300">02</h1>
          <h2 className="uppercase font-bold text-2xl">
            Donate <span className="text-primary font-extrabold">Fund</span>
          </h2>
          <p className="text-justify">
            Donating funds to an organization is a powerful way to support their
            mission and help them expand their impact. Whether it's a charity, a
            nonprofit, or a community initiative, By donating, you help
            organizations reach more people, improve their infrastructure, and
            sustain their vital work, enabling them to make a greater difference
            in society. Every contribution, big or small, helps create lasting
            change.
          </p>
        </div>
        <div className="border p-2">
          <img
            src="https://i.ibb.co.com/bdLD5yh/donation.png"
            className="h-full w-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
