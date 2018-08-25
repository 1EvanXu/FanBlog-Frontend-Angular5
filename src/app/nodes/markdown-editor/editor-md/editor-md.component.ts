import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';

declare var editormd: any;
declare var $: any;

@Component({
  selector: 'app-editor-md',
  template: `
    <div id="md">
      <textarea style="display: block;" [(ngModel)]="mdContent"></textarea>
    </div>
  `,
  styles: []
})
export class EditorMdComponent implements OnInit, AfterViewInit {
  editorMdConfig: EditorConfig;
  private editor: any;
  @Input() mdContent: string;
  @Output() mdContentChange = new EventEmitter<any>();
  @Output() saveAction = new EventEmitter<any>();

  mdContentChange$ = new Subject<string>();

  constructor() {
    this.editorMdConfig = new EditorConfig(this.saveAction);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editor = editormd('md', this.editorMdConfig);
    const mdTextArea = $('#md :first'); // 获取textarea元素
    const mdContentOut = this.mdContentChange;
    const mdContentChange = this.mdContentChange$;
    this.editor.on('change', function () {
      mdContentOut.emit();
      mdContentChange.next(mdTextArea.val());
    });
  }
  getMarkContent(): string {
    return $('#md :first').val();
  }
  getHtmlContent(): string {
    const htmlTextArea = $('.editormd-html-textarea');
    return htmlTextArea.val();
  }
}


class EditorConfig {
  public width = '100%';
  public height = '100%';
  public path = 'assets/editor.md/lib/';
  public codeFold: true;
  public searchReplace = true;
  public toolbar = true;
  public emoji = true;
  public taskList = true;
  public tex = true;
  public readOnly = false;
  public tocm = true;
  public watch = true;
  public previewCodeHighlight = true;
  public saveHTMLToTextarea = true;
  public markdown = '';
  public flowChart = true;
  public syncScrolling = true;
  public sequenceDiagram = true;
  public imageUpload = true;
  public imageFormats = ['jpg', 'jpeg', 'gif', 'png'];
  public imageUploadURL = 'http://localhost:8080/apis/blog/resources/images';
  private saveEvent: EventEmitter<any>; // 保存事件发射器
  public lang = {
    toolbar: {
      save: 'Save content',
    }
  };
  public toolbarIconsClass = {
    save: 'fa-save'
  };
  public toolbarHandlers = {
    save: () => {
      this.saveEvent.emit();
    },
  };
  public toolbarIcons = function() {
    return [
      'undo', 'redo', '|', 'bold', 'del', 'italic', 'quote', 'ucwords', 'uppercase', 'lowercase', '|', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      '|', 'list-ul', 'list-ol', 'hr', '|', 'link', 'reference-link', 'image', 'code', 'preformatted-text', 'code-block', 'table',
      'datetime', 'emoji', 'html-data-model', 'pagebreak', '|', 'goto-line', 'watch', 'preview', 'fullscreen', 'clear', 'search', 'help',
      '|', 'save'];
  };
  constructor(e: EventEmitter<any>) {
    this.saveEvent = e;
  }
}
