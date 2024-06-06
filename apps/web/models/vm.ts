export interface Vm {
    id: number;
    created_at: string;
    last_updated_at: string;
    name: string;
    cpuCores: string;
    memoryGB: number;
    diskSizeGB: number;
    ipAddress: string;
    region: string;
    status: "RUNNING" | "PAUSED" | "TERMINATED";
}

export interface VmAPIResponse {
    data: Vm;
    message: string;
}
