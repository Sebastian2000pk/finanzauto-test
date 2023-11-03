export interface User {
  firstName: string;
  lastName: string;
  fullName: string;
  picture: string;
  id: string;
  title: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  picture: string;
  id?: string;
  title: string;
  gender: string;
  dateOfBirth: string;
  registerDate?: Date;
  email: string;
  phone: string;
  location?: string;
}