import { OnInit, Input } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';

export class Component implements OnInit {
    private list = [];
    private text = "";

    constructor(
        public service: Service
    ) { }

    public async ngOnInit() {
        await this.service.init();
        await this.load();
    }

    private async load() {
        const { code, data } = await wiz.call("load", { text: this.text });
        if (code !== 200) {
            alert("[ERROR] Load");
            return;
        }
        this.list = data;
        await this.service.render();
    }

    private async search() {
        if (this.text.length === 0) {
            alert("검색어를 입력해주세요");
            return;
        }
        await this.load();
    }

    private async show(id) {
        this.service.href("/community/board/view/" + id);
    }
}