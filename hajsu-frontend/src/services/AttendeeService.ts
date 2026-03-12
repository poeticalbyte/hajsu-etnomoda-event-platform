
const API_URL = "https://hajsu-etnomoda-event-platform.onrender.com/api/attendees";

export async function registerAttendee(attendee: { fullName: string; email: string; country: string; city: string; institution: string }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(attendee)
  });

  return await response.json();
}