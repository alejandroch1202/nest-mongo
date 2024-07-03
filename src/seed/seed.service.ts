import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeAPIResponse } from './interfaces/pokeapi-response.interface';

@Injectable()
export class SeedService {
  private readonly axios = axios;

  async populateDatabase() {
    const { data } = await this.axios.get<PokeAPIResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=100',
    );

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const id = Number(segments[segments.length - 2]);

      return { id, name };
    });

    return data.results;
  }
}
