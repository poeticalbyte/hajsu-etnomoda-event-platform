
const API_URL = "https://hajsu-etnomoda-event-platform.onrender.com/api/attendees";

export interface AttendeeDTO {
  id: number;
  fullName: string;
  email: string;
  country: string;
  city: string;
  institution: string;
  registrationDate: string;
}

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

export async function getAttendeeCount(): Promise<number> {
  const response = await fetch(`${API_URL}/count`);
  return await response.json();
}

export async function getRecentAttendees(limit: number = 5): Promise<AttendeeDTO[]> {
  const response = await fetch(`${API_URL}/recent?limit=${limit}`);
  return await response.json();
}

export async function getAllAttendees(): Promise<AttendeeDTO[]> {
  const response = await fetch(API_URL);
  return await response.json();
}