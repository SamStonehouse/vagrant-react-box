require.config({
	shim: {
		'react': {
			exports: 'React',
		}
	},
    paths: {
		"react": "lib/react-with-addons",
		"JSXTransformer": "lib/jsx-transformer",
		"jsx": "lib/jsx-plugin",
		"text": "lib/text",
    },
    jsx: {
		fileExtension: '.jsx'
	}
});

require(['react', 'jsx!components/timer.component'], function (React, Timer) {
	var start = new Date();
	Timer = React.createFactory(Timer);
	React.render(Timer({start: start}), document.body);

});