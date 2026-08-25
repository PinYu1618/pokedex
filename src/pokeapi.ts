export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      return (await resp.json()) as any as ShallowLocations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      return (await resp.json()) as any as Location;
    } catch (err) {
      throw new Error(
        `Error fetching location '${locationName}': ${(err as Error).message}`,
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<{
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    version_details: Array<{
      version: {
        name: string;
        url: string;
      };
      max_chance: number;
      encounter_details: Array<{
        min_level: number;
        max_level: number;
        condition_values: Array<any>;
        chance: number;
        method: {
          name: string;
          url: string;
        };
      }>;
    }>;
  }>;
};
