import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
    state.error = null; // Clear any previous errors
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.isAuthenticated = false;
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },

    // update user information
    updateUserInfoRequest: (state) => {
      state.loading = true;
      // console.log('115');
    },
    
    updateUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      // console.log('116');
    },
    updateUserInfoFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // console.log('117');
    },

    // update user address
    updateUserAddressRequest: (state) => {
      state.addressloading = true;
    },
    updateUserAddressSuccess: (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    },
    updateUserAddressFailed: (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    },

     // delete user address
  deleteUserAddressRequest: (state) => {
    state.addressloading = true;
  },
  deleteUserAddressSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  deleteUserAddressFailed: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },
});

// const initialState = {
//     isAuthenticated: false,
//     loading: false,
//     user: null, // Set to null initially
//     error: null,
//   };
  
//   export const userReducer = createReducer(initialState, (builder) => {
//     builder
//       .addCase("LoadUserRequest", (state) => {
//         state.loading = true;
//       })
//       .addCase("LoadUserSuccess", (state, action) => {
//         state.isAuthenticated = true;
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase("LoadUserFail", (state, action) => {
//         state.isAuthenticated = false;
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase("clearErrors", (state) => {
//         state.error = null;
//       });
//   });
  