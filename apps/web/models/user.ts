export interface User {
    id: string;
    display_name: string;
    created_at: Date;
    identifier: string;
    user_id: string;
    photo_url: string;
    provider: string;
}

export interface UserAPIResponse {
    data: User;
    message: string;
}
