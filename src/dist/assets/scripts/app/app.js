require.config({
    paths: {
		"react": "assets/scripts/lib/react",
		"JSXTransformer": "assets/scripts/lib/jsx-transformer",
		"jsx": "assets/scripts/lib/jsx plugin"
    },
});

require(['react', 'jsx!components/Timer'], function (React, Timer) {
	React.renderComponent(<Timer />, document.getElementById('timer'));
});