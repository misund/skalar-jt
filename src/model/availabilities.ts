import availabilities from '../mock/availabilities.json'

// No ids available in mocks. Consider remodeling onto Photographer
export interface Availability {
	photographer: string;
	starts: string;
	ends: string;
}

interface Adapter {
	create: (availability: Availability) => boolean // gah, no ids. true on success, false on failure
	readAll: () => Availability[]
	readByPhotographer: (photographer: string) => Availability[]
	delAll: () => number // 0 on success, -1 on failure
}

/**
 * JSON adapter for the mock data given in the task.
 */
const mock: Adapter = {
	create: (availability) => {
		console.warn('Not implemented')
		return false
	},
	readAll: () => availabilities,
	readByPhotographer: (photographer) => availabilities.filter((availability) => availability.photographer == photographer),
	delAll: () => {
		console.warn('Not implemented')
		return -1
	},
}

/**
 * localStorage adapter.
 */
 const ls: Adapter = {
	create: (availability) => {
		const availabilities = JSON.parse(localStorage.getItem('availabilities') || "[]")
		availabilities.push(availability)

		localStorage.setItem('availabilities', JSON.stringify(availabilities))

		return true
	},

	readAll: () => JSON.parse(localStorage.getItem('availabilites') || "[]"),
	
	readByPhotographer: (photographer) => {
		const availabilites = JSON.parse(localStorage.getItem('availabilites') || "[]")

		return availabilities.filter((availability) => availability.photographer == photographer)
	},

	delAll: () => {
		localStorage.removeItem('availabilities');
		return 0;
	}
}
	
export const {
	readByPhotographer: getAvailabilities,
} = mock