import { UserModel } from "./user.model";

export interface ProjectModel {
    id: string;
    project_id: string;
    name: string;
    description: string;
    owner: string;
    members: UserModel[];
    created_at: number;
    updated_at: number;
    disabled: boolean;
}
