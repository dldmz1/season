import { OnInit } from "@angular/core";

export class Component implements OnInit {
    private card = [
        { title: "MAC", text: "맥", src: "http://newsimg-hams.hankookilbo.com/2022/10/19/7576de8e-e4f6-4827-9f17-cfefe4be052f.jpg" },
        { title: "WEB", text: "웹 사이트", src: "/assets/season/career/2599.svg" },
        { title: "CLOCK", text: "시계", src: "/assets/season/career/2600.svg" },
        { title: "AIRPLANE", text: "비행기", src: "/assets/season/career/2601.svg" },
        { title: "RAMEN", text: "라면", src: "/assets/season/career/2602.svg" },
        { title: "GIFT", text: "선물", src: "/assets/season/career/2603.svg" },
        { title: "BOOK", text: "책", src: "/assets/season/career/2604.svg" }
    ]


    constructor() { }

    public async ngOnInit() { }

}