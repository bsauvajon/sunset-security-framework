/* Sunset Security Framework — logique de notation.
   Fonctions pures, sans DOM, testables sous Node. */
(function (root) {
  'use strict';

  var LEVELS = [
    {
      min: 0,
      name: 'Digital natif',
      verdict: 'Tout est récent, patché et compris. Vous êtes la cible idéale.'
    },
    {
      min: 4,
      name: 'Hérité',
      verdict: 'Votre système prend de l\u2019âge. La documentation commence à sentir le renfermé.'
    },
    {
      min: 8,
      name: 'Non documenté',
      verdict: 'Plus personne ne lit la documentation. C\u2019est un premier résultat.'
    },
    {
      min: 12,
      name: 'Non compris',
      verdict: 'L\u2019équipe ne comprend plus ce qu\u2019elle administre. Le fossé se creuse.'
    },
    {
      min: 16,
      name: 'Non atteignable',
      verdict: 'Vos attaquants ont abandonné avant vous. Vous approchez.'
    },
    {
      min: 20,
      name: 'Relique',
      verdict: 'Le système tourne depuis 1998. Personne ne sait comment. C\u2019est l\u2019objectif.'
    }
  ];

  function isInteger(n) {
    return typeof n === 'number' && isFinite(n) && Math.floor(n) === n;
  }

  function computeScore(answers) {
    if (!Array.isArray(answers) || answers.length !== 8) {
      throw new RangeError('answers must be an array of exactly 8 values');
    }
    var total = 0;
    for (var i = 0; i < answers.length; i++) {
      var value = answers[i];
      if (!isInteger(value) || value < 0 || value > 3) {
        throw new RangeError('each answer must be an integer between 0 and 3');
      }
      total += value;
    }
    return total;
  }

  function levelFor(score) {
    if (!isInteger(score) || score < 0 || score > 24) {
      throw new RangeError('score must be an integer between 0 and 24');
    }
    var index = 0;
    for (var i = 0; i < LEVELS.length; i++) {
      if (score >= LEVELS[i].min) index = i;
    }
    return {
      index: index,
      name: LEVELS[index].name,
      verdict: LEVELS[index].verdict
    };
  }

  var api = { computeScore: computeScore, levelFor: levelFor, LEVELS: LEVELS };
  root.SSFScore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
