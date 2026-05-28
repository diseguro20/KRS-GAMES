import { getGames } from '@/services/playfivers';
import Header from '@/components/Header';
import GameCard from '@/components/GameCard';

export const revalidate = 60; // revalida a cada 60s

export default async function Home() {
  const games = await getGames();

  // Filtrando apenas jogos ativos e com imagem válida para a vitrine
  const activeGames = games.filter(g => g.status && g.image_url);

  return (
    <>
      <Header />
      <main style={{ padding: '20px', flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <section style={{ marginBottom: '40px' }}>
          <h2 className="title-gradient" style={{ fontSize: '28px', marginBottom: '20px' }}>Jogos Populares</h2>
          
          {activeGames.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '25px' 
            }}>
              {activeGames.slice(0, 24).map((game, i) => (
                <GameCard key={`${game.game_code}-${i}`} game={game} />
              ))}
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <h3>Nenhum jogo disponível no momento.</h3>
              <p>Verifique sua conexão com a API ou a disponibilidade dos provedores.</p>
            </div>
          )}
        </section>

      </main>
    </>
  );
}
