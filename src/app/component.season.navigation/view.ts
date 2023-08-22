import { OnInit } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';

export class Component implements OnInit {
    private menu = 3;
    
    constructor(
        public service: Service,
    ) { }

    public async ngOnInit() {
    }

    private async show(num) {
        this.menu = num;
        await this.service.render();
    }
}