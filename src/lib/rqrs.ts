export const stages = ['Draft saved', 'Submitted to RQRS', 'Document check', 'Forwarded to authority', 'Verification in progress', 'Certificate ready'];
export const qualificationTypes = ['Secondary', 'TVET', "Bachelor’s", "Master’s", 'Professional License'];
export function authorityFor(type: string, profession = '') {
  if (type === 'Secondary') return { name: 'KNEC', full: 'Kenya National Examinations Council', url: 'https://www.knec.ac.ke/' };
  if (type === 'TVET') return { name: 'TVETA', full: 'Technical and Vocational Education and Training Authority', url: 'https://www.tveta.go.ke/' };
  if (type === 'Bachelor’s' || type === 'Master’s') return { name: 'CUE', full: 'Commission for University Education', url: 'https://www.cue.or.ke/' };
  if (type === 'Professional License' && profession === 'Nursing') return { name: 'NCK', full: 'Nursing Council of Kenya', url: 'https://nckenya.com/' };
  if (type === 'Professional License' && profession === 'Engineering') return { name: 'EBK', full: 'Engineers Board of Kenya', url: 'https://ebk.go.ke/' };
  return { name: 'KNQA', full: 'Kenya National Qualifications Authority', url: 'https://knqa.go.ke/' };
}
export const sampleApplications = [
  { id: 'RQ-2026-0842', name: 'Amina Hassan', country: 'Somalia', camp: 'Kakuma', title: 'Bachelor of Business Administration', issuer: 'University of Mogadishu', type: 'Bachelor’s', stage: 4, date: '18 Nov 2026' },
  { id: 'RQ-2026-0791', name: 'Amina Hassan', country: 'Somalia', camp: 'Kakuma', title: 'Secondary School Certificate', issuer: 'Mogadishu Secondary School', type: 'Secondary', stage: 5, date: '02 Nov 2026' },
  { id: 'RQ-2026-0843', name: 'Peter Lado', country: 'South Sudan', camp: 'Kalobeyei', title: 'Diploma in Electrical Installation', issuer: 'Juba Technical Institute', type: 'TVET', stage: 2, date: '19 Nov 2026' },
  { id: 'RQ-2026-0844', name: 'Grace Mbuyi', country: 'DRC', camp: 'Kakuma', title: 'Master of Education', issuer: 'University of Kinshasa', type: 'Master’s', stage: 3, date: '20 Nov 2026' },
  { id: 'RQ-2026-0845', name: 'Dawit Tesfaye', country: 'Ethiopia', camp: 'Dadaab', title: 'Nursing License', issuer: 'Addis Ababa Health College', type: 'Professional License', stage: 1, date: '21 Nov 2026' },
];
export const faqs = [
  { question: 'What if my certificate is in Arabic or French?', answer: 'Keep the original document and arrange a certified English translation. Ask the receiving authority which translators and certification it accepts before paying. Upload both the original and the translation.' },
  { question: 'What if my documents are lost or my institution has closed?', answer: 'You can prepare an alternative verification record: describe your education, dates, subjects, and any evidence such as student cards or references. A UNESCO Qualifications Passport can help document your background, but is not itself a recognition certificate. A caseworker can help you contact the appropriate authority.' },
  { question: 'How do I get a fee waiver in Kakuma?', answer: 'Fee waivers are not guaranteed. Ask a local NGO education counselor or the receiving authority about current assistance and eligibility. Do not pay an intermediary who promises approval. Confirm the official fees directly with the authority.' },
  { question: 'Which documents should I prepare?', answer: 'Usually you will need your qualification certificate, academic transcript, identity document, and certified translations if required. Requirements differ by authority and qualification; confirm the current checklist before applying.' },
  { question: 'How long does recognition take?', answer: 'Processing varies by authority, document completeness, and whether the issuing institution responds. RQRS cannot guarantee a processing time or recognition decision. Keep your reference number and check with your caseworker.' },
];
export function opportunitiesUnlocked(stage: number) { return stage === 5; }
export function pageHead(title: string, description: string) { return { meta: [{ title: `${title} | RQRS` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | RQRS` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }