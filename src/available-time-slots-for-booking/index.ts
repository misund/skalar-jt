import { getPhotographers, getPhotographer, Photographer } from '../model/photographers'
import { getBookingsByPhotographer } from '../model/bookings'
import { getAvailabilities } from '../model/availabilities'

import { UnixTimespan, ISOTimespan, toUnixTime, toISOStrings } from './date-formatting'

// Order matters
const chronologicallyByStartTime = (a: UnixTimespan, b: UnixTimespan) => a.starts - b.starts

const minute = 60000

/**
 * Reduce a set of bookings in an availability
 * to a set of free time slots.
 *
 * Assumes that bookings do not overlap.
 * Assumes bookings in chronological order.
 */
const timeSlotReducer = (availabilities: UnixTimespan[], booking: UnixTimespan): UnixTimespan[] => {
	const availability = availabilities.pop() || { starts: 0, ends: 0 }

	// Booking is not within availability
	if (booking.starts >= availability.ends || booking.ends <= availability.starts) {
		availabilities.push(availability)
	}

	// Booking starts and ends within availability
	if (
		booking.starts >= availability.starts &&
		booking.starts <= availability.ends &&
		booking.ends < availability.ends
	) {
		availabilities.push({
			starts: availability.starts,
			ends: booking.starts,
		})

		availabilities.push({
			starts: booking.ends,
			ends: availability.ends,
		})
	}

	// Booking starts within availability
	// ... but ends after
	if (
		booking.starts >= availability.starts &&
		booking.starts <= availability.ends &&
		booking.ends >= availability.ends
	) {
		availabilities.push({
			starts: availability.starts,
			ends: booking.starts,
		})
	}

	// Booking starts before availability
	// ... but ends within
	if (
		booking.starts < availability.starts &&
		booking.ends > availability.starts &&
		booking.ends < availability.ends
	) {
		availabilities.push({
			starts: booking.ends,
			ends: availability.ends,
		})
	}

	return availabilities
}

/**
 * Find the first available time slot for a given photographer.
 */
const getPhotographerTimeSlot = ({
	photographerID,
	durationInMinutes,
}: {
	photographerID: string
	durationInMinutes: number
}) => {
	const photographer = getPhotographer(photographerID)
	const availabilities = getAvailabilities(photographer.id).map(toUnixTime)
	const bookings = getBookingsByPhotographer(photographer.id)
		.map(toUnixTime)
		.sort(chronologicallyByStartTime)

	/** A filter function to throw out time windows that are too short */
	const openingHasEnoughTimeForTheBooking = (opening: UnixTimespan): boolean =>
		opening.ends - opening.starts >= durationInMinutes * minute

	/** Get a list of open time slots in a single availability */
	const availabilityToOpenings = (availability: UnixTimespan): UnixTimespan[] =>
		bookings.reduce(timeSlotReducer, [availability])

	/** After a suitable starting time has been found, sets the ending time */
	const constructABooking = (timeSlot: UnixTimespan): UnixTimespan => ({
		starts: timeSlot.starts,
		ends: timeSlot.starts + durationInMinutes * minute,
	})

	const timeSlot = availabilities
		.flatMap(availabilityToOpenings)
		.filter(openingHasEnoughTimeForTheBooking)
		.map(constructABooking)
		.map(toISOStrings)
		[0]

	return {
		photographer,
		timeSlot,
	}
}

export type AvailableTimeSlotsForBooking = {
	photographer: Photographer
	timeSlot: ISOTimespan
}[]

const availableTimeSlotsForBooking = (durationInMinutes: number): AvailableTimeSlotsForBooking =>
	getPhotographers()
	.map((photographer) =>
		getPhotographerTimeSlot({
			durationInMinutes,
			photographerID: photographer.id,
		}),
	)
	// Remove photographers without openings
	.filter(entry => !!entry.timeSlot)

export default availableTimeSlotsForBooking
