export interface User {
  id: number | string;
  firstName: string,
  lastName: string,
  workEmail: string,
  password: string
}

export interface NewUserInfo {
  tenantId: number | string;
  userId: number | string;
  userEmail: string,
  accessToken: string,
  roles: Array,
  planId:  number | string;
}