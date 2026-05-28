import { NextResponse } from 'next/server';

// Mock DB simples em memória para simular o saldo do usuário
const usersDb: Record<string, number> = {
  'teste0209@email.com': 1.00
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, user_code } = body;

    // A API PlayFivers pode enviar outros dados, mas user_code é o principal
    if (!user_code) {
      return NextResponse.json({ msg: "INVALID_USER", balance: 0 }, { status: 404 });
    }

    // Se o usuário não existir no nosso mock, nós o criamos com saldo 1.00
    if (!(user_code in usersDb)) {
      usersDb[user_code] = 1.00;
    }

    let currentBalance = usersDb[user_code];

    // Tipo BALANCE: Apenas solicita o saldo
    if (type === 'BALANCE') {
      return NextResponse.json({ msg: "", balance: currentBalance }, { status: 200 });
    }

    // Tipo WinBet: Transação de aposta
    if (type === 'WinBet') {
      const { slot } = body;
      
      if (slot && typeof slot.user_after_balance === 'number') {
        // Atualiza o saldo no banco de dados com base na transação
        usersDb[user_code] = slot.user_after_balance;
        currentBalance = usersDb[user_code];
      }
      
      return NextResponse.json({ msg: "", balance: currentBalance }, { status: 200 });
    }

    // Outros webhooks (apenas retorna saldo)
    return NextResponse.json({ msg: "", balance: currentBalance }, { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ msg: "ERROR_INTERNAL", balance: 0 }, { status: 500 });
  }
}
