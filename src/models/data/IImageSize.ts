import { IBreakpointsKeys } from './IBreakpointsKeys';

export type IImageSize = {
  [K in IBreakpointsKeys]: { width: number; height?: number };
};
