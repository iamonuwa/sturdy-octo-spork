import { User } from "./user";

export interface Vm {
    id: string;
    created_at: string;
    last_updated_at: string;
    name: string;
    cpu: string;
    memory: number;
    disk: number;
    region: string;
    status: "RUNNING" | "PAUSED" | "TERMINATED";
    from: User
}

export interface VmAPIResponse {
    data: Vm;
    message: string;
}
