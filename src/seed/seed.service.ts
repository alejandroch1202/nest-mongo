import { Injectable } from '@nestjs/common';
import { PokeAPIResponse } from './interfaces/pokeapi-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  async populateDatabase() {
    const data = await this.http.get<PokeAPIResponse>(
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
