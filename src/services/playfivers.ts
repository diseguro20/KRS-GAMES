const API_BASE_URL = 'https://api.playfivers.com';

export interface Provider {
  id: number;
  name: string;
  image_url: string;
  wallet?: { name: string };
  status: number;
}

export interface Game {
  name: string;
  image_url: string;
  rounds_free: boolean;
  status: boolean;
  original: boolean;
  game_code: string;
  provider: {
    name: string;
  };
}

export interface LaunchGameParams {
  agentToken: string;
  secretKey: string;
  user_code: string;
  game_code: string;
  provider: string;
  game_original: boolean;
  user_balance: number;
  user_rtp?: number;
  lang: string;
}

export interface LaunchGameResponse {
  status: boolean;
  msg: string;
  launch_url?: string;
  user_code?: string;
  user_balance?: number;
  user_created?: boolean;
  name?: string;
}

export async function getProviders(): Promise<Provider[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v2/providers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // cache por 1 hora
    });
    const data = await res.json();
    if (data.status === 1) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar provedores:', error);
    return [];
  }
}

export async function getGames(providerId?: number): Promise<Game[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/v2/games`);
    if (providerId) {
      url.searchParams.append('provider', providerId.toString());
    }
    
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });
    const data = await res.json();
    if (data.status === 1) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    return [];
  }
}

export async function launchGame(params: LaunchGameParams): Promise<LaunchGameResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v2/game_launch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Erro ao iniciar jogo:', error);
    return {
      status: false,
      msg: 'Erro interno',
    };
  }
}
