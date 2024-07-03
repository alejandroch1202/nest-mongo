import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeAPIResponse } from './interfaces/pokeapi-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {
  private readonly axios = axios;
  private readonly pokemonService: PokemonService;

  constructor(pokemonService: PokemonService) {
    this.pokemonService = pokemonService;
  }

  async populateDatabase() {
    const { data } = await this.axios.get<PokeAPIResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=300',
    );

    const pokemons = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const number = Number(segments[segments.length - 2]);
      return { number, name };
    });

    this.pokemonService.populateDatabase(pokemons);

    return { message: 'Database successfully seeded' };
  }
}
