var generators = require('yeoman-generator');
var slug = require('slug');
module.exports = generators.Base.extend({
	answers: {},
	// The name `constructor` is important here
	constructor: function () {
		// Calling the super constructor is important so our generator is correctly set up
		generators.Base.apply(this, arguments);
	},
	prompting: function() {
		var done = this.async();
		var self = this;
		this.prompt([
			{
				type    : 'input',
				name    : 'name',
				message : 'Your project name',
				default : this.appname // Default to current folder name
			},
			{
				type    : 'input',
				name    : 'description',
				message : 'Your project description'
			}
		],
		function (answers) {
			self.answers = answers;
			self.answers.slugName = slug(answers.name);
			done();
		}.bind(this));
	},
	dependencies: function() {
		this.npmInstall(
			[
				'babel-cli',
				'babel-preset-es2015',
				'chai',
				'mocha'
			],
			{ 'saveDev': true }
		);
	},
	gitignore: function() {
		this.fs.copyTpl(
			this.templatePath('gitignore'),
			this.destinationPath('.gitignore')
		);
	},
	eshint: function() {
		this.fs.copyTpl(
			this.templatePath('.eslintrc'),
			this.destinationPath('.eslintrc')
		);
	},
	babel: function() {
		this.fs.copyTpl(
			this.templatePath('.babelrc'),
			this.destinationPath('.babelrc')
		);
	},
	files: function() {
		this.fs.copyTpl(
			this.templatePath('test/index.js'),
			this.destinationPath('test/index.js')
		);
		this.fs.copyTpl(
			this.templatePath('src/index.js'),
			this.destinationPath('src/index.js')
		);
		this.fs.copyTpl(
			this.templatePath('LICENSE'),
			this.destinationPath('LICENSE')
		);
		this.fs.copyTpl(
			this.templatePath('README.md'),
			this.destinationPath('README.md'),
			this.answers
		);
	},
	packagejson: function() {
		this.fs.copyTpl(
			this.templatePath('package.json'),
			this.destinationPath('package.json'),
			this.answers
		);
	}
});