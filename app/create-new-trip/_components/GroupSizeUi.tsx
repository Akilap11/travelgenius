import React from "react";
export const SelectTravelesList = [
  {
    id: 1,
    title: "Solo",
    desc: "Traveling alone allows for complete freedom and self-discovery.",
    icon: "🧍‍♂️",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Exploring the world together strengthens your bond and creates lasting memories.",
    icon: "👫",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "Family trips create cherished moments and strengthen relationships across generations.",
    icon: "👨‍👩‍👧",
    people: "3",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Traveling with friends leads to unforgettable adventures and shared experiences.",
    icon: "🌍",
    people: "5 to 10 people",
  },
];
function GroupSizeUi({ onSelectedOption }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1">
      {SelectTravelesList.map((item, index) => (
        <div
          key={index}
          className="p-3 border round-2xl bg-white hover:border-primary cursor-pointer"
          onClick={() => onSelectedOption(item.title + ":" + item.people)}
        >
          <h2>{item.icon}</h2> 
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  );
}
export default GroupSizeUi;
