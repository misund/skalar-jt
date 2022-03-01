import bookings from '../mock/bookings.json'

export interface Booking {
	id: string
	photographer: string
	starts: string
	ends: string
}

interface Adapter {
	create: (booking: Booking) => string // returns the inserted id
	read: (id: string) => Booking
	readAll: () => Booking[]
	readByPhotographer: (photographer: string) => Booking[]
	update: (booking: Booking) => string // returns the updated id
	del: (id: string) => string // returns the deleted id
	delAll: () => number // 0 on success, -1 on failure
}

/**
 * JSON adapter for the mock data given in the task.
 */
 const mock: Adapter = {
	create: (booking) => {
		console.warn('Not implemented')
		return "-1"
	},
	read: (id) => bookings.filter((booking) => booking.id == id)[0],
	readAll: () => bookings,
	readByPhotographer: (photographer) =>
		bookings.filter((booking) => booking.photographer == photographer),
	update: (booking) => {
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
	create: (booking) => {
		const bookings = JSON.parse(localStorage.getItem('bookings') || "[]")
		bookings.push(booking)

		localStorage.setItem('bookings', JSON.stringify(bookings))

		return booking.id
	},

	read: (id) => {
		const bookings = JSON.parse(localStorage.getItem('bookings') || "[]")

		return bookings.filter((booking: Booking) => booking.id == id)[0]
	},

	readAll: () => JSON.parse(localStorage.getItem('bookings') || "[]"),

	readByPhotographer: (photographer) =>
		JSON.parse(localStorage.getItem('bookings') || "[]")
		.filter((booking: Booking) => booking.photographer == photographer)
	,

	update: (booking) => {
		const bookings = JSON.parse(localStorage.getItem('bookings') || "[]")
		const index = bookings.findIndex((b: Booking) => b.id == booking.id)
		bookings[index] = booking
		localStorage.setItem('bookings', JSON.stringify(bookings))

		return booking.id
	},

	del: (id?) => {
		const bookings = JSON.parse(localStorage.getItem('bookings') || "[]")

		bookings.filter((booking: Booking) => booking.id != id)
		localStorage.setItem('bookings', JSON.stringify(bookings))

		return id
	},
	
	delAll: () => {
		localStorage.removeItem('bookings')
		return 0
	}
}

export const {
	read: getBooking,
	readByPhotographer: getBookingsByPhotographer,
} = mock