import { JwtPayload } from "jsonwebtoken";
export interface UserCredentials {
  username: string;
  password: string;
  email: string;
  image: string;
}

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
}
