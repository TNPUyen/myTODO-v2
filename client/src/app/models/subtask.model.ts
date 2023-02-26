import { UserModel } from "./user.model";

export interface SubTaskModel{
    id: string,
    subTask_id: string,
    task_id: string,
    content: string,
    owner_id: string,
    assignor: UserModel,
    assignee: UserModel[],
    status: number,
    label: string,
    priority: number,
    disabled: boolean,
    created_at: number,
    updated_at: number,
    deadline: number,
}