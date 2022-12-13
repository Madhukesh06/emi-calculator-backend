const express = require("express");

const app = express();

app.get("/calculateemi", async (req, res) => {
  const { principle, annualrate, tenure } = req.body;
  const rate = annualrate / 12 / 100;
  const n = 12 * tenure;
  try {
    const EMI = await Math.ceil(
      (principle * rate * (1 + rate) ** n) / ((1 + rate) ** n - 1)
    );
    let totalAmtPayble = EMI * n;
    let intrest = totalAmtPayble - principle;
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
