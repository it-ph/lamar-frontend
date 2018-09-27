import { Role } from "./role";

export class User {
    id: number;
    name: string;
    enabled: boolean;
    username: string;
    password: string;
    role: Role;
}
