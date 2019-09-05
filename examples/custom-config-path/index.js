const mole = require('mole')

mole.config('src/config.js')

// Dynamically add a model
mole.create('model', 'redModel', ({ data, theme }) => {
	return data
})

// Dynamically add a template
mole.create('template', 'redTemplate', () => {
	return `The color red is {{red}}`
})

mole.build()

// console.log(mole.debug)