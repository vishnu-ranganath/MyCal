import { AbstractCalendarComponent } from "./AbstractCalendarComponent";

export class Calendar {

    prodid: string;
    version: number;
    scale: string;
    components: AbstractCalendarComponent[];

    constructor() {
        this.prodid = "";
        this.version = 2.0;
        this.scale = "";
        this.components = [];
    }

}