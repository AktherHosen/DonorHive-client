import React from "react";
import Container from "../Container";
import SectionTitle from "../SectionTitle";

const Campaign = () => {
  return (
    <Container>
      <div className="my-10">
        <h1 className="font-normal font-bebas uppercase mb-4 text-2xl  tracking-wider">
          Campaign
        </h1>
        <div className="grid grid-cols-3 gap-3 ">
          <img
            src="https://i.ibb.co.com/51FKqSY/g1.png"
            className="h-full"
            alt=""
          />
          <img
            src="https://i.ibb.co.com/6yKJfzy/g2.pngh"
            className="h-full"
            alt=""
          />
          {/* <img
            src="https://i.ibb.co.com/HnJ4GDc/g6.png"
            className="row-span-2 "
            alt=""
          /> */}
          <img
            src="https://i.ibb.co.com/V9Sdwhv/g6-1.png"
            className="row-span-2  h-full"
            alt=""
          />
          <img
            src="https://i.ibb.co.com/c6xmzsk/g3.png"
            className="h-full"
            alt=""
          />
          <img
            src="https://i.ibb.co.com/tqBDQxW/g5.png"
            alt=""
            className="h-full"
          />
        </div>
      </div>
    </Container>
  );
};

export default Campaign;
