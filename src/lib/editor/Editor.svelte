<script lang="ts">
	import { onMount } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	import * as monaco from 'monaco-editor';
	import { emmetHTML } from 'emmet-monaco-es';

	export let name: string;
	export let value: string;

	let editorValue: string = value;

	let container: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor;

	let ignoreEvent = false;

	function updateHeight() {
		const width = container.clientWidth;
		const contentHeight = editor.getContentHeight();
		container.style.width = `${width}px`;
		container.style.height = `${contentHeight}px`;
		try {
			ignoreEvent = true;
			editor.layout({ width, height: contentHeight });
		} finally {
			ignoreEvent = false;
		}
	}

	onMount(() => {
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};

		emmetHTML(monaco, ['html']);

		editor = monaco.editor.create(container, {
			value: editorValue,
			language: 'html',
			fontSize: 15,
			lineNumbers: 'off',
			folding: false,
			scrollBeyondLastLine: false,
			wordWrap: 'on',
			wrappingStrategy: 'advanced',
			minimap: {
				enabled: false
			},
			overviewRulerLanes: 0,
			scrollbar: {
				alwaysConsumeMouseWheel: false,
				vertical: 'hidden',
				horizontal: 'hidden'
			}
		});

		editor.onDidContentSizeChange(updateHeight);
		updateHeight();

		editor.getModel()?.onDidChangeContent(() => {
			if (!ignoreEvent) {
				value = editor.getValue();
			}
		});

		return () => {
			editor.dispose();
		};
	});
</script>

<input type="hidden" {name} {value} />

<div class="overflow-hidden rounded-md bg-white p-2">
	<div bind:this={container} class=""></div>
</div>
