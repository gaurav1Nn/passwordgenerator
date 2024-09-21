// import { useState, useCallback, useEffect, useRef } from 'react'



// function App() {
//   const [length, setLength] = useState(8)
//   const [numberAllowed, setNumberAllowed] = useState(false);
//   const [charAllowed, setCharAllowed] = useState(false)
//   const [password, setPassword] = useState("")

//   //useRef hook
//   const passwordRef = useRef(null)
// // usecallback is used to optimise the code 
//   const passwordGenerator = useCallback(() => {
//     let pass = ""
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
//     if (numberAllowed) str += "0123456789"
//     if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

//     for (let i = 1; i <= length; i++) {
//       let char = Math.floor(Math.random() * str.length + 1)
//       pass += str.charAt(char) // concatenate
      
//     }
//     setPassword(pass)

//   }, [length, numberAllowed, charAllowed, setPassword])

//   const copyPasswordToClipboard = useCallback(() => {
//     passwordRef.current?.select();
//     passwordRef.current?.setSelectionRange(0, 999);
//     window.navigator.clipboard.writeText(password)
//   }, [password])

//   // use effect hook
//   useEffect(() => {
//     passwordGenerator()
//   }, [length, numberAllowed, charAllowed, passwordGenerator])
//   return (
    
//     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
//       <h1 className='text-white text-center my-3'>Password generator</h1>
//     <div className="flex shadow rounded-lg overflow-hidden mb-4">
//         <input
//             type="text"
//             value={password}
//             className="outline-none w-full py-1 px-3"
//             placeholder="Password "
//             readOnly
//             ref={passwordRef}
//         />
//         <button
//           onClick={copyPasswordToClipboard}
//          className='outline-none  bg-blue-700 text-white px-3 py-0.5 shrink-0'>
//           copy
//         </button>
//       </div>
//       <div className='flex text-sm gap-x-2'>
//         <div className='flex items-center gap-x-1'>
//           <input type="range" 
//           min={6} 
//           max={100}
//           value={length}
//           className='cursor-pointer'
//           onChange={(e) => {setLength(e.target.value)}}
//           />
//           <label>Length:{length}</label>
//         </div>
//         <div className='flex items-center gap-x-1'> 
//           <input type="checkbox" 
//             defaultChecked = {numberAllowed}
//             id="numberInput"
//             onChange={()=>{
//               setNumberAllowed((prev => !prev));
//             }}
//           />
//         <label htmlFor="numberInput">Numbers</label>
//         </div>
//         <div className='flex items-center gap-x-1'> 
//           <input type="checkbox" 
//             defaultChecked = {charAllowed}
//             id="characterInput"
//             onChange={()=>{
//               setNumberAllowed((prev => !prev));
//             }}
//           />
//         <label htmlFor="numberInput">Characters</label>
//         </div>
//       </div>
// </div>
    
//   )
// }

// export default App


import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // useRef hook for the password input
  const passwordRef = useRef(null);

  // Password generator function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789"; // Add numbers if enabled
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"; // Add special characters if enabled

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length); // Select random character
      pass += str.charAt(char); // Append to password string
    }

    setPassword(pass); // Set generated password
  }, [length, numberAllowed, charAllowed]);

  // Copy password to clipboard function
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999); // Select all the text
    window.navigator.clipboard.writeText(password); // Copy text to clipboard
  }, [password]);

  // useEffect to regenerate password when length, numberAllowed, or charAllowed changes
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className={`w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <h1 className={`text-center my-3 ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}>Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className={`outline-none w-full py-1 px-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
          placeholder="Password "
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          Copy
        </button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed(prev => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed(prev => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>

      {/* Dark Mode Toggle Button */}
      <div className="mt-4">
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className={`px-4 py-2 rounded ${darkMode ? 'bg-yellow-400 text-black' : 'bg-black text-white'}`}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
}

export default App;
