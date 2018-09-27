import { Ad } from "./ad";
import { AdAssignment } from "./ad-assignment";
import { AdRouting } from "./ad-routing";

export class Queue {
    name: string;
    ads: AdRouting[];
}
