export function LoreSection() {
  const favorites = [
    {
      label: 'College',
      title: 'JMU',
      copy: 'James Madison University',
      image: '/media/favorites/jmu-duke-dog.png',
      imageAlt: 'JMU Duke Dog head logo',
    },
    {
      label: 'Team',
      title: 'Commanders',
      copy: 'Washington Commanders',
      image: '/media/favorites/commanders-new.png',
      imageAlt: 'Washington Commanders 2026 alternate mark',
    },
    {
      label: 'Golfer',
      title: 'Scottie Scheffler',
      copy: 'PGA Tour',
      image: '/media/favorites/scottie-scheffler.jpg',
      imageAlt: 'Scottie Scheffler',
    },
  ]

  return (
    <section className="lore-section" aria-label="Favorites">
      <div className="section-heading">
        <p className="kicker">favorites</p>
        <h2>Favorites.</h2>
      </div>
      <div className="fact-grid">
        {favorites.map((favorite) => (
          <article className="fact-card" key={favorite.title}>
            <div className="fact-media">
              <img src={favorite.image} alt={favorite.imageAlt} loading="eager" />
            </div>
            <p className="fact-label">{favorite.label}</p>
            <h3>{favorite.title}</h3>
            <p>{favorite.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
