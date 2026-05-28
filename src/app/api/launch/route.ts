import { NextResponse } from 'next/server';
import { launchGame } from '@/services/playfivers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { game_code, provider, game_original } = body;

    // Em um sistema real, você pegaria o e-mail/ID e o saldo do usuário logado no banco de dados.
    const user_code = 'teste0209@email.com'; 
    const user_balance = 100.00;

    // As chaves precisam vir de variáveis de ambiente (.env) para segurança
    const agentToken = process.env.AGENT_TOKEN || 'e9a59425-bb20-4908-b565-f6ea1b6aa204';
    const secretKey = process.env.SECRET_KEY || 'b985148a-8107-4657-bda1-2dd71aab3edb';

    if (!agentToken || !secretKey) {
      return NextResponse.json({ error: 'Chaves da API (AGENT_TOKEN e SECRET_KEY) não estão configuradas no servidor.' }, { status: 400 });
    }

    const response = await launchGame({
      agentToken,
      secretKey,
      user_code,
      game_code,
      provider,
      game_original: game_original ?? true,
      user_balance,
      lang: 'pt',
    });

    if (response.status && response.launch_url) {
      return NextResponse.json({ url: response.launch_url });
    } else {
      return NextResponse.json({ error: response.msg || 'Erro na API PlayFivers' }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
