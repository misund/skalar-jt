/**
 * There's only one good way to store and handle dates, namely
 * the number of seconds since January 1, 1970. (Milliseconds
 * is fine...)
 *
 * So instead of doing Date.parse() whenever a comparison is needed,
 * I'm going to use using the primitive by default and convert it
 * back to an ISO string before passing it away to anyone else.
 */
export interface UnixTimespan {
	starts: number
	ends: number
}

/**
 * Stick to the original date format whenever leaving the context of
 * this catalog.
 */
export interface ISOTimespan {
	starts: string
	ends: string
}

/**
 * Convert from ISO strings to Unix timestamps (millisecond resolution).
 *
 * This currently throws away any other properties. ...rest if needed?
 */
export const toUnixTime = (timespan: ISOTimespan): UnixTimespan => ({
	starts: Date.parse(timespan.starts),
	ends: Date.parse(timespan.ends),
})

/**
 * Convert from Unix timestamps (millisecond resolution) to ISO strings.
 *
 * This currently throws away any other properties. ...rest if needed?
 */
export const toISOStrings = (timespan: UnixTimespan): ISOTimespan => ({
	starts: new Date(timespan.starts).toISOString(),
	ends: new Date(timespan.ends).toISOString(),
})
