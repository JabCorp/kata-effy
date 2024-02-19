export interface UserInfo {
  civility: Civility;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  valid?: boolean
}

export enum Civility {
  MR = 'mr',
  MRS = 'mrs'
}
