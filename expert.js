

var bulk_data =  [

]

function generatedRef() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  }

// // checkout scripts
document.getElementById("standard").addEventListener("click", (e) => { 
e.preventDefault();
const email = document.getElementById("stemail").value;
const fullName = document.getElementById("stfullname").value;
const  finalPay = localStorage.getItem("amountToPay");

var payData = {
    tx_ref: "hooli-tx-1920bbtytty",
    amount:`${finalPay}`,
    currency: "NGN",
    redirect_url: "https://chis-mediaplayer.netlify.app/",
    payment_options: "card",
    meta: {
      consumer_id: 23,
      consumer_mac: "92a3-912ba-1192a",
    },
    customer: {
      email: `${email}`,
      phonenumber: "080****4528",
      name: `${fullName}`,
    },
    customizations: {
      title: "Pied Piper Payments",
      description: "Middleout isn't free. Pay the price",
      logo: "https://assets.piedpiper.com/logo.png",
    },
  };

  fetch("https://hostedpay.glitch.me/pay", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payData),
}).then((response) => response.json())
  .then((data) => {
      location.href = data.data.link;
  }).catch((error) =>{
      console.log(error);
  })

})

document.getElementById("transfer").addEventListener("click", (e) => { 
    e.preventDefault();
    const code = document.getElementById("bank-code").value
    const acctNumber = document.getElementById("acct-number").value
    const transAmount = document.getElementById("amount").value
    const description = document.getElementById("desc").value
    const currency = document.getElementById("curr").value

const transferObject = {
    "account_bank": `${code}`,
    "account_number": `${acctNumber}`,
    "amount": `${transAmount}`,
    "narration": `${description}`,
    "currency": `${currency}`,
    "reference": generatedRef(),
    "callback_url": "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
    "debit_currency": "NGN"

}

fetch("http://localhost:4005/transfer", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(transferObject),
}).then((response) => response.json())
  .then((data) => { 
    // hideLoading();
      const message = data.message;
      const status = data.status;
      if(status !== " "){
        alert(message)
      document.getElementById('card-pay').reset()
      }
    }).catch((error) =>{
      console.log(error);
  })
});

document.getElementById('bulk-data').addEventListener("click", (e) => {
  e.preventDefault();
  const bulkCode = document.getElementById("bulk-bank-code").value
  const bulkAcctNumber = document.getElementById("bulk-acct-number").value
  const bulkTransAmount = document.getElementById("bulk-amount").value
  const bulkDescription = document.getElementById("bulk-desc").value
  const bulkCurrency = document.getElementById("bulk-curr").value

  const bulkObject = {
    "account_bank": `${bulkCode}`,
    "account_number": `${bulkAcctNumber}`,
    "amount": `${bulkTransAmount}`,
    "narration": `${bulkDescription}`,
    "currency": `${bulkCurrency}`,
    "reference": generatedRef(),
    "callback_url": "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
    "debit_currency": "NGN"

}

  bulk_data.push(bulkObject);
  // console.log(bulk_data);
  document.getElementById('card-bulk-pay').reset()
  alert('Details Added');
})


document.getElementById("bulk-transfer").addEventListener("click", (e) => { 
    e.preventDefault();

    fetch("http://localhost:4005/bulk", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({bulk_data}),
}).then((response) => response.json())
  .then((data) => {
      const message = data.message;
      const status = data.status;
      if(status !== " "){
          alert(message)
      }
    //   location.href = data.data.link;
    console.log(data);
  }).catch((error) =>{
      console.log(error);
  })
})

