export const ROUTES = [
    {
        title: "Instances",
        href: "/",
    }, {
        title: "Configurations",
        href: "/",
        disabled: true
    }, {
        title: "Logs",
        href: "/",
        disabled: true
    }, {
        title: "Settings",
        href: "/",
        disabled: true
    },
]

export const CPU_CORES = [
    "Intel Core i9-12900K",
    "Intel Core i7-12700K",
    "Intel Core i5-12600K",
    "Intel Core i9-11900K",
    "Intel Core i7-11700K",
    "AMD Ryzen 9 5950X",
    "AMD Ryzen 9 5900X",
    "AMD Ryzen 7 5800X",
    "AMD Ryzen 5 5600X"
]

export const MEMORY_SIZES = [
    4, 8, 16, 32, 64
]

export const DISK_SIZES = [
    4, 8, 16, 32, 64, 128, 256
]

export const REGIONS = [
    "us-east-1",
    "eu-west-1",
    "eu-central-1",
    "ap-southeast-1",
    "sa-east-1"
]

export const INSTANCE_STATES = ['RUNNING', 'PAUSED', 'TERMINATED']
