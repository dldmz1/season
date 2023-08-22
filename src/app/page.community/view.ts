import { OnInit, Input } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';

export class Component implements OnInit {
    private list = [];
    private login = null;
    private text = "";

    private page = {
        current: 1,
        start: 1,
        end: 1,
    };

    constructor(
        public service: Service
    ) { }

    public async ngOnInit() {
        await this.service.init();
        await this.load();
    }

    private async load() {
        const { code, data } = await wiz.call("load", { page: this.page.current, text: this.text });
        if (code !== 200) {
            alert("[ERROR] Load");
            return;
        }

        const { list, lastpage, login } = data;

        this.page.start = (parseInt(this.page.current / 11) * 10) + 1;
        this.page.end = lastpage;
        this.list = list;
        this.login = login;

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
        this.service.href("/community/view/" + id);
    }

    private async move(index: number) {
        this.page.current = index;
        await this.load();
    }
}