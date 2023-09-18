class Interpreter {

    constructor(stdin_handler, stdout_handler, stderr_handler) {
        this.stdin_handler = stdin_handler;
        this.stdout_handler = stdout_handler;
        this.stderr_handler = stderr_handler;
        this.pyodide;
        loadPyodide({
            stdin: this.stdin_handler,
            stdout: this.stdout_handler,
            stderr: this.stderr_handler
        }).then(r => this.pyoide = r);
    }

    run(python) {
        try {
            this.pyoide.runPython(python)
        } catch(e) {
            this.stderr_handler(e)
        }
    }

}


const registerRuntime = () => {
    let editors = document.querySelectorAll(".ezpython");
    let editor = monaco.editor.create()

}

require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

require(["vs/editor/editor.main"], function () {
    fetch(`${window.location.origin}/img/monaco_themes/monokai.json`).then(x => x.json().then(theme => {
        console.log(theme)
        // theme = MonacoThemes.parseTmTheme(theme);
        monaco.editor.defineTheme('monokai', theme);
        monaco.editor.setTheme('monokai');
    }));

    let editor = monaco.editor.create(document.querySelector('.ezpython'), {
        value:
            "from manim import *\n" +
            "\n" +
            "\n" +
            "class KernelTrick(ThreeDScene):\n" +
            "    def construct(self):\n" +
            "        axes = ThreeDAxes((-4.5, 4.5, 0.5), (-4.5, 4.5, 0.5), (0, 16, 2), 10, 10)\n" +
            "        self.play(Create(axes))\n" +
            "        self.wait()\n" +
            "\n" +
            "        def get_point_from_radius(rad):\n" +
            "            radian = np.random.random() * 2 * np.pi\n" +
            "            return np.array(\n" +
            "                [\n" +
            "                    rad * np.cos(radian) + np.random.random() - 0.5,\n" +
            "                    rad * np.sin(radian) + np.random.random() - 0.5,\n" +
            "                    0,\n" +
            "                ]\n" +
            "            )\n" +
            "\n" +
            "        radius_red = 1\n" +
            "        radius_blue = 2",
        language: 'python',
        theme: 'monokai',
        fontSize: "15px",
    });
});

