interface User {
    id: string;
    address: string;
}

export interface UserAPIResponse {
    data: User;
    message: string;
}
