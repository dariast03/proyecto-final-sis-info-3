import Confirmation, { Props as ConfimationProps } from "./confirmation";

import { createConfirmation } from "react-confirm";

const defaultConfirmation = createConfirmation(Confirmation);

// create syntax sugar for confrmation function.
// You can use `confirm('Are you sure?')` instead of `confirm({ confrmation: 'Are you sure? '})`
export function confirm(options: ConfimationProps = {}) {
  return defaultConfirmation(options);
}
