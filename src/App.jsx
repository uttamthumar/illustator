import React, { useEffect, useState } from "react";
import { button, people } from "./utils/peopelData";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  ALL_PEOPLE,
  BUTTON,
  COUNT,
  SELECTED_PEOPLE,
} from "./redux/action.type";

const App = () => {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [peopelArrays, setPeopelArrays] = useState(people);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const selPeople = useSelector((state) => state.selectedPeople);
  const preCount = useSelector((state) => state.count);
  const prebutton = useSelector((state) => state.button);
  const notavailable = selectedPeople.filter(
    (item) => item.status === "notavailable"
  );
  const handlePeopleEnter = (person) => {
    const personFind = peopelArrays.find((item) => item.id === person);
    if (personFind?.status === "notavailable") {
      personFind.status = "available";
      setSelectedPeople([...selectedPeople, personFind]);
      setPeopelArrays([...peopelArrays]);
    } else if (personFind?.status === "available") {
      personFind.status = "notavailable";
      setSelectedPeople([...selectedPeople, personFind]);
      setPeopelArrays([...peopelArrays]);
    }
  };
  useEffect(() => {
    setCount(preCount);
    setSelectedNumber(selPeople);
    setSelectedNumber(prebutton);
  }, []);

  const handleLiftButtonClick = (number) => {
    if (notavailable.length !== selectedPeople.length) {
      setSelectedNumber(number);
      dispatch({ type: BUTTON, payload: number });
    } else {
      toast.error("Lift should not travel without any passanger");
    }
  };

  useEffect(() => {
    if (notavailable.length !== selectedPeople.length) {
      let intervalId;
      const incrementCount = () => {
        setCount((prevCount) => prevCount + 1);
      };
      const decrementCount = () => {
        setCount((prevCount) => prevCount - 1);
        clearInterval(intervalId);
      };

      if (selectedNumber > count) {
        intervalId = setInterval(incrementCount, 1000);
      } else if (selectedNumber < count) {
        intervalId = setInterval(decrementCount, 1000);
      }
      dispatch({ type: COUNT, payload: count });
      dispatch({ type: SELECTED_PEOPLE, payload: selectedPeople });
      dispatch({ type: ALL_PEOPLE, payload: peopelArrays });
      return () => clearInterval(intervalId);
    }
  }, [count, selectedNumber, selectedPeople.length]);

  return (
    <div className="container  mx-auto my-auto mt- max-w-screen-lg flex items-center justify-center">
      <Toaster />
      <div className="grid grid-cols-4 gap-16 mt-32">
        {peopelArrays?.map((person, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`person${index + 1}`}
              className={`hidden ${
                selectedPeople.includes(index + 1) && "bg-red-700"
              }`}
            />
            <label
              onClick={() => handlePeopleEnter(person.id)}
              className={`${
                person.status === "available" ? "bg-slate-500" : ""
              } w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer`}
            >
              <span className="text-lg">{index + 1}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="px-5 grid grid-cols-2 mt-32 gap-7 justify-center items-center">
        {button.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleLiftButtonClick(item.id)}
            className="bg-slate-800 px-2 py-2 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            {item.id}
          </button>
        ))}
        <div className="flex gap-10 items-center">
          {selectedPeople.length !== 0 && count < selectedNumber ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              // stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                // stroke-linecap="round"
                // stroke-linejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              // stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                // stroke-linecap="round"
                // stroke-linejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          )}

          <input
            className="text-lg ps-7 border border-gray-300 rounded-lg w-16 px-0 py-2"
            type="text"
            value={count}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default App;
