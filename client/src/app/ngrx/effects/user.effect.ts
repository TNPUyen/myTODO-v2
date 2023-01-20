import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserActions } from "../actions/user.action";

export class UserEffect {
    constructor(
        private action$: Actions,

    ){}

    // getUsers$ = createEffect(() => this.action$.pipe(
    //     ofType(UserActions.getUsers),
    //     map(action => UserActions.getUsersSuccess({ payload: [] }))
    // ));
}