import { Address } from "viem";

export const shortenHex = (hex: unknown, length = 4) => {
    if (!hex) return "";
    const address = String(hex);
    return `${address.toString().slice(0, length)}...${address.toString().slice(-length)}`;
}
