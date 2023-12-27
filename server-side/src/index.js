const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/getAllCurrencies", async (req, res)=>{
  const nameURL ="https://openexchangerates.org/api/currencies.json?app_id=793f8b03b6c84e1187b0a2d14ad5d9d8";

  

  try {
    const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;

    return res.json(nameData);
        
  } catch (err) {
    console.error(err);
    
  }
});

app.get("/convert" , async(req, res)=>{
  const{date,
    sourceCurrency,
    targetCurrency,
    amountinScourceCurrency}=req.query;

    try {
      const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=793f8b03b6c84e1187b0a2d14ad5d9d8`; 
      
      const dataResponse = await axios.get(dataURL);
      const rates = dataResponse.data.rates;   

      const sourceRate = rates[sourceCurrency];
      const targetRate = rates[targetCurrency];

      const targetAmount = (targetRate/sourceRate) * amountinScourceCurrency;

      return res.json(targetAmount.toFixed(2));




    } catch (err) {
      console.error(err)
      
    }
})

app.listen(5000, ()=>{
  console.log("SERVER STARTED");
})
