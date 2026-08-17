export default function PersonSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ahmed Ragab',
    url: 'https://www.ahmedragab.net',
    jobTitle: 'Investigative Reporter & TV Producer',
    description:
      'Award-winning investigative journalist and TV producer with 15+ years of experience covering human rights, corruption, and political issues in the Arab world.',
    image: 'https://www.ahmedragab.net/about.jpg',
    nationality: 'Egyptian',
    knowsLanguage: ['ar', 'en'],
    award: [
      'ARIJ Arab Spring Award for Best Investigation in the Arab World (2011)',
      'Mohammed Hassanein Heikal Foundation for Arab Journalism Award (2023)',
    ],
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Al Masry Al Youm',
      },
      {
        '@type': 'Organization',
        name: 'Deutsche Welle Arabic',
      },
    ],
    sameAs: [
      'https://www.facebook.com/citizenRagab',
      'https://x.com/Ragab',
      'https://linkedin.com/in/ahmed-ragab-7a542216/',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
