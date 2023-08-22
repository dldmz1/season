import { OnInit, ElementRef, ViewChild } from '@angular/core';
import { Service } from '@wiz/libs/portal/season/service';
import ClassicEditor from '@wiz/libs/ckeditor/ckeditor';

export class Component implements OnInit {
    @ViewChild('editor')
    public editorElement: ElementRef;
    public editor: any;
    public Editor = ClassicEditor;

    private post = {
        content: "",
    };

    constructor(
        public service: Service
    ) { }

    public async ngOnInit() {
        await this.service.init();
        await this.load();
        await this.buildEditor();
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

    public async buildEditor() {
        let editor = this.editor = await ClassicEditor.create(this.editorElement.nativeElement, {
            toolbar: {
                items: [
                    'undo', 'redo',
                    '|', 'heading',
                    '|', 'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify',
                    '|', 'fontColor', 'fontBackgroundColor', 'highlight',
                    '|', 'bold', 'italic', 'strikethrough', 'underline',
                    '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
                ],
                shouldNotGroupWhenFull: true
            },
            removePlugins: ["MediaEmbedToolbar", "Markdown"],
            table: ClassicEditor.defaultConfig.table,
            simpleUpload: {
                // uploadUrl: '/files/data/upload/dataset/' + this.info.id
            }
        });
        this.editor.data.set(this.post.content);
    }

    private async update() {
        this.post.content = this.editor.data.get();
        const { code, data } = await wiz.call("update", this.post);
        if (code !== 200) {
            alert("[ERROR] Update");
            return;
        }
        await this.alert(data, "success");
        this.service.href("/community");
    }

    private async remove() {
        let res = await this.service.alert.show({
            title: "게시글 삭제",
            message: "정말로 이 게시글을 삭제하겠습니까?",
            cancel: "취소",
        });
        if (!res)
            return;

        const { code } = await wiz.call("remove", { id: this.post.id });
        if (code !== 200) {
            alert("[ERROR] Delete");
            return;
        }
        await this.alert("삭제 완료", "success");
        this.service.href("/community");
    }
}