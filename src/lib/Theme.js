import fs from 'fs'
import jsonnet from '@unboundedsystems/jsonnet'
import cloneDeep from 'lodash.clonedeep'
import glob from 'glob'
import is from '../util/is'
import data from './Data'

class Theme {
	constructor() {
		return this
	}
	set(value, config) {
		// Parses the theme
		let jsRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
		let jsonnetRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim
		let result
		if (is.what(value) === 'path' || is.what(value) === 'file') {

			let path = getThemePath(config)

			if (jsRegex.test(path)) {
				result = require(file)

			}
			if (jsonnetRegex.test(path)) {

				const getFile = fs.readFileSync(path).toString()

				const jsonnetVm = new jsonnet.Jsonnet()

				result = jsonnetVm.eval(getFile)

				jsonnetVm.destroy()
			}
		} else if (is.what(value) === 'object') {
			result = value
		} else {
			result = {}
		}

		// If theme already set then merge with new settings
		if (theme.result) {
			result = Object.assign(theme.result, result)
		}
		Object.assign(this, result)
		data.update(this)
	}
}

function getThemePath(config) {

	const RE_JS = /([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/gim
	const RE_JSONNET = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/gim

	let path = ''
	let files

	// If theme is specified as a dir
	if (is.what(config.theme) === 'dir') {
		files = glob.sync(config.root + config.theme + '**/*')
	}

	// If theme is specified as a file
	if (is.what(config.theme) === 'file') {
		files = glob.sync(config.root + config.theme)
	}

	// Check if file is one of supported extensions
	files.map(function(file) {
		if (RE_JS.test(file) || RE_JSONNET.test(file)) {
			path = file
		}
	})

	console.log(path)

	return path
}

const theme = new Theme()

export default theme
