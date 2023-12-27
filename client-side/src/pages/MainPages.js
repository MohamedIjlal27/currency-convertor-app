import React, {useEffect, useState} from 'react';
import "./Page.css"
import axios from 'axios';

export default function MainPages() {

  const[date, setDate] = useState(null);
  const[sourceCurrency, setSourceCurrency] = useState("");
  const[targetCurrency, setTargetCurrency] = useState("");
  const[amountinScourceCurrency, setAmountinScourceCurrency] = useState(0);  
  const[amountintargetCurrency, setAmountinTargetCurrency] = useState(0);
  const[currencyNames, setCurrencyNames] = useState([]);

  const handleSubmite= async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/convert",{
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountinScourceCurrency
        }
      });

      setAmountinTargetCurrency(response.data);
      
    } catch (err) {
      console.error(err)      
    }
  }

  useEffect(()=>{
    const getCurrencyNames = async() =>{
      try {
        const response = await axios.get("http://localhost:5000/getAllCurrencies"); 
        setCurrencyNames(response.data);    
      } catch (err) {
        console.error(err)
        
      }
    }
    getCurrencyNames();
  }, [])

  return (
    <div className='page'>
      <h1 className='heading'>Convert your currency today</h1>
      <p className='para'>
      Welcome to "convert your currency today"! This Application allows you
      to easily convert currencies based on the latest exchange rates. wather
      you're planning a trip, managing your finances, or simply curious about 
      the value of your money in different currencies, this tool is here to 
      help
      </p>

      <div className='body'>
        <section className='section'>
          <form onSubmit={handleSubmite}>
            <div className='mb-4'>
              <label htmlFor={date} className='lbl'>Date</label>
              <input onChange={(e)=>setDate(e.target.value)} type="date" id={date} name ={date} className='input'placeholder="name@flowbite.com" required /> 

              <label htmlFor={sourceCurrency} className='lbl'>Source Currency</label>
              <select onChange={(e)=>setSourceCurrency(e.target.value)} id={sourceCurrency} name ={sourceCurrency} value={sourceCurrency} type="text" className='input'placeholder="Select source currency" required>
              <option value="">Select Source Currency</option>
               {Object.keys(currencyNames).map((currency)=>(
                  <option className='p-1' key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
               ))}
              </select>               

              <label htmlFor={targetCurrency} className='lbl'>Target Currency</label>
              <select onChange={(e)=>setTargetCurrency(e.target.value)} id={targetCurrency} name ={targetCurrency} value ={targetCurrency} type="text" className='input'placeholder="Select Target Currency" required >
              <option value="">Select Target Currency</option>
              {Object.keys(currencyNames).map((currency)=>(
                  <option className='p-1' key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
               ))}
              </select> 

              <label htmlFor={amountinScourceCurrency} className='lbl'>Amount in Source Currency</label>
              <input onChange={(e)=>setAmountinScourceCurrency(e.target.value)} id={amountinScourceCurrency} name ={amountinScourceCurrency} type="text" className='input'placeholder="Amount in Source Currency" required/> 
            </div>

            <button className='btn'>Get the Traget Currency</button>

          
          </form>
        </section>
      </div>
      <section className='mt-4'>
      {amountinScourceCurrency} {currencyNames[sourceCurrency]} is equal to {" "}
      {amountintargetCurrency} {currencyNames[targetCurrency]}
      </section>
    </div>
  )
}
