"use client";
import authService from "@/utils/http/axios/auth.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let user;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user")!);
}


// const user = JSON.parse(localStorage.getItem("user") as any);

export const signUp = createAsyncThunk(
  "auth/userinfo",
  async ({ store_id, phone }: any, thunkAPI) => {
    try {
      const response = await authService.signUp(store_id, phone);
      //   thunkAPI.dispatch(setMessage(response.data.message));
      // console.log('res',response.data);
      return response.data;
    } catch (error: any) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      //   thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ store_id, phone, password, tokenData }: any, thunkAPI) => {
    if (tokenData) {
      return tokenData;
    } else {
      try {
        const data = await authService.login(store_id, phone, password);
        return data;
      } catch (error) {
        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
        // thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

export const verify = createAsyncThunk(
  "auth/users/checkotp",
  async ({ otp, token }: any, thunkAPI) => {
    try {
      const response = await authService.verify_phone(otp, token);

      // thunkAPI.dispatch(setMessage(response.data.error));
      return response.data;
    } catch (error) {
      // console.log('res',error);
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async ({}, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    // const message =
    //   (error.response && error.response.data && error.response.data.message) ||
    //   error.message ||
    //   error.toString();
    // thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = user
  ? { isLoggedIn: true, user, success: "" }
  : { isLoggedIn: false, user: null, success: "" };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.success = "";
      state.user = null;
    });
    builder.addCase(verify.fulfilled, (state, action) => {
      if (action.payload.verify) {
        state.isLoggedIn = true;
        state.user = action.payload;
      } else {
        state.isLoggedIn = false;
        state.user = action.payload;
      }
    });
    builder.addCase(verify.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.success = "";
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.verify) {
        state.isLoggedIn = true;
        state.user = action.payload;
      } else {
        state.isLoggedIn = false;
        state.user = action.payload;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.success = "";
    });
  },
});

const { reducer } = authSlice;
export default reducer;
