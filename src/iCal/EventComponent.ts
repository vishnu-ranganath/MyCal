import { URL } from "url";
import { AbstractCalendarComponent } from "./AbstractCalendarComponent";

export class EventComponent extends AbstractCalendarComponent {
    
    dtstamp: Date;
    uid: string;
    dtstart: Date;
    class: string;
    created: Date;
    description: string;
    geo: string;
    lastMod: Date;
    location: string;
    organizer: URL;
    priority: number;
    seq: number;
    status: string;
    summary: string;
    transp: string;
    url: URL;
    recurid: Date;
    dtend: Date;
    duration: string;
    rrule: any[];
    attachment: string[];
    attendee: URL[];
    categories: string[][];
    comment: string[];
    contact: string[];
    exdate: Date[];
    rstatus: string[];
    related: string[];
    resources: string[];
    rdate: Date[][];

    constructor() {
        super()
        this.dtstamp = new Date();
        this.uid = "";
        this.dtstart = new Date();
        this.class = "";
        this.created = new Date();
        this.description = "";
        this.geo = "";
        this.lastMod = new Date();
        this.location = "";
        this.organizer = new URL("https://www.example.com/index.html");
        this.priority = 0;
        this.seq = 0;
        this.status = "";
        this.summary = "";
        this.transp = "";
        this.url = new URL("https://www.example.com/index.html");
        this.recurid = new Date();
        this.dtend = new Date();
        this.duration = "";
        this.rrule = [];
        this.attachment = [];
        this.attendee = [];
        this.categories = [];
        this.comment = [];
        this.contact = []
        this.exdate = [];
        this.rstatus = [];
        this.related = [];
        this.resources = [];
        this.rdate = [];
    }

}