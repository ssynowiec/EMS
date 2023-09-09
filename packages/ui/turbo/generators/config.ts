import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator('react-component', {
		description: 'Adds a new react component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of the component?',
			},
		],
		actions: [
			{
				type: 'add',
				path: './components/{{lowerCase name}}/{{pascalCase name}}.tsx',
				templateFile: 'templates/component.hbs',
			},
			{
				type: 'append',
				path: 'index.tsx',
				template: `export { {{pascalCase name}} } from './components/{{lowerCase name}}/{{pascalCase name}}';\n`,
			},
		],
	});
}
