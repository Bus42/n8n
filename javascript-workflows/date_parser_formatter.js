function n8nFunction(weeklySchedule) {
    // Variables
    let error;
    const streamers = [];
    const available = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    };
    const shortlist = [];

    function addToAvailableSlots(time) {
        const formattedTime = formatDayAndTime(time);
        const formattedTimeParts = formattedTime.split(' ')
        switch (formattedTimeParts[0]) {
            case 'Mon':
                available.monday.push(formattedTimeParts[1])
                break;
            case 'Tue':
                available.tuesday.push(formattedTimeParts[1])
                break;
            case 'Wed':
                available.wednesday.push(formattedTimeParts[1])
                break;
            case 'Thu':
                available.thursday.push(formattedTimeParts[1])
                break;
            case 'Fri':
                available.friday.push(formattedTimeParts[1])
                break;
            default:
                error = `Error adding time slot to available slots: ${formattedTimeParts[0]} ${formattedTimeParts[1]} ${formattedTimeParts[2]}`;
        }
    }

    // Helper: Parse datetime string (ignore timezone, treat as UTC)
    function parseDateTimeWithTimezone(dateStr) {
        const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})\s+([A-Z]{3,4})$/);
        if (!match) {
            error = "Invalid date format. Expected: YYYY-MM-DD HH:MM TZ";
        }
        const [, year, month, day, hours, minutes] = match;
        return new Date(Date.UTC(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            parseInt(hours),
            parseInt(minutes)
        ));
    }

    // Helper: Format as "Day HH:MM"
    function formatDayAndTime(dateStr) {
        const date = parseDateTimeWithTimezone(dateStr);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
        const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return `${dayOfWeek} ${time}`;
    }

    // Making the sausage
    weeklySchedule.forEach(day => {
        day.train_stops.forEach(stop => {
            if (stop.channel_name) {
                streamers.push({
                    name: stop.channel_name,
                    url: stop.channel_url,
                    start: formatDayAndTime(stop.start_datetime)
                });
                if (!shortlist.includes(stop.channel_name)) {
                    shortlist.push(stop.channel_name)
                }
            } else {
                addToAvailableSlots(stop.start_datetime)
            }
        });
    });

    return [
        {
            json: {
                data: {
                    streamers,
                    shortlist,
                    available
                },
                error: error ?? null
            }
        }
    ];
}
// Example data for testing
const exampleData = [
    {
        train_stops: [
            { channel_name: "joedirty_5150", channel_url: "https://twitch.tv/joedirty_5150", start_datetime: "2025-12-29 16:00 MST" },
            { channel_name: "annabaybee2", channel_url: "https://twitch.tv/annabaybee2", start_datetime: "2025-12-29 17:00 MST" },
            { channel_name: "Sm3Ag3L", channel_url: "https://twitch.tv/Sm3Ag3L", start_datetime: "2025-12-29 18:00 MST" },
            { channel_name: "gatorman26", channel_url: "https://twitch.tv/gatorman26", start_datetime: "2025-12-29 19:00 MST" },
            { channel_name: "DGM_Tbird420Ttv_FNG", channel_url: "https://twitch.tv/DGM_Tbird420Ttv_FNG", start_datetime: "2025-12-29 20:00 MST" },
            { channel_name: "Legen_dary42", channel_url: "https://twitch.tv/Legen_dary42", start_datetime: "2025-12-29 21:00 MST" }
        ]
    },
    {
        train_stops: [
            { start_datetime: "2025-12-30 16:00 MST" },
            { channel_name: "annabaybee2", channel_url: "https://twitch.tv/annabaybee2", start_datetime: "2025-12-30 17:00 MST" },
            { channel_name: "gatorman26", channel_url: "https://twitch.tv/gatorman26", start_datetime: "2025-12-30 18:00 MST" },
            { start_datetime: "2025-12-30 19:00 MST" },
            { channel_name: "Legen_dary42", channel_url: "https://twitch.tv/Legen_dary42", start_datetime: "2025-12-30 20:00 MST" },
            { channel_name: "DGM_Tbird420Ttv_FNG", channel_url: "https://twitch.tv/DGM_Tbird420Ttv_FNG", start_datetime: "2025-12-30 21:00 MST" }
        ]
    },
    {
        train_stops: [
            { start_datetime: "2025-12-31 16:00 MST" },
            { start_datetime: "2025-12-31 17:00 MST" },
            { start_datetime: "2025-12-31 18:00 MST" },
            { start_datetime: "2025-12-31 19:00 MST" },
            { channel_name: "Legen_dary42", channel_url: "https://twitch.tv/Legen_dary42", start_datetime: "2025-12-31 20:00 MST" },
            { channel_name: "DGM_Tbird420Ttv_FNG", channel_url: "https://twitch.tv/DGM_Tbird420Ttv_FNG", start_datetime: "2025-12-31 21:00 MST" }
        ]
    },
    {
        train_stops: [
            { start_datetime: "2026-01-01 16:00 MST" },
            { start_datetime: "2026-01-01 17:00 MST" },
            { channel_name: "Sm3Ag3L", channel_url: "https://twitch.tv/Sm3Ag3L", start_datetime: "2026-01-01 18:00 MST" },
            { start_datetime: "2026-01-01 19:00 MST" },
            { start_datetime: "2026-01-01 20:00 MST" },
            { channel_name: "Legen_dary42", channel_url: "https://twitch.tv/Legen_dary42", start_datetime: "2026-01-01 21:00 MST" }
        ]
    },
    {
        train_stops: [
            { channel_name: "joedirty_5150", channel_url: "https://twitch.tv/joedirty_5150", start_datetime: "2026-01-02 16:00 MST" },
            { start_datetime: "2026-01-02 17:00 MST" },
            { start_datetime: "2026-01-02 18:00 MST" },
            { start_datetime: "2026-01-02 19:00 MST" },
            { channel_name: "DGM_Tbird420Ttv_FNG", channel_url: "https://twitch.tv/DGM_Tbird420Ttv_FNG", start_datetime: "2026-01-02 20:00 MST" },
            { channel_name: "Legen_dary42", channel_url: "https://twitch.tv/Legen_dary42", start_datetime: "2026-01-02 21:00 MST" }
        ]
    }
];

const exampleResponse = n8nFunction(exampleData);

console.log(exampleResponse[0].json.error ?? JSON.stringify(exampleResponse[0].json.data));