import React from 'react';

export const SelectTravelersList = [
  { id:1, title:"Solo", people:"1", icon:"🧍‍♂️" },
  { id:2, title:"Couple", people:"2", icon:"👫" },
  { id:3, title:"Family", people:"3", icon:"👨‍👩‍👧" },
  { id:4, title:"Friends", people:"5-10", icon:"🌍" }
];

function GroupSizeUi({ onSelectedOption }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
      {SelectTravelersList.map((item) => (
        <div
          key={item.id}
          className="p-3 border rounded-2xl bg-white cursor-pointer flex flex-col items-center hover:border-primary"
          onClick={() => onSelectedOption(item.title)}
        >
          <div className="text-3xl">{item.icon}</div>
          <h2 className="mt-2 font-semibold">{item.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default GroupSizeUi;
