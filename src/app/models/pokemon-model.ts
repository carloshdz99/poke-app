export interface Pokemon {
    id?: number;
    name?: string;
    url?: string;
    abilities?: Abilities[];
    stats?: Stats[];
    types?: Types[]
}

interface Types {
    slot: number;
    type: { name: string }
}

interface Abilities {
    ability: {
        name: string;
        url: string;
    }
    is_hidden: boolean;
    slot: number;
}

interface Stats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

export interface PokemonList {
    count: number;
    results: Pokemon[]
}