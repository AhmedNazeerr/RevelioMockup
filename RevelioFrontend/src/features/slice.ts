import { createSlice } from "@reduxjs/toolkit";
import { initialStateType } from "./type";

const initialState: initialStateType = {
  id: "",
  userId: "",
  showLoader: false,
  keyInfo: {
    make: "",
    model: "",
    variant: "",
    registration: "",
    mileage: "",
    owners: "",
    images: [],
  },
  specification: "",
  serviceHistory: "",
  aboutCar: "",
  price: {
    asking_price: "",
    cap_clean: "",
    autorader_retail: "",
  },
  preparation: "",
  updateImagesArray: []
};

const decodeHtml = (html: string) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.value;
};

const reviloSlice = createSlice({
  name: "Revilo",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
    },
    resetUser: (state) => {
      state.userId = "";
    },
    showLoaderToogler: (state) => {
      state.showLoader = !state.showLoader;
    },
    setKeyInfo: (state, action) => {
      const { make, model, variant, registration, mileage, owners, images } =
        action.payload;
      state.keyInfo.make = make;
      state.keyInfo.model = model;
      state.keyInfo.variant = variant;
      state.keyInfo.mileage = mileage;
      state.keyInfo.registration = registration;
      state.keyInfo.owners = owners;
      state.keyInfo.images = images.map((image: File) => image);
    },
    setAboutCar: (state, action) => {
      state.aboutCar = action.payload;
    },
    setServiceHistory: (state, action) => {
      state.serviceHistory = action.payload;
    },
    setSpecification: (state, action) => {
      state.specification = action.payload;
    },
    setPreparation: (state, action) => {
      state.preparation = action.payload;
    },
    setPrice: (state, action) => {
      const { asking_price, cap_clean, autorader_retail } = action.payload;
      state.price.asking_price = asking_price;
      state.price.cap_clean = cap_clean;
      state.price.autorader_retail = autorader_retail;
    },
    reset: (state) => {
      state.showLoader = false;
      state.keyInfo = {
        make: "",
        model: "",
        variant: "",
        registration: "",
        mileage: "",
        owners: "",
        images: [],
      };
      state.specification = "";
      state.serviceHistory = "";
      state.aboutCar = "";
      state.price = {
        asking_price: "",
        cap_clean: "",
        autorader_retail: "",
      };
      state.preparation = "";
    },
    set: (state, action) => {
      state.id = action.payload._id;
      state.keyInfo = {
        make: action.payload.make,
        model: action.payload.model,
        variant: action.payload.variant,
        registration: action.payload.registration,
        mileage: action.payload.mileage.toString(),
        owners: action.payload.numberOfOwners.toString(),
        images: [],
      };
      state.specification = decodeHtml(action.payload.specification);
      state.serviceHistory = decodeHtml(action.payload.serviceHistory);
      state.aboutCar = decodeHtml(action.payload.about);
      state.price = {
        asking_price: action.payload.askingPrice.toString(),
        cap_clean: action.payload.capClean.toString(),
        autorader_retail: action.payload.autoTraderDetail,
      };
      state.preparation = decodeHtml(action.payload.preparation);
      state.updateImagesArray = action.payload.images.map((image: string) => image);
    },
  },
});

const reviloActions = reviloSlice.actions;

export { reviloActions, reviloSlice };
