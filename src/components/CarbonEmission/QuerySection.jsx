import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  bike,
  bus,
  clean,
  clothes,
  flight,
  food,
  fooder,
  greenhouse,
  greensec,
  home,
  homicon,
  recycle,
  sec,
  taxi,
  train,
  transicon,
  travel,
  tv,
  vegan,
} from "../../../assets/CarbonEmissions";

export const Query = ({ dataSet }) => {
  console.log("query");
  const icons = [
    homicon,
    homicon,
    homicon,
    homicon,
    homicon,
    transicon,
    transicon,
    transicon,
    transicon,
    transicon,
    food,
    food,
    food,
    food,
    sec,
    sec,
    sec,
    sec,
    sec,
  ];
  const displayImgs = [
    home,
    home,
    home,
    home,
    home,

    taxi,
    bike,
    train,
    bus,
    flight,
    fooder,
    fooder,
    fooder,
    fooder,
    clean,
    clothes,
    tv,
    clean,
    recycle,
  ];
  const [selected, setselected] = useState(false);
  const [selectedOption, setselectedOption] = useState(-1);
  const [selectedOptions, setselectedOptions] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [questionCount, setquestionCount] = useState(0);
  // const [countRatio, setcountRatio] = useState(
  //   (questionCount * 100) / maxQuery
  // );

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const Questions = () => {
    return <div>QuerySection</div>;
  };

  const Options = ({ option, optindex }) => {
    const HandleClick = () => {
      setselectedOption(option);
      console.log(cookies);
      console.log(dataSet[questionCount].values);
      console.log(optindex);
      console.log(dataSet[questionCount].options.indexOf(option));

      setCookie(
        `${dataSet[questionCount].query}`,
        `${dataSet[questionCount].values[optindex]}`,
        {
          path: "/",
        }
      );
    };
    const removeItem = (index) => {
      setselectedOptions([
        ...selectedOptions.slice(0, index),
        ...selectedOptions.slice(index + 1),
      ]);
    };

    const HandleClicked = () => {
      setselectedOptions((selectedOptions) => [...selectedOptions, option]);

      console.log(selectedOptions);
    };

    console.log(selectedOption);
    console.log(dataSet[questionCount].multiple);
    return (
      <div
        onClick={() => {
          if (dataSet[questionCount].multiple) {
            HandleClicked();
          } else {
            HandleClick();
            console.log(selectedOption == option);
          }
        }}
        className={
          dataSet[questionCount].multiple
            ? classNames(
                selectedOptions.includes(option)
                  ? "bg-white ligreen"
                  : "bg-lgreen hover-lgreen text-white hover:bg-white",
                " rounded border-2 bd-lgreen relative w-9/10 p-3 text-base  my-3 cursor-pointer  "
              )
            : classNames(
                selectedOption == option
                  ? "bg-white ligreen"
                  : "bg-lgreen hover-lgreen text-white hover:bg-white",
                " rounded border-2 bd-lgreen relative w-9/10 p-3 text-base  my-3 cursor-pointer  "
              )
        }
      >
        <span
          className={classNames(
            selectedOption == option ? "" : "hidden",
            "absolute left-5"
          )}
        >
          <i className={`bx bx-check-circle bx-sm`}></i>
        </span>
        <p>{option}</p>
      </div>
    );
  };
  console.log(dataSet[questionCount].icon);

  useCallback(() => {
    if (cookies[dataSet[questionCount].query]) {
      setselectedOption(cookies[dataSet[questionCount].query]);
    }
  }, [selectedOption]);
  console.log(dataSet[questionCount].totalindex);
  return (
    <div className="flex flex-col sm:flex-row justify-center text-zinc-800 gap-3rem mt-10 sm:text-xl items-center py-10 pb-20">
      <div className="left sm:w-10/20 w-full">
        <div className="my-4">
          <div className="flex justify-between text-base  items-center font-bold">
            <div className="flex gap-2 items-center">
              <img src={icons[questionCount]} alt="" />
              <p>{dataSet[questionCount].title}</p>
            </div>
            <p>
              Q{dataSet[questionCount].index} of{" "}
              {dataSet[questionCount].totalindex}
            </p>
          </div>
          <div className="bar h-6px rounded bg-grey my-3 w-full flex justify-left items-center">
            <div
              className={`${dataSet[questionCount].width} progress h-4px bg-lgreen rounded`}
            ></div>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-left mb-6">{dataSet[questionCount].query}</p>
          <div className="options w-full flex flex-col items-center">
            {dataSet[questionCount].options.map((option, i) => (
              <Options
                option={option}
                optindex={dataSet[questionCount].options.indexOf(option)}
              />
            ))}
          </div>

          <div className="w-full flex justify-center gap-4rem my-8">
            <div
              onClick={() => {
                console.log(questionCount);
                if (questionCount >= 1) {
                  setselectedOption(-1);
                  setquestionCount(questionCount - 1);
                }
              }}
              className="prev bg-white rounded lgreen px-6 py-2 cursor-pointer"
            >
              Prev
            </div>
            {questionCount + 1 == dataSet.length ? (
              <a
                href="/footprint-results"
                className="next bg-lgreen rounded text-white px-6 py-2 cursor-pointer"
              >
                Finish
              </a>
            ) : (
              <div
                onClick={() => {
                  console.log(questionCount);
                  console.log(dataSet.length);
                  console.log(selectedOption != -1);
                  console.log(dataSet[questionCount].multiple);
                  console.log(questionCount + 1 <= dataSet.length);
                  if (selectedOption != -1) {
                    if (questionCount + 1 <= dataSet.length) {
                      setselectedOption(-1);
                      setquestionCount(questionCount + 1);
                    }
                  }
                  if (dataSet[questionCount].multiple) {
                    setCookie(
                      `${dataSet[questionCount].query}`,
                      `${selectedOptions}`,
                      {
                        path: "/",
                      }
                    );
                    setselectedOptions([]);
                    setquestionCount(questionCount + 1);
                  }
                }}
                className="next bg-lgreen rounded text-white px-6 py-2 cursor-pointer"
              >
                Next
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="right sm:w-9/20 bg-lgreen text-white rounded-3xl p-1 flex flex-col items-center overflow-hidden">
        <img className="rounded-3xl" src={displayImgs[questionCount]} alt="" />
        <div className="text-sm text-left w-9/10 my-6">
          <div className=" px-4 py-2 bg-white rounded w-max lgreen font-bold text-2xl">
            DID YOU KNOW?
          </div>
          {/* <h3 className="font-bold text-xl my-4">
            {dataSet[questionCount].displayTitle}
          </h3> */}
          <p className="mt-4 text-base">{dataSet[questionCount].displayText}</p>
        </div>
      </div>
    </div>
  );
};

// export const Query = ({
//   dataSet,
//   nextQuery,
//   prevQuery,
//   dataIndex,
//   dataSections,
// }) => {
//   console.log("query");
//   const icons = [homicon, transicon, food, sec];
//   const displayImgs = [greenhouse, travel, vegan, greensec];
//   let maxQuery = dataSet.questions.length;
//   const [questionCount, setquestionCount] = useState(1);
//   const [countRatio, setcountRatio] = useState(
//     (questionCount * 100) / maxQuery
//   );

//   function classNames(...classes) {
//     return classes.filter(Boolean).join(" ");
//   }
//   const Questions = ({ question, index }) => {
//     const [selectedOption, setselectedOption] = useState(-1);
//     const Options = ({ option, optindex }) => {
//       const [cookies, setCookie] = useCookies();
//       const [selected, setselected] = useState(false);
//       const HandleClick = () => {
//         setselectedOption(optindex);
//         console.log(optindex);
//         console.log(selectedOption);
//         console.log("clicked");
//         setCookie(`${question}`, `${optindex}`, { path: "/" });
//       };

//       if (cookies[question]) {
//         setselectedOption(cookies[question]);
//       }

//       return (
//         <div
//           onClick={() => {
//             HandleClick();
//             console.log(selectedOption == optindex);
//           }}
//           className={classNames(
//             selectedOption == optindex
//               ? "bg-white lgreen"
//               : "bg-lgreen hover-lgreen text-white hover:bg-white",
//             " rounded border-2 bd-lgreen relative w-9/10 p-3   my-3 cursor-pointer  "
//           )}
//         >
//           <span
//             className={classNames(
//               selectedOption == optindex ? "" : "hidden",
//               "absolute left-5"
//             )}
//           >
//             <i className={`bx bx-check-circle bx-sm`}></i>
//           </span>
//           <p>{option}</p>
//         </div>
//       );
//     };
//     return (
//       <div className={questionCount - 1 == index ? "block" : "hidden"}>
//         <p className="text-left mb-6">{question}</p>
//         <div className="options w-full flex flex-col items-center">
//           {dataSet.options[index].map((option, i) => (
//             <Options option={option} optindex={i} />
//           ))}
//         </div>
//       </div>
//     );
//   };
//   return (
//     <div className="flex flex-col sm:flex-row justify-center text-zinc-800 gap-3rem mt-10 sm:text-xl items-center py-10 pb-20">
//       <div className="left sm:w-10/20 w-full">
//         <div className="my-4">
//           <div className="flex justify-between text-base  items-center font-bold">
//             <div className="flex gap-2 items-center">
//               <img src={icons[dataIndex]} alt="" />
//               <p>{dataSet.title}</p>
//             </div>
//             <p>
//               Q{questionCount} of {dataSet.questions.length}
//             </p>
//           </div>
//           <div className="bar h-6px rounded bg-grey my-3 w-full flex justify-left items-center">
//             <div
//               className={classNames(
//                 questionCount == dataSet.questions.length ? " w-full" : `w-2/5`,
//                 "progress h-4px bg-lgreen rounded"
//               )}
//             ></div>
//           </div>
//         </div>
//         <div className="mt-8">
//           {dataSet.questions.map((question, i) => (
//             <Questions question={question} index={i} />
//           ))}

//           <div className="w-full flex justify-center gap-4rem my-8">
//             <div
//               onClick={() => {
//                 console.log(dataSections);
//                 console.log(dataIndex);
//                 console.log(questionCount);
//                 if (dataSections <= dataIndex + 1 && questionCount > 1) {
//                   console.log(dataIndex);
//                   setquestionCount(questionCount - 1);
//                 }
//                 if (dataSections <= dataIndex + 1 && questionCount == 1) {
//                   console.log(dataIndex);
//                   prevQuery(dataIndex);
//                   setquestionCount(dataSet.questions.length);
//                 }
//               }}
//               className="prev bg-white rounded lgreen px-6 py-2 cursor-pointer"
//             >
//               Prev
//             </div>
//             <div
//               onClick={() => {
//                 console.log(dataSections);
//                 console.log(dataIndex);
//                 console.log(questionCount);
//                 if (
//                   dataSections >= dataIndex + 1 &&
//                   questionCount < dataSet.questions.length
//                 ) {
//                   console.log(dataIndex);
//                   setquestionCount(questionCount + 1);
//                 }
//                 if (
//                   dataSections > dataIndex + 1 &&
//                   questionCount == dataSet.questions.length
//                 ) {
//                   console.log(dataIndex);
//                   nextQuery(dataIndex);
//                   setquestionCount(1);
//                 }
//               }}
//               className="next bg-lgreen rounded text-white px-6 py-2 cursor-pointer"
//             >
//               Next
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="right sm:w-9/20 bg-lgreen text-white rounded-3xl p-1 flex flex-col items-center overflow-hidden">
//         <img className="rounded-3xl" src={displayImgs[dataIndex]} alt="" />
//         <div className="text-sm text-left w-9/10 my-6">
//           <div className=" px-4 py-2 bg-white rounded w-max lgreen font-bold text-2xl">
//             DID YOU KNOW?
//           </div>
//           <h3 className="font-bold text-xl my-4">
//             YOUR DIET IS AN IMPORTANT PART OF YOUR CARBON FOOTPRINT.
//           </h3>
//           <p>
//             Food bought in restaurants has a wider footprint than food you buy
//             to cook at home because of the ‘overheads’ in the restaurants – the
//             emissions associated with heating, lighting and cooking for your
//             meal. Food from takeaways has additional packaging and additional
//             transport emissions, from the means of getting it from the
//             restaurant to your home.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
