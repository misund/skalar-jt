# Booking calendar

Imagine a list of photographers, where each photographer have a list of availabilities and existing bookings for a given day.
```json
{
  "photographers": [
    {
      "id": "1",
      "name": "Otto Crawford",
      "availabilities": [
        {
          "starts": "2020-11-25T08:00:00.000Z",
          "ends": "2020-11-25T16:00:00.000Z"
        }
      ],
      "bookings": [
        {
          "id": "1",
          "starts": "2020-11-25T08:30:00.000Z",
          "ends": "2020-11-25T09:30:00.000Z"
        }
      ]
    },
    {
      "id": "2",
      "name": "Jens Mills",
      "availabilities": [
        {
          "starts": "2020-11-25T08:00:00.000Z",
          "ends": "2020-11-25T09:00:00.000Z"
        },
        {
          "starts": "2020-11-25T13:00:00.000Z",
          "ends": "2020-11-25T16:00:00.000Z"
        }
      ],
      "bookings": [
        {
          "id": "2",
          "starts": "2020-11-25T15:00:00.000Z",
          "ends": "2020-11-25T16:00:00.000Z"
        }
      ]
    }
  ]
}
```

* availabilities: Defines when the photographer is working and available to do bookings.
* bookings: Defines existing bookings for a photographer. This means this slot is not open for new bookings.

Also imagine a new booking not yet booked on a photographer:
```json
{
  "booking": {
    "durationInMinutes": 90
  }
}
```

Notice that this booking requires 90 minutes, which means that the photographer must have a time slot for at least 90 minutes available. 1 minute leeway is ok.

Now we're going to need an interface in order to see when each photographer is able to do this booking. The first possible time slot for each photographer should be preferred, which means that if Person A can do the booking both 8 o'clock and 10 o'clock, 8 o´clock should be suggested first.

## Task
Write a function that accepts the booking's required duration and returns a list of photographers along with the first available slot for the requested booking. This function could look like this interface:
```typescript
function availableTimeSlotsForBooking(
  durationInMinutes: number
): {
  photographer: { id: string; name: string }
  timeSlot: { starts: string; ends: string }
}[] {}
```

It's up to you how to solve this. You can hard code the JSON-data and parse it by code, or you can populate a database and do some of the queries with SQL.
All dates are 25th of November 2020 and times are stored as UTC, and you do not have to take into consideration that dates can span over multiple dates/time zones. We're keeping things simple here.

## Example response
```json
[
  {
    "photographer": {
        "id": 1,
        "name": "Otto Crawford"
    },
    "timeSlot": {
        "starts": "2020-11-25T09:30:00.000Z",
        "ends": "2020-11-25T11:00:00.000Z"
    }
  },
  {
    "photographer": {
      "id": "2",
      "name": "Jens Mills"
    },
    "timeSlot": {
      "starts": "2020-11-25T13:00:00.000Z",
      "ends": "2020-11-25T14:30:00.000Z"
    }
  }
]
```
