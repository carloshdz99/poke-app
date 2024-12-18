export interface Pokemon {
    id?: number;
    name: string;
    url?: string;
    abilities?: Abilities[];
    stats?: Stats[]
}

interface Abilities {
    ability: {
        name: string;
        url: string;
    }
    is_hidden: boolean;
    slot: 1;
}

interface Stats {
    base_stat: number;
    effort: 1;
    stat: {
        name: string;
        url: string;
    }
}