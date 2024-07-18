import React from "react";

const courts = [
  {
    img: "/football_card.jpg",
    name: "Football Court",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: "/bball_card.jpg",
    name: "Basketball Court",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: "/tennis_card.jpg",
    name: "Tennis Court",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: "/padel_card.jpg",
    name: "Padel Court",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function Section_1() {
  return (
    <div className="relative flex flex-col items-center mt-28 z-10 w-full">
      <div className="absolute bottom-52 right-0 z-0">
        <div className="bg-gradient-to-r gradient-angle from-[#171717] to-[#2c2c2c] rounded-full size-64"></div>
      </div>
      <div className="flex items-center gap-2 mb-10 self-start ml-32">
        <div className="h-16 w-1 bg-[#27c6a9]"></div>
        <div className="text-3xl font-bold text-white z-0">
          <p>Available</p>
          <p>Courts</p>
        </div>
      </div>
      <div className="flex justify-center gap-6 mx-32">
        {courts.map((court, index) => (
          <div
            key={index}
            className="bg-[#2c2c2c] p-4 rounded-lg shadow-lg w-full mb-8 z-0"
          >
            <img
              src={court.img}
              alt={court.name}
              className="h-32 w-full object-cover rounded-md mb-4"
            />
            <p className="text-white text-lg font-semibold">{court.name}</p>
            <p className="text-[#777777] text-sm font-semibold">{court.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
