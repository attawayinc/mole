import { Mole } from './mole'

console.log(Mole)

export default class Plugin {
	constructor(name, callback) {
		this.name = name
		if (callback(mole.model, mole.theme))
			this.string = callback(mole.model, mole.theme)
		if (this.render()) this.rendered = this.render()
		this.model = mole.model
	}
	render() {
		if (this.string) {
			return env.renderString(this.string, mole.model)
		}
	}
}