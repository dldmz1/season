import { OnInit, Input } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';

export class Component implements OnInit {
    private postID = "";
    private view = {};

    constructor(
        public service: Service
    ) { }

    public async ngOnInit() {
        await this.service.init();
        await this.load();
    }

    private async load() {
        this.postID = WizRoute.segment.id;
        const { code, data } = await wiz.call("load", { id: this.postID });
        if (code !== 200) {
            alert("[ERROR] Load");
            return;
        }
        this.view = data;
        await this.service.render();
    }
}