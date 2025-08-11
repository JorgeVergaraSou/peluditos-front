import { createSlice } from "@reduxjs/toolkit";
import { Roles, UserInfo } from "../../models";

export const EmptyUserState: UserInfo = {
  idUser: 0,
  name: '',
  email: '',
  role: Roles.EMPTY,
  token: ''
};

export const UserKey = "user";

export const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem(UserKey)
    ? JSON.parse(localStorage.getItem(UserKey) as string)
    : EmptyUserState,
  reducers: {
    createUser: (_, action) => action.payload,
    updateUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: () => EmptyUserState
  },
});

export const { createUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
