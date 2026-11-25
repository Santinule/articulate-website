// Real content from the Articulate iOS app (Articulate-Client-ios).

export const APP_STORE_URL = 'https://apps.apple.com/us/app/articulate-vocabulary-mastery/id6759561001'
// Shown on the floating app card on phones (MobileAppBar). Keep them in line with the App Store listing.
export const APP_RATING = '4.9'
export const APP_DOWNLOADS = '1,000+'
export const REVIEW_URL = 'https://apps.apple.com/app/id6759561001?action=write-review'
export const MANAGE_SUBSCRIPTIONS_URL = 'https://apps.apple.com/account/subscriptions'
export const CONTACT_EMAIL = 'contact@meshaa.io'
export const COMPANY = 'Real Intelligence Tech LLC'

export type DeckWord = {
  word: string
  pos: string
  meaning: string
}

// Hero card stack. Words and definitions from the app (HomeCardStack and the onboarding game tutorial).
export const deckWords: DeckWord[] = [
  {
    word: 'Articulate',
    pos: 'adjective',
    meaning: 'Possessing a mastery of language; the ability to assemble thoughts and concepts into precise, understandable meaning.',
  },
  { word: 'Surmise', pos: 'verb', meaning: 'To suppose or infer something without sufficient evidence to be certain.' },
  { word: 'Glimpse', pos: 'noun', meaning: 'A brief or partial view of something.' },
  {
    word: 'Innocuous',
    pos: 'adjective',
    meaning: 'Not harmful, offensive, or likely to cause disagreement; harmless and inoffensive in nature or effect.',
  },
  { word: 'Flout', pos: 'verb', meaning: 'To openly disregard a rule or convention.' },
  {
    word: 'Mollify',
    pos: 'verb',
    meaning: "To calm or soothe someone's anger, distress, or agitation, often by making concessions.",
  },
  { word: 'Nefarious', pos: 'adjective', meaning: 'Wicked or criminal in an extreme way; deeply immoral or villainous.' },
  { word: 'Abalienate', pos: 'verb', meaning: 'To transfer ownership of property or rights to another person.' },
]

// The five games, as real screens captured from the app in the iOS Simulator.
export const games = [
  {
    icon: 'smartReply',
    title: 'Smart Reply',
    text: 'Pick the reply that shows you understand the word in a real conversation.',
    img: '/img/app/smart-reply.webp',
    alt: 'Smart Reply: a chat with Detective Ruiz about the word surmise, with two possible replies',
  },
  {
    icon: 'synonym-select',
    title: 'Synonym Select',
    text: 'Choose the two words closest in meaning.',
    img: '/img/app/synonyms.webp',
    alt: 'Synonym Select for surmise with guess and suspect chosen and a Perfect! message',
  },
  {
    icon: 'sentenceSense',
    title: 'Sentence Sense',
    text: 'Drag the words that make sense into the blanks.',
    img: '/img/app/sentence-sense.webp',
    alt: 'Sentence Sense: a sentence with two blanks and a word bank',
  },
  {
    icon: 'semanticScale',
    title: 'Semantic Scale',
    text: 'Set the scale: the heavier word goes lower.',
    img: '/img/app/semantic-scale.webp',
    alt: 'Semantic Scale: a balance for eagerness to please with the cards Accommodating and Grovelling',
  },
  {
    icon: 'wordConfusor',
    title: 'Word Confusor',
    text: 'Slide each card to the sentence it matches.',
    img: '/img/app/word-confusor.webp',
    alt: 'Word Confusor: the cards Grueling and Gruesome and two sentences to complete',
  },
]

export const achievements = [
  { name: 'First Steps', img: '/img/achievements/first-game.webp' },
  { name: 'Word Wanderer', img: '/img/achievements/word-wanderer.webp' },
  { name: 'Thesaurus Rex', img: '/img/achievements/thesaurus-rex.webp' },
  { name: 'Semantic Sleuth', img: '/img/achievements/semantic-sleuth.webp' },
  { name: 'Conversation Master', img: '/img/achievements/conversation-master.webp' },
  { name: 'Error Spotter', img: '/img/achievements/error-spotter.webp' },
  { name: 'Gap Filler', img: '/img/achievements/gap-filler.webp' },
  { name: 'Lexicon Explorer', img: '/img/achievements/lexicon-explorer.webp' },
  { name: 'Alphabet Soup', img: '/img/achievements/alphabet-soup.webp' },
]

export const medals = [
  { name: 'Bronze', img: '/img/badges/bronze.webp' },
  { name: 'Silver', img: '/img/badges/silver.webp' },
  { name: 'Gold', img: '/img/badges/gold.webp' },
  { name: 'Diamond', img: '/img/badges/diamond.webp' },
]

// Categories from the onboarding, with the app's icon for each.
export const topics = [
  { name: 'Arts & Culture', icon: 'arts-culture' },
  { name: 'Business & Finance', icon: 'business-finance' },
  { name: 'Law & Government', icon: 'law-government' },
  { name: 'Literature & Language', icon: 'literature-language' },
  { name: 'Medicine & Health', icon: 'medicine-health' },
  { name: 'Nature & Environment', icon: 'nature-environment' },
  { name: 'Philosophy & Critical Thought', icon: 'philosophy-critical-thought' },
  { name: 'Science & Research', icon: 'science-research' },
  { name: 'Slang & Modern Speech', icon: 'slang-modern-speech' },
  { name: 'Society & Human Behavior', icon: 'society-human-behavior' },
  { name: 'Technology & Computing', icon: 'technology-computing' },
  { name: 'AI Video Prompting', icon: 'ai-video-prompting' },
]

export type Faq = { q: string; a: string }

export const faqs: Faq[] = [
  {
    q: 'What is Articulate?',
    a: 'An iOS app that helps you grow your vocabulary through active learning. You discover sophisticated words and practice them in quick games and in sentences you write yourself.',
  },
  {
    q: 'How are words chosen for me?',
    a: 'When you start, you tell Articulate how you would describe your vocabulary and which topics interest you. Recommendations follow your level, your interests and your progress, and you pick which words to practice each session.',
  },
  {
    q: 'How much does it cost?',
    a: 'Articulate has a monthly and a yearly plan. The yearly plan starts with a free trial. Prices appear in the App Store in your local currency.',
  },
  {
    q: 'How do I cancel my subscription?',
    a: 'Subscriptions are managed by Apple. On your iPhone, open Settings, tap your name, then Subscriptions, and choose Articulate. You can also tap Manage in App Store from Settings inside the app.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Open Settings in the app, go to Account and tap Delete Account. If you subscribed, cancel the subscription in the App Store as well, since deleting the account does not cancel billing.',
  },
  {
    q: 'Who makes Articulate?',
    a: 'Articulate is made by Real Intelligence Tech LLC and designed by students and scientists.',
  },
]
