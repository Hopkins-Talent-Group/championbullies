import type { ReservationWithGHL, GHLIntegration } from "./validation";

const GHL_BASE_URL = "https://api.gohighlevel.com/v1";

export class GHLClient {
  private apiKey: string;
  private locationId: string;

  constructor(apiKey: string, locationId: string) {
    this.apiKey = apiKey;
    this.locationId = locationId;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<Response> {
    return fetch(`${GHL_BASE_URL}${endpoint}`, {
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
------ snippet (first lines) ------