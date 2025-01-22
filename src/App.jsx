import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(20);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeChar, setIncludeChar] = useState(false);
  const [password, setPassword] = useState();

  // useRef hook to get refrence of the input field
  const passwordRef = useRef(null);


  // useCallback is used for optimization(anytime the parameters change the function runs keeping data in cache)
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) str += "0123456789";
    if (includeChar) str += "!@#$%^&*()_-+={}[]`~";

    // run a loop till length user selected and generate random password
    for (let i = 0; i < length; i++) {
      let randomChar = Math.floor(Math.random() * str.length + 1)
      // addend every char in the pass
      pass += str.charAt(randomChar)    // str.chatAt the random index of the str
    }

    setPassword(pass)

  }, [length, includeNumbers, includeChar, setPassword])


  // copy password to clip function
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();                    // '?' adds a check if the current input is empty or not(if null no selection is done)
    // passwordRef.current?.setSelectionRange(0, 3)   // used to select only the chars in the given range
    window.navigator.clipboard.writeText(password)
    alert('Password copied.')
  }, [password])


  // run the passwordGenerator on every change in the given attributes
  useEffect(() => {
    passwordGenerator();
  }, [length, includeNumbers, includeChar, passwordGenerator]);


  return (
    <>
      <div
        className="w-full max-w-xl mx-auto shadow-md rounded-xl p-5 m-8 text-white bg-zinc-700"
      >
        <h1 className="text-white text-center mb-5 text-2xl">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}   // pass the refrence for useRef hook
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-teal-500 text-white px-4 py-0.5 shrink-0 hover:bg-teal-700"
          >Copy</button>
        </div>
        <div className="flex text-sm justify-between">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={64}
              value={length}
              className=" cursor-pointer accent-white"
              id="input"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="input">{length}</label>
          </div>
          <div className="flex items-center justify-center gap-5">
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={includeNumbers}
                id="numberInput"
                onChange={() => {
                  setIncludeNumbers((preValue) => !preValue)
                }}
                className="size-4 accent-teal-500 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={includeChar}
                id="charInput"
                onChange={() => {
                  setIncludeChar((preValue) => !preValue)
                }}
                className="size-4 accent-teal-500 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
