import { IBreakpointsKeys } from './IBreakpointsKeys';

export type IBreakpoints = {
  [K in IBreakpointsKeys]: number;
};
