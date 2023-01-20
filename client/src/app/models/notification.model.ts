import { ShortProjectModel } from "./short_project.model";

export interface NotificationModel {
    id: string;
    owner_id: string;
    receiver_id: string;
    invitation_id: string;
    status: number;
    project: ShortProjectModel;
}