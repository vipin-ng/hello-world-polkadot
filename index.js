const axios = require("axios");

const accountId = process.argv[2];
const depth = process.argv[3] || 3;

const baseURL = `http://127.0.0.1:8080`;

(async function () {
  console.log(
    "🚀🚀🚀🚀We are working on calculating the payout amount ...🚀🚀🚀"
  );
  const url = `${baseURL}/accounts/${accountId}/staking-payouts?depth=${depth}`;
  const { data } = await axios.get(url);
  const finalAmount = data.erasPayouts.reduce((acc, single) => {
    acc =
      acc +
      single.payouts.reduce((total, cv) => {
        if (!cv.claimed) {
          total = total + Number(cv.nominatorStakingPayout);
        }
        return total;
      }, 0);
    return acc;
  }, 0);

  console.log(`✅ Pending Payouts:::`, finalAmount, "Planck");
})();
