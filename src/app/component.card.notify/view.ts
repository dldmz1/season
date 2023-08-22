import { OnInit } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';

export class Component implements OnInit {
    private list = [];

    constructor(
        public service: Service,
    ) { }

    public async ngOnInit() {
        const { code, data } = await wiz.call("list");
        if (code !== 200) {
            alert("[ERROR] load list");
            return;
        }
        this.list = data;
        await this.service.render();
    }

    private async show(index) {
        // item 해당하는 링크로 이동

        this.list[index].show = true;
        await this.service.render();
    }
}