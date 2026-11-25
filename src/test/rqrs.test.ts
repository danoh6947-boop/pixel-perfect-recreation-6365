import { describe, expect, it } from 'vitest';
import { authorityFor, opportunitiesUnlocked, stages } from '@/lib/rqrs';
import { emptyDraft, readDraft, saveDraft } from '@/lib/offline';
describe('Authority navigator', () => {
  it('routes secondary certificates to KNEC', () => expect(authorityFor('Secondary').name).toBe('KNEC'));
  it('routes TVET qualifications to TVETA', () => expect(authorityFor('TVET').name).toBe('TVETA'));
  it('routes bachelor degrees to CUE', () => expect(authorityFor('Bachelor’s').name).toBe('CUE'));
  it('routes master degrees to CUE', () => expect(authorityFor('Master’s').name).toBe('CUE'));
  it('routes nursing licenses to NCK', () => expect(authorityFor('Professional License', 'Nursing').name).toBe('NCK'));
  it('routes engineering licenses to EBK', () => expect(authorityFor('Professional License', 'Engineering').name).toBe('EBK'));
  it('routes general recognition to KNQA', () => expect(authorityFor('General').name).toBe('KNQA'));
});
it('unlocks opportunities only at certificate ready', () => { expect(opportunitiesUnlocked(4)).toBe(false); expect(opportunitiesUnlocked(5)).toBe(true); expect(stages).toHaveLength(6); });
it('saves and restores an offline application draft', () => { const draft = { ...emptyDraft, name: 'Peter Lado', camp: 'Kalobeyei', step: 1 }; saveDraft(draft); expect(readDraft()).toEqual(draft); });