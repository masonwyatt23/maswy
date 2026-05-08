export function LoreSection() {
  const favorites = [
    {
      label: 'Favorite college',
      title: 'JMU',
      copy: 'James Madison University.',
      image: '/media/favorites/jmu-duke-dog.jpg',
      imageAlt: 'JMU Duke Dog head logo',
    },
    {
      label: 'Favorite team',
      title: 'Commanders',
      copy: 'Washington Commanders.',
      image: '/media/favorites/commanders-new.png',
      imageAlt: 'Washington Commanders 2026 alternate mark',
    },
    {
      label: 'Favorite golfer',
      title: 'Scottie Scheffler',
      copy: 'Scottie Scheffler.',
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
