require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const connect = require("./config/db");
const userRoute = require("./routes/user.route");
const { response } = require("express");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoute);

app.post("/calculate", (req, res) => {
  let { annualInstalmentAmount, annualInterestRate, totalNumberofYears } =
    req.body;

  let x = annualInterestRate / 100;
  let rate = (1 + x) ** totalNumberofYears;
  rate = rate - 1;
  rate = rate / x;
  let match = rate * annualInstalmentAmount;
  match = +Number.parseFloat(match).toFixed(2);

  let tim = annualInstalmentAmount * totalNumberofYears;

  let tig = match - tim;
  tig = +Number.parseFloat(tig).toFixed(2);

  res
    .status(200)
    .send({
      TotalInvestmentAmount: tim,
      TotalInterestGained: tig,
      TotalMaturityValue: match,
    });
});

app.listen(PORT, async () => {
  await connect();
  console.log(`running at ${PORT}`);
});
