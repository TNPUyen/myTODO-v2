import { UserModel } from "src/app/models/user.model";

export interface UserState{
    users: UserModel[];
    user: UserModel;
    loading: boolean;
    error: Error;
}