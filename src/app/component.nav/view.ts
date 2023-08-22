import { OnInit } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';

export class Component implements OnInit {
    public isMenuCollapsed: boolean = true;

    private username = null;
    private showNoti = false;
    private newNoti = true;

    constructor(
        public service: Service,
    ) { }

    public async ngOnInit() {
        await this.service.init();

        this.username = this.service.auth.session.name;

        await this.service.render();
    }

    private async display() {
        this.showNoti = !this.showNoti;
        await this.service.render();
    }
}