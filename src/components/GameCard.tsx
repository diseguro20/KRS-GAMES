'use client';
import { useState } from 'react';
import { Game } from '@/services/playfivers';

export default function GameCard({ game }: { game: Game }) {
  const [loading, setLoading] = useState(false);

  const handleLaunch = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      const res = await fetch('/api/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_code: game.game_code,
          provider: game.provider.name,
          game_original: game.original
        })
      });

      const data = await res.json();
      
      if (data.url) {
        // Redireciona o jogador para a URL real do jogo!
        window.location.href = data.url;
      } else {
        alert(`Não foi possível iniciar: ${data.error}`);
      }
    } catch (error) {
      alert('Erro de conexão ao tentar iniciar o jogo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="glass-panel game-card" 
      onClick={handleLaunch}
      style={{ opacity: loading ? 0.7 : 1, pointerEvents: loading ? 'none' : 'auto' }}
    >
      <div className="game-image-wrapper">
        <img src={game.image_url} alt={game.name} className="game-image" />
        <div className="play-overlay">
          <div className="play-button">{loading ? '...' : '▶'}</div>
        </div>
      </div>
      <div style={{ padding: '15px' }}>
        <h3 style={{ fontSize: '16px', margin: '0 0 5px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {game.name}
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
          {game.provider.name}
        </p>
      </div>
    </div>
  );
}
