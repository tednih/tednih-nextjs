// import React from "react";

// const FilterLabel = () => {
//   return (
//     <div className="bg-zinc-200 dark:bg-zinc-800 lg:max-w-[800px] md:max-w-[600px] max-w-[430px] m-auto rounded-xl items-center backdrop-blur-md mb-4">
//       <ol className="flex flex-row justify-between">
//         {selectedLabelRole.map((role, index) => (
//           <li className="bg-LighGrayishTablet pl-2 rounded-md space-x-3">
//             <div className="text-VeryDarkGrayish flex justify-between items-center">
//               {role}
//               <button
//                 className="ml-2 bg-primary w-9 h-9 rounded-r-md hover:bg-VeryDarkGrayish text-white"
//                 onClick={() => {
//                   const newRole = [...selectedLabelRole];
//                   newRole.splice(index, 1);
//                   setSelectedLabelRole(newRole);
//                 }}
//               >
//                 X
//               </button>
//             </div>
//           </li>
//         ))}
//         <li>Clear</li>
//       </ol>
//     </div>
//   );
// };

// export default FilterLabel;
