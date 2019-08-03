export interface StateCommon {
  pending: boolean;
  error: boolean;
}

export const pending = (state: any) => {
  return {
    ...state,
    pending: true,
    error: false,
  };
};

export const rejected = (state: any) => {
  return {
    ...state,
    error: true,
    pending: false,
  };
};
