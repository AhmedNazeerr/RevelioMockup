export interface initialStateType {
  id: string;
  userId: string,
  showLoader: boolean;
  keyInfo: {
    make: string;
    model: string;
    variant: string;
    registration: string;
    mileage: string;
    owners: string;
    images: [];
  };
  specification: string;
  serviceHistory: string;
  aboutCar: string;
  price: { asking_price: string; cap_clean: string; autorader_retail: string};
  preparation: string; 
  updateImagesArray: string[]
}