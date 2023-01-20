import { createAction, props } from "@ngrx/store";
import { UserModel } from "src/app/models/user.model";

export const UserActions = {
    getUsers: createAction('[User] Get Users'),
    getUsersSuccess: createAction('[User] Get Users Success', props<{ payload: UserModel[] }>()),
    getUsersFailure: createAction('[User] Get Users Failure', props<{ error: Error }>()),
    
    getUser: createAction('[User] Get User', props<{ id: number }>()),
    getUserSuccess: createAction('[User] Get User Success', props<{ payload: UserModel }>()),
    getUserFailure: createAction('[User] Get User Failure', props<{ error: Error }>()),

    createUser: createAction('[User] Create User', props<{ payload: UserModel }>()),
    createUserSuccess: createAction('[User] Create User Success', props<{ payload: UserModel }>()),
    createUserFailure: createAction('[User] Create User Failure', props<{ error: Error }>()),
    
    updateUser: createAction('[User] Update User', props<{ payload: UserModel }>()),
    updateUserSuccess: createAction('[User] Update User Success', props<{ payload: UserModel }>()),
    updateUserFailure: createAction('[User] Update User Failure', props<{ error: Error }>()),

    deleteUser: createAction('[User] Delete User', props<{ id: number }>()),
    deleteUserSuccess: createAction('[User] Delete User Success', props<{ id: number }>()),
    deleteUserFailure: createAction('[User] Delete User Failure', props<{ error: Error }>()),
};