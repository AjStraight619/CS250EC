export type UserInfo = {
  name: string;
  email: string;
  address: Address;
  password: string;
  confirmedPassword: string;
};

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};
