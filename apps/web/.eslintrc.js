module.exports = {
	root: true,
	extends: ['next/core-web-vitals', 'custom'],
	rules: {
		'@next/next/no-html-link-for-pages': 'off',
		'react/jsx-key': 'off',
		'react-hooks/exhaustive-deps': 'error',
	},
};
