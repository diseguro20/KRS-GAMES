'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="glass-panel" style={{ margin: '20px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link href="/">
        <h1 className="title-gradient" style={{ fontSize: '24px', margin: 0 }}>PlayFivers</h1>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 15px', borderRadius: '20px', fontSize: '14px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Saldo:</span> <strong style={{ color: 'var(--gold-accent)' }}>R$ 100,00</strong>
        </div>
        <button className="btn-primary">Depositar</button>
      </div>
    </header>
  );
}
