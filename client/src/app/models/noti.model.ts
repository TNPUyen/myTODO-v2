export interface NotiModel{
    id: string,
    owner_id: string,
    receiver_id: string,
    invitation_id: string,
    noti_id: string,
    status: number,
    project_id: string,
    unread: boolean,
}