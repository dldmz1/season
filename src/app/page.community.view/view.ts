import { OnInit } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';
import ClassicEditor from '@wiz/libs/ckeditor/ckeditor';
import { ElementRef, ViewChild } from '@angular/core';

export class Component implements OnInit {
    @ViewChild('editor')
    public editorElement: ElementRef;
    public editor: any;
    private isSet = false;

    private post = "";
    private user = {};
    private view = {};
    private login = null;

    constructor(
        public service: Service
    ) { }

    public async ngOnInit() {
        await this.service.init();
        await this.load();
        await this.buildEditor();
    }

    private async load() {
        this.post = WizRoute.segment.id;
        const { code, data } = await wiz.call("load", { id: this.post });
        if (code !== 200) {
            alert("[ERROR] Load");
            return;
        }
        const { view, login } = data;
        this.user = view.user;
        this.view = view;
        this.login = login;
    }

    public async buildEditor() {
        let editor = this.editor = await ClassicEditor.create(this.editorElement.nativeElement, {
            toolbar: {
                items: [
                    'undo', 'redo',
                    '|', 'heading',
                    '|', 'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify',
                    '|', 'fontColor', 'fontBackgroundColor', 'highlight',
                    '|', 'bold', 'italic', 'strikethrough', 'underline', 'code',
                    '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
                    '|', 'link', 'uploadImage', 'insertTable', 'blockQuote', 'codeBlock'
                ],
                shouldNotGroupWhenFull: true
            },
            link: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://'
            },
            removePlugins: ["MediaEmbedToolbar", "Markdown"],
            table: ClassicEditor.defaultConfig.table
        });

        const toolbarElement = editor.ui.view.toolbar.element;
        toolbarElement.style.display = 'none';
        editor.isReadOnly = true;
        this.editor.data.set(this.view.content);
        this.isSet = true;
        await this.service.render();
    }
}