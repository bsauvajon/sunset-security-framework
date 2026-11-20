/* Sunset Security Framework — logique de notation.
   Fonctions pures, sans DOM, testables sous Node. */
(function (root) {
  'use strict';

  var LEVELS_FR = [
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

  var LEVELS_EN = [
    {
      min: 0,
      name: 'Digital native',
      verdict: 'Everything is recent, patched and understood. You are the ideal target.'
    },
    {
      min: 4,
      name: 'Inherited',
      verdict: 'Your system is ageing. The documentation is starting to smell of mothballs.'
    },
    {
      min: 8,
      name: 'Undocumented',
      verdict: 'Nobody reads the documentation any more. That is a first result.'
    },
    {
      min: 12,
      name: 'Incomprehensible',
      verdict: 'The team no longer understands what it administers. The gap is widening.'
    },
    {
      min: 16,
      name: 'Unreachable',
      verdict: 'Your attackers gave up before you did. You are getting close.'
    },
    {
      min: 20,
      name: 'Relic',
      verdict: 'The system has been running since 1998. Nobody knows how. That is the goal.'
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

  function levelFor(score, locale) {
    if (!isInteger(score) || score < 0 || score > 24) {
      throw new RangeError('score must be an integer between 0 and 24');
    }
    var levels = locale === 'en' ? LEVELS_EN : LEVELS_FR;
    var index = 0;
    for (var i = 0; i < levels.length; i++) {
      if (score >= levels[i].min) index = i;
    }
    return {
      index: index,
      name: levels[index].name,
      verdict: levels[index].verdict
    };
  }

  var api = {
    computeScore: computeScore,
    levelFor: levelFor,
    LEVELS: LEVELS_FR,
    LEVELS_FR: LEVELS_FR,
    LEVELS_EN: LEVELS_EN
  };
  root.SSFScore = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
