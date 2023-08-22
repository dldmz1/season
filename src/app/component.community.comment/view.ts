import { OnInit } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';

export class Component implements OnInit {
    private list = [];
    private post = null;
    private login = null;
    private comment = { id: "", content: "" };

    private isUpload = false;
    private isUpdate = false;

    constructor(
        public service: Service
    ) { }

    public async ngOnInit() {
        await this.service.init();
        await this.load();
    }

    private async alert(message: string, status: string = 'error') {
        return await this.service.alert.show({
            title: "",
            message: message,
            cancel: false,
            actionBtn: status,
            action: "확인",
            status: status
        });
    }

    private async load() {
        this.post = WizRoute.segment.id;
        const { code, data } = await wiz.call("load", { post: this.post });
        if (code !== 200) {
            alert("[ERROR] load");
            return;
        }

        const { list, login } = data;
        this.list = list;
        this.login = login;

        await this.service.render();
    }

    private async upload() {
        if (this.isUpload) {
            return;
        }
        this.isUpload = true;

        if (this.comment.content == "") {
            this.service.toast.error("내용을 입력해주세요")
            return;
        }

        const { code } = await wiz.call("upload", { id: this.post, content: this.comment.content });
        if (code !== 200) {
            alert("[ERROR] upload");
            return;
        }

        this.isUpload = false;
        this.comment.content = "";
        await this.load();
    }

    private async remove(id: number) {
        let res = await this.service.alert.show({
            title: "",
            message: "정말 이 댓글을 삭제하겠습니까?",
            cancel: "취소",
        });
        if (!res)
            return;

        const { code } = await wiz.call("remove", { id });
        if (code !== 200) {
            alert("[ERROR] remove");
            return;
        }
        await this.alert("삭제 완료", "success");
        await this.load();
    }

    private async update(item) {
        if (this.isUpdate) {
            return;
        }
        this.isUpdate = true;

        const id = item.id;
        const content = item.content;

        const { code } = await wiz.call("update", { id, content });
        if (code !== 200) {
            alert("[ERROR] update");
            return;
        }

        this.isUpdate = false;
        await this.load();
    }
}