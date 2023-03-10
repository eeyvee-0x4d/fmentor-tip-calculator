import { useState, useEffect } from 'react'
import logo from '../images/logo.svg'
import dollarIcon from '../images/icon-dollar.svg'
import personIcon from '../images/icon-person.svg'

import './App.css'

function App() {
  
  const [state, setState] = useState("empty")
  const [tipSetting, setTipSetting] = useState('')
  const [billCost, setBillCost] = useState(0)
  const [tipOption, setTipOption] = useState(0)
  const [peopleCount, setPeopleCount] = useState(0)

  const [tipPerPerson, setTipPerPerson] = useState(0.00)
  const [totalPerPerson, setTotalPerPerson] = useState(0.00)

  // ERROR STATES
  const [isBillError, setBillError] = useState(false)
  const [isTipError, setTipError] = useState(false)
  const [isPeopleCountError, setPeopleCountError] = useState(false)

  const clearInput = id => {
    document.getElementById(`${id}`).value = ""
  }

  const calculateTipPerPerson = (cost, tip, numofPerson) => {
    
    if(numofPerson > 0) {
      const result = ((tip / 100) * cost) / numofPerson
      return result
    } else {
      setPeopleCountError("ZERO")
      return 0
    }
  }

  const calculateTotalPerPerson = (cost, tip, numofPerson) => {
    
    if(numofPerson > 0) {
      const result = (cost / numofPerson) + tip
      return Math.floor(result * 100) / 100
    } else {
      return 0
    }
  }

  const reset = () => {
    clearInput("bill-input")
    clearInput("custom-tip-input")
    clearInput("num-of-people")

    Array.from(document.querySelectorAll(".tip-btn"))
      .forEach(el => {
      el.classList.remove('active')
    })

    setBillCost(0)
    setTipOption(0)
    setPeopleCount(0)

    setTipPerPerson(0)
    setTotalPerPerson(0)
  }

  const handleBillInputChange = e => {
    if (/^\d+(?:\.\d+)?$/.test(e.target.value) || e.target.value === "") {
        setBillError(false)
        setBillCost(Number(e.target.value) || 1)
    } else {
        setBillError(true)
    }
  }

  const handleTipOptionClick = e => {
    Array.from(document.querySelectorAll(".tip-btn"))
      .forEach(el => {
      el.classList.remove('active')
    })

    e.target.classList.add('active')

    setTipSetting("preset")
    clearInput("custom-tip-input")
    setTipError(false)

    setTipOption(Number(e.target.control.value))
  }

  const handleTipInputClick = e => {
    Array.from(document.querySelectorAll(".tip-btn"))
      .forEach(el => {
      el.classList.remove('active')
    })
  }

  const handleTipInputChange = e => {
      setTipSetting('custom')
      
      if (/^(?:\d+(?:\.\d*)?|\.\d*)?$/.test(e.target.value) || e.target.value === ""){
        setTipError(false)
        setTipOption(Number(e.target.value))
      } else {
        setTipError(true)
      }
  }

  const handlePeopleCountChange = e => {
    if (e.target.value.trim().length === 0) {
      setPeopleCountError("EMPTYSTRING")
    }
    else if (Number(e.target.value) === 0) {
      setPeopleCountError("ZERO")
    }
    else if (/^(?:\d+)?$/.test(e.target.value)) {
     setPeopleCountError(false)
     setPeopleCount(Number(e.target.value))
    }
    else {
      setPeopleCountError("NOTANUMBER")
    }
  }

  useEffect(() => {
    const result = calculateTipPerPerson(billCost, tipOption, peopleCount)
    setTipPerPerson(result)

    const perPerson = calculateTotalPerPerson(billCost, result, peopleCount)
    setTotalPerPerson(perPerson)
  }, [billCost, tipOption, peopleCount])

  return (
    <div className="App">
      <div className="wrapper min-h-screen bg-light-grayish-cyan flex flex-col items-center">
        <div className="logo py-16">
          <img src={logo} alt="logo" />
        </div>
        <div className="tip-calculator bg-white w-full p-8 rounded-3xl flex flex-col gap-4 max-w-sm lg:flex-row lg:max-w-4xl">
          <form action="#" className="calculator flex flex-col p-4 gap-8 lg:basis-1/2">
            <div className="bill-input-group flex flex-col gap-2 text-left">
              <div className="flex justify-between items-end">
                <label htmlFor="bill-input" className="">Bill</label>
                <span className={`text-xs text-orange-400 transition ${isBillError ? "visible" : "hidden"}`}>Numbers only</span>
              </div>
              <div className="relative bg-very-light-grayish-cyan">
                <div className="absolute top-[50%] translate-y-[-50%] left-4">
                  <img src={dollarIcon} alt="dollar icon" />
                </div>
                <input name="bill-input" id="bill-input" type="text" inputMode="numeric" pattern="[0-9]*" placeholder="0" maxLength="6" onChange={handleBillInputChange} className={`bg-transparent text-right text-very-dark-cyan text-[1.5rem] box-border w-full px-4 rounded outline-none hover:ring-2 focus:ring-2 hover:ring-strong-cyan focus:ring-strong-cyan ${isBillError ? "focus-visible:ring-2 focus-visible:ring-orange-400" : "focus-visible:ring-2 focus-visible:ring-strong-cyan"}`} required/>
              </div>
            </div>
            <div className="tip-wrapper flex flex-col gap-4 text-left ">
              <div className="flex justify-between items-end">
                <span>Select Tip %</span>
                <span className={`text-xs text-orange-400 transition ${isTipError ? "visible" : "hidden"}`}>Numbers only</span>
              </div>
              <div className="tip-input-groups grid grid-cols-2 gap-4 font-bold text-[1.5rem] text-white text-center lg:grid-cols-3">
                <label htmlFor="radio1" onClick={handleTipOptionClick} className="tip-btn py-2 rounded transition">5%</label>
                <input type="radio" name="tipBtn" id="radio1" value="5" className="hidden" />
                <label htmlFor="radio2" onClick={handleTipOptionClick} className="tip-btn py-2 rounded transition">10%</label>
                <input type="radio" name="tipBtn" id="radio2" value="10" className="hidden" />
                <label htmlFor="radio3" onClick={handleTipOptionClick} className="tip-btn py-2 rounded transition">15%</label>
                <input type="radio" name="tipBtn" id="radio3" value="15" className="hidden" />
                <label htmlFor="radio4" onClick={handleTipOptionClick} className="tip-btn py-2 rounded transition">25%</label>
                <input type="radio" name="tipBtn" id="radio4" value="25" className="hidden" />
                <label htmlFor="radio5" onClick={handleTipOptionClick} className="tip-btn py-2 rounded transition">50%</label>
                <input type="radio" name="tipBtn" id="radio5" value="50" className="hidden" />
                <div className="tip-input-group">
                 <input type="text" id="custom-tip-input" placeholder="Custom" inputMode="numeric" pattern="[0-9]*" maxLength="6" onClick={handleTipOptionClick} onChange={handleTipInputChange} className={`bg-very-light-grayish-cyan text-right text-very-dark-cyan text-[1.5rem] box-border w-full px-4 rounded transition outline-none hover:ring-2 focus:ring-2 hover:ring-strong-cyan focus:ring-strong-cyan ${isTipError ? "focus-visible:ring-2 focus-visible:ring-orange-400" : "focus-visible:ring-2 focus-visible:ring-strong-cyan"}`}/>
                </div>
              </div>
            </div>
            <div className="people-input-group text-left flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label htmlFor="num-of-people">Number of People</label>
                {isPeopleCountError === "ZERO" ? (<span className="text-xs text-orange-400 transition">Can't be zero</span>) : null }
                {isPeopleCountError === "EMPTYSTRING" ? (<span className="text-xs text-orange-400 transition">Can't be empty</span>) : null }
                {isPeopleCountError === "NOTANUMBER" ? (<span className="text-xs text-orange-400 transition">Must be a number</span>) : null }
              </div>
              <div className="relative bg-very-light-grayish-cyan">
                <div className="absolute top-[50%] translate-y-[-50%] left-4">
                  <img src={personIcon} alt="dollar icon" />
                </div>
                <input name="num-of-people" id="num-of-people" type="text" inputMode="numeric" pattern="[0-9]*" placeholder="0" maxLength="6" onChange={handlePeopleCountChange} className={`bg-transparent text-right text-very-dark-cyan text-[1.5rem] box-border w-full px-4 rounded transition outline-none hover:ring-2 focus:ring-2 hover:ring-strong-cyan focus:ring-strong-cyan ${isPeopleCountError ? "focus-visible:ring-2 focus-visible:ring-orange-400" : "focus-visible:ring-2 focus-visible:ring-strong-cyan"}`} required/>
              </div>
            </div>
          </form>
          <div className="display-card bg-very-dark-cyan mt-4 p-4 pt-8 rounded-xl flex flex-col justify-between text-left text-white lg:basis-1/2 lg:grow md:p-8 md:mt-0">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="">
                  <p>Tip Amount</p>
                  <span className="text-grayish-cyan text-sm">/ person</span>
                </div>
                <p className="text-strong-cyan text-3xl transition">{`$${(Math.floor(tipPerPerson * 100) / 100).toFixed(2)}`}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p>Total</p>
                  <span className="text-grayish-cyan text-sm">/ person</span>
                </div>
                <p className="text-strong-cyan text-3xl overflow-hidden whitespace-normal transition">{`$${(Math.floor(totalPerPerson * 100) / 100).toFixed(2)}`}</p>
              </div>
            </div>
            <button className="bg-strong-cyan text-very-dark-cyan py-2 rounded transition hover:bg-light-grayish-cyan" onClick={reset}>RESET</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
