import { OnInit, Input } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';

export class Component implements OnInit {
    private post = {};

    constructor(
        public service: Service
    ) { }

    public async ngOnInit() {
        await this.service.init();
        await this.load();
    }

    private async load() {
        this.post.id = WizRoute.segment.id;
        if (this.post.id !== "new") {
            const { code, data } = await wiz.call("load", { id: this.post.id });
            if (code !== 200) {
                alert("[ERROR] Load");
                return;
            }
            this.post = data;
        }
        await this.service.render();
    }

    private async update() {
        const { code } = await wiz.call("update", this.post);
        if (code !== 200) {
            alert("[ERROR] Update");
            return;
        }
        this.service.href("/community/board/list");
    }

    private async remove() {
        let res = await this.service.alert.show({
            title: "게시글 삭제",
            message: "정말로 이 게시글을 삭제하겠습니까?",
        });

        if (!res)
            return;

        const { code } = await wiz.call("remove", { id: this.post.id });
        if (code !== 200) {
            alert("[ERROR] Delete");
            return;
        }
        this.service.href("/community/board/list");
    }
}