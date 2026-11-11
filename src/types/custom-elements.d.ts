// custom-elements.d.ts
// React 19 moved the JSX namespace under "react".
import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-buy-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "buy-button-id"?: string;
        "publishable-key"?: string;
      };
    }
  }
}
