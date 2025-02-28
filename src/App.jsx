import { useState, useCallback, useEffect, use, useRef } from 'react'

//import './App.css'

function App() {
  const [length, setLength] = useState(6)
  const [num, setNum] = useState(false) // to allow number in password
  const [char, setChar] = useState(false) // to allow character in password
  const [password, setpassword] = useState("") // to set default empty password





  const passwordRef = useRef(null)  // effect on copying







  // useCallback is for storing cache
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num) str += "0123456789"
    if(char) str += "!@#$%^&*<>?/"

    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length +1)
      pass += str.charAt(char);
    }

    setpassword(pass)

  }, [length, num, char, setpassword])


  const copypasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password]) 


  
  
  
  // (callback, depedencies])
  // jab bhi inke dependencies me koi change aayega tb passwrodGenerator() call hoga
  useEffect(() => {
    passwordGenerator()
  }, [length, num, char, passwordGenerator])


  






  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8  bg-gray-700 '>
      <h1 className='text-center text-white'>Password Generator</h1>
        <div className='bg-amber-50 flex shadow rounded-lg overflow=hidden mb-4'>
          <input 
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}    
          /> 
          <button 
            onClick={copypasswordtoclipboard}
            className='outline-none bg-blue-700 text-white px-5 py-0.5 shrink-0 rounded-r-lg cursor-pointer'>
            Copy
          </button>
        </div>



        <div className='flex text-sm gap-x-3'>
          <div className='flex items-center'>
            <input 
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-grab'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label className='text-amber-50'>
              length:{length}
            </label>
          </div>


          <div className='text-white flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              onChange={() => {
                setNum((prev) => !prev); // by clicking this the previous value is altered and made opposite of the previous
              }} // jo h, uska ulta ho gayega
           />
            <label htmlFor='numberInput'>Numbers</label>
          </div>


          <div className='flex items-center gap-x-1 text-white'>
            <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charachterInput">
              Characters
            </label>
          </div>
        </div>


      </div>
    </>
  )
}

export default App
