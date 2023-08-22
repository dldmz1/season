import { OnInit } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';

export class Component implements OnInit {
    constructor(public service: Service) { }
    public async ngOnInit() {
        await this.service.init();
        await this.service.render();
    }

    public step: number = 0;

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

    // 회원가입
    public userdata: any = {
        id: '',
        mail: '',
        name: '',
        password: '',
        password_repeat: '',
    };

    private async move() {
        // if (this.userdata.mobile.length == 0) return await this.alert("휴대폰 번호를 입력해주세요");
        this.step = 1;
        await this.service.render();
    }

    public async join() {
        let id = this.userdata.id;
        let password = this.userdata.password;
        let password_re = this.userdata.password_repeat;
        let name = this.userdata.name;

        if (id > 20) return await this.laert("20자 이하의 아이디로 설정해주세요");
        if (password.length < 8) return await this.alert("8자 이상의 비밀번호를 설정해주세요");
        if (password.length > 16) return await this.alert("16자 이하의 비밀번호를 설정해주세요");
        if (password.search(/[a-z]/i) < 0) return await this.alert("비밀번호에 영문을 포함해주세요");
        if (password.search(/[0-9]/) < 0) return await this.alert("비밀번호에 숫자를 포함해주세요");
        if (password != password_re) return await this.alert("비밀번호가 일치하지 않습니다");
        if (name.length === 0) this.userdata.name = this.userdata.id;

        let user = JSON.parse(JSON.stringify(this.userdata));
        delete user.password_repeat;

        user.password = this.service.auth.hash(user.password);

        let { code, data } = await wiz.call("join", user);

        if (code != 200) {
            await this.alert(data);
            location.href = "/";
        }

        await this.alert("회원가입이 완료되었습니다. 로그인을 해주세요.", "success");
        location.href = "/login";
    }
}