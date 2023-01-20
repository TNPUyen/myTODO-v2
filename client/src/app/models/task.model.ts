import { UserModel } from "./user.model";

export interface TaskModel{
    id: string;
    project_id: string;
    name: string;
    task_id: string;
    description: string;
    asignee: UserModel;
    status: number;
    created_at: number;
    updated_at: number;
}