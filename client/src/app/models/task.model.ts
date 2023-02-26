import { UserModel } from "./user.model";

export interface TaskModel{
    id: string,
    project_id: string,
    task_id: string,
    name: string,
    description: string,
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