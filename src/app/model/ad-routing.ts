import { Ad } from "./ad";
import { TaskHistory } from "./task-history";

export class AdRouting {
    adId: number;
    adDate: Date;
    adType: string;
    adSize: string;
    orderNumber: number;
    advertiser: string;
    substrate: string;
    levels: string;
    dateAdded: Date;
    devOk: boolean;
    dpOk: boolean;
    qaOk: boolean;
    dispatched: boolean;
    taskHistory: TaskHistory[];
}





