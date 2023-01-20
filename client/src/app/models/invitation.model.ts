import { ShortProjectModel } from "./short_project.model";

export interface InvitationModel {
    id: string;
    owner_id: string;
    receiver_id: string;
    status: number;
    project: ShortProjectModel;
}