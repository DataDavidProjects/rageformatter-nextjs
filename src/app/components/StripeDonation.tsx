import React from "react";

export const StripeDonation = () => {
  return (
    <div>
      <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      <stripe-buy-button
        buy-button-id="buy_btn_1NrLtBEv5a4bSL491JfuHCOa"
        publishable-key="pk_live_51NhwCeEv5a4bSL49Ef096wEO1vsMCr9K5GdNZBo3H3xcp4XOmvWSiAPWoG8N9FwmM6i0vpVPVH6YV1KYDFSPOeeI00zsXbIi8K"
      ></stripe-buy-button>
    </div>
  );
};
