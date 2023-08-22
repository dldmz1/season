import { OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { VIA } from 'vgg-image-annotator';
// import { _via_init, _via_update_ui_components } from '@wiz/libs/via';
// import { DomSanitizer } from '@angular/platform-browser';

export class Component implements OnInit {
    private safeUrl: SafeUrl;

    constructor(
        private sanitizer: DomSanitizer
    ) { }

    public async ngOnInit() {
        const via = "/assets/via.js";
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(via);

        await this.via();

        // _via_init();
        // document.body.onresize = _via_update_ui_components();

        // console.log(this.sanitizer)
        // this.jq = this.sanitizer.bypassSecurityTrustResourceUrl(`https://code.jquery.com/jquery-3.6.0.min.js`);
        // this.jq = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://code.jquery.com/jquery-3.6.0.min.js`);
    }
}