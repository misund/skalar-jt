import photographers from '../mock/photographers.json'

export interface Photographer {
	id: string;
	name: string;
}

interface Adapter {
	create: (photographer: Photographer) => string // returns the inserted id
	read: (id: string) => Photographer
	readAll: () => Photographer[]
	update: (photographer: Photographer) => string // returns the updated id
	del: (id: string) => string // returns the deleted id
	delAll: () => number // 0 on success, -1 on failure
}

/**
 * JSON adapter for the mock data given in the task.
 */
const mock: Adapter = {
	create: (photographer) => {
		console.warn('Not implemented')
		return "-1"
	},
	read: (id) => photographers.filter((photographer) => photographer.id == id)[0],
	readAll: () => photographers,
	update: (photographer) => {
		console.warn('Not implemented')
		return "-1"
	},
	del: (id) => {
		console.warn('Not implemented')
		return "-1"
	},
	delAll: () => {
		console.warn('Not implemented')
		return -1
	},
}
/**
 * localStorage adapter.
 */
 const ls: Adapter = {
	create: (photographer) => {
		const photographers = JSON.parse(localStorage.getItem('photographers') || "[]")
		photographers.push(photographer)

		localStorage.setItem('photographers', JSON.stringify(photographers))

		return photographer.id
	},

	read: (id) => {
		const photographers = JSON.parse(localStorage.getItem('photographers') || "[]")

		return photographers.filter((photographer: Photographer) => photographer.id == id)[0]
	},

	readAll: () => JSON.parse(localStorage.getItem('photographers') || "[]"),

	update: (photographer) => {
		const photographers = JSON.parse(localStorage.getItem('photographers') || "[]")
		const index = photographers.findIndex((b: Photographer) => b.id == photographer.id)
		photographers[index] = photographer
		localStorage.setItem('photographers', JSON.stringify(photographers))

		return photographer.id
	},

	del: (id) => {
		const photographers = JSON.parse(localStorage.getItem('photographers') || "[]")

		photographers.filter((photographer: Photographer) => photographer.id != id)
		localStorage.setItem('photographers', JSON.stringify(photographers))

		return id
	},

	delAll: () => {
		localStorage.removeItem('photographers')
		return 0
	}
}

export const {
	read: getPhotographer,
	readAll: getPhotographers,
} = mock
