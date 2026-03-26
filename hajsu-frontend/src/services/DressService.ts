
const API_URL = "https://hajsu-etnomoda-event-platform.onrender.com/api/dresses";

export interface DressDTO {
  id?: number;
  name: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  culturalStory: string;
  artist: string;
  materials: string;
  elaborationTime: string;
  visible: boolean;
}

export async function getAllDresses(): Promise<DressDTO[]> {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function getVisibleDresses(): Promise<DressDTO[]> {
  const response = await fetch(`${API_URL}/visible`);
  return await response.json();
}

export async function getActiveCount(): Promise<number> {
  const response = await fetch(`${API_URL}/count`);
  return await response.json();
}

export async function createDress(dress: Omit<DressDTO, "id">): Promise<DressDTO> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dress),
  });
  return await response.json();
}

export async function updateDress(id: number, dress: DressDTO): Promise<DressDTO> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dress),
  });
  return await response.json();
}
