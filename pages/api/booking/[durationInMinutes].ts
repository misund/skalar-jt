// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import availableTimeSlotsForBooking, {AvailableTimeSlotsForBooking} from '../../../src/available-time-slots-for-booking'

export default function handler(req: NextApiRequest, res: NextApiResponse<AvailableTimeSlotsForBooking>) {
	const { durationInMinutes } = req.query

	res.status(200).json(
		availableTimeSlotsForBooking(
			Number.parseInt(durationInMinutes)
		)
	)
}
