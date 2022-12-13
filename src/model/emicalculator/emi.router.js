const express = require("express");

const app = express();

app.post("/calculateemi", async (req, res) => {
  const { principle, annualrate, tenure } = req.body;
  const rate = annualrate / 12 / 100;
  const n = tenure;
  try {
    const EMI = await (
      (principle * rate * (1 + rate) ** n) /
      ((1 + rate) ** n - 1)
    ).toFixed(2);
    let totalAmtPayble = (EMI * n).toFixed(2);
    let intrest = (totalAmtPayble - principle).toFixed(2);
    res.send({
      EMI: EMI,
      InterestPayable: intrest,
      totalPayment: totalAmtPayble,
    });
  } catch (er) {
    res.send({ er: er, message: "Please provide all data" });
  }
});

module.exports = app;
