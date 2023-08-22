import { OnInit } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';

export class Component implements OnInit {
    private user = [];
    private mode = "default";
    private data = {
        name: "",
        title: "",
        email: "",
        role: "User"
    };

    constructor(
        public service: Service,
    ) { }

    public async ngOnInit() {
        await this.load();
    }

    public async alert(message: string, status: string = 'error') {
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
        const { code, data } = await wiz.call("load");
        if (code !== 200) {
            this.service.toast.error("[ERROR] load");
            return;
        }
        this.user = data;
        await this.service.render();
    }

    private async create() {
        if (this.data.name.length > 16) {
            let message = "16자 이하의 이름으로 작성해주세요.";
            await this.alert(message);
            return;
        }
        else if (this.data.name.length == 0) {
            let message = "이름을 작성해주세요.";
            await this.alert(message);
            return;
        }
        if (this.data.title.length > 16) {
            let message = "16자 이하의 내용으로 작성해주세요.";
            await this.alert(message);
            return;
        }
        else if (this.data.title.length == 0) {
            let message = "내용을 작성해주세요.";
            await this.alert(message);
            return;
        }
        const { code, data } = await wiz.call("create", this.data);
        if (code === 401) {
            let message = "이메일 형식이 올바르지 않습니다.";
            await this.alert(message);
            return;
        }
        else if (code !== 200) {
            this.service.toast.error("[ERROR] create");
            return;
        }
        this.mode = "default";
        let message = "새로운 데이터가 추가 되었습니다.";
        await this.alert(message, 'success');

        await this.load();
    }

    private async edit() {
        this.service.toast.warning("아직 준비중인 기능입니다.");
    }
}