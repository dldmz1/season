import { Input } from '@angular/core';

export class Component {
    @Input() title: string = "";
    @Input() text: string = "";
    @Input() src: string = "";

    constructor() {
    }
}