
const API_URL = "https://hajsu-etnomoda-event-platform.onrender.com/api/ratings";

export async function submitRating(dressId: number, attendeeId: number, score: number): Promise<void> {
  await fetch(`${API_URL}?dressId=${dressId}&attendeeId=${attendeeId}&score=${score}`, {
    method: "POST",
  });
}

export async function getAverageRating(dressId: number): Promise<number> {
  const response = await fetch(`${API_URL}/average?dressId=${dressId}`);
  return await response.json();
}
