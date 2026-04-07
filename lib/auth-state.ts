export type AuthActionState = {
  error: string | null;
  success: string | null;
};

export const AUTH_INITIAL_STATE: AuthActionState = {
  error: null,
  success: null,
};
