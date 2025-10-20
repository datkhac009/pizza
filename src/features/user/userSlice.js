import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    //   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
    console.log(position, address);
    //   // 3) Then we return an object with the data that we are interested in
    //Payload of the FULLFILLED state
    return { position, address };
  },
);

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
  // phone :"",
  // address: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action) {
      state.username = action.payload;
    },
    addName: {
      prepare(username) {
        const trimd = username.trim();
        return { payload: trimd };
      },
      reducer(state, action) {
        console.log(action.payload);
        state.username = action.payload;
      },
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = " error";
        state.error = action.error.message;
      }),
});
export const { setName, addName } = userSlice.actions;

export default userSlice.reducer;
