import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrInfo from './myHooks/useCurrInfo'
import './App.css'

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [converted, setConverted] = useState(0)

  const currencyInfo = useCurrInfo(from)
  const options = Object.keys(currencyInfo) || []

  const swap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const convert = () =>{
    setConverted((parseFloat(amount) || 0) * (currencyInfo[to] ?? 1));
  }

  return (
    <>
       <div
            className="w-full h-screen flex flex-wrap justify-center items-center"
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                onAmountChange={(amount) => setAmount(parseFloat(amount) || 0)}
                                selectCurrency={from}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                onClick={swap}
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2
                                 border-white rounded-md bg-blue-600 text-white px-2 py-0.5">
                                SWAP
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={converted}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                             />
                        </div>
                        <button 
                        onClick={convert}
                        type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            CONVERT {from.toUpperCase()} TO {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default App
