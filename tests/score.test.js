const test = require('node:test');
const assert = require('node:assert');
const { computeScore, levelFor } = require('../score.js');

test('somme les huit réponses', () => {
  assert.strictEqual(computeScore([3, 3, 3, 3, 3, 3, 3, 3]), 24);
  assert.strictEqual(computeScore([0, 0, 0, 0, 0, 0, 0, 0]), 0);
  assert.strictEqual(computeScore([1, 2, 3, 0, 1, 2, 3, 0]), 12);
});

test('refuse une saisie invalide', () => {
  assert.throws(() => computeScore([1, 2, 3]), RangeError);
  assert.throws(() => computeScore([4, 0, 0, 0, 0, 0, 0, 0]), RangeError);
  assert.throws(() => computeScore([-1, 0, 0, 0, 0, 0, 0, 0]), RangeError);
  assert.throws(() => computeScore(null), RangeError);
  assert.throws(() => computeScore('12345678'), RangeError);
  assert.throws(() => computeScore([1, 2, 3, 0, 1, 2, 3, 0, 1]), RangeError);
  assert.throws(() => computeScore([1.5, 0, 0, 0, 0, 0, 0, 0]), RangeError);
  assert.throws(() => computeScore(['2', 0, 0, 0, 0, 0, 0, 0]), RangeError);
});

test('mappe le score sur six niveaux', () => {
  assert.strictEqual(levelFor(0).index, 0);
  assert.strictEqual(levelFor(3).index, 0);
  assert.strictEqual(levelFor(4).index, 1);
  assert.strictEqual(levelFor(7).index, 1);
  assert.strictEqual(levelFor(8).index, 2);
  assert.strictEqual(levelFor(11).index, 2);
  assert.strictEqual(levelFor(12).index, 3);
  assert.strictEqual(levelFor(15).index, 3);
  assert.strictEqual(levelFor(16).index, 4);
  assert.strictEqual(levelFor(19).index, 4);
  assert.strictEqual(levelFor(20).index, 5);
  assert.strictEqual(levelFor(24).index, 5);
});

test('refuse un score hors bornes', () => {
  assert.throws(() => levelFor(25), RangeError);
  assert.throws(() => levelFor(-1), RangeError);
  assert.throws(() => levelFor(3.5), RangeError);
});

test('sert les niveaux dans la langue demandée', () => {
  assert.strictEqual(levelFor(24).name, 'Relique');
  assert.strictEqual(levelFor(24, 'fr').name, 'Relique');
  assert.strictEqual(levelFor(24, 'en').name, 'Relic');
  assert.strictEqual(levelFor(0, 'en').index, 0);
  assert.strictEqual(levelFor(20, 'en').index, 5);
});
