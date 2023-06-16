// import React, { useState } from 'react';
// import {FaTimes, FaSearch} from 'react-icons/fa';
// import "./Search.css"
// const SearchComponent = ({ searchFilterFunction, search, onCancelText, placeholder,  }) => {
  
//   return ( 
//     <div className="container">
//        <h2>Field   Investigation</h2>
//         <div className='searchContainer'>
            
//       <input
//         className="textInputStyle"
//         type="text"
//         onChange={(event) => searchFilterFunction(event.target.value)}
//         value={search}
//         placeholder="Appl Name / Enq No / Location / Date /Mob No"
//       />
   
//    {search !== ''&&(
//    <FaSearch className='searchIcon'
//     size={15.1}
//     color="white"
// />
//     )}
//     <FaTimes className='Clear'
//        onClick={onCancelText}
//     />
  
//       </div>
//     </div>

//   );
// };
// const Use = () => {
//     const [search, setSearch] = useState('');
  
//     const searchFilterFunction = (text) => {
//       setSearch(text);
  
//     };
  
//     const onCancelText = () => {
//       setSearch('');
//     };
  
//     return (
//       <div>
     
//         <SearchComponent
//           searchFilterFunction={searchFilterFunction}
//           search={search}
//           onCancelText={onCancelText}
//           placeholder="Search"
//           customStyle="custom-container"
//         />
//       </div>
//     );
//   };
  
//   export default Use;




// import React, { useState } from 'react';
// import {FaTimes, FaSearch} from 'react-icons/fa';
// import "./Search.css"
// const SearchComponent = ({ searchFilterFunction, search, onCancelText, placeholder,  }) => {
  
//   return ( 
//     <div className="container">
//        <h2>Field   Investigation</h2>
//         <div className='searchContainer'>
            
//       <input
//         className="textInputStyle"
//         type="text"
//         onChange={(event) => searchFilterFunction(event.target.value)}
//         value={search}
//         placeholder="Appl Name / Enq No / Location / Date /Mob No"
//       />
   
//    {search !== ''&&(
//    <FaSearch className='searchIcon'
//     size={15.1}
//     color="white"
// />
//     )}
//     <FaTimes className='Clear'
//        onClick={onCancelText}
//     />
  
//       </div>
//     </div>

//   );
// };
// const Use = () => {
//     const [search, setSearch] = useState('');
  
//     const searchFilterFunction = (text) => {
//       setSearch(text);
  
//     };
  
//     const onCancelText = () => {
//       setSearch('');
//     };
  
//     return (
//       <div>
     
//         <SearchComponent
//           searchFilterFunction={searchFilterFunction}
//           search={search}
//           onCancelText={onCancelText}
//           placeholder="Search"
//           customStyle="custom-container"
//         />
//       </div>
//     );
//   };
  
//   export default Use;


import React, { useState } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import "./Search.css"

const SearchComponent = ({ searchFilterFunction, search, onCancelText, placeholder }) => {

  return (
    <div className="container">
      <h2>Field Investigation</h2>
      <div className='searchContainer'>
        <div className='inputContainer'>
          <input
            className="textInputStyle"
            type="text"
            onChange={(event) => searchFilterFunction(event.target.value)}
            value={search}
            placeholder={placeholder}
           
          />

          {(search+"").length>0 && (
            <FaSearch className='searchIcon' size={15.1} color="white" />
          )}

          {(search+"").length>0 && (
            <FaTimes className='clearIcon' onClick={onCancelText} />
          )}
        </div>
      </div>
    </div>
  );
};

const Use = () => {
  const [search, setSearch] = useState('');

  const searchFilterFunction = (text) => {
    setSearch(text);
  };

  const onCancelText = () => {
    setSearch('');
  };

  return (
    <div>
      <SearchComponent
        searchFilterFunction={searchFilterFunction}
        search={search}
        onCancelText={onCancelText}
        placeholder="Appl Name / Enq No / Location / Date /Mob No"
        
      />
    </div>
  );
};

export default Use;
