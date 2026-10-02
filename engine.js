(function (root) {
  'use strict';
  // Wikipedia, Ring size. ISO 8653:2016 size = inner circumference in mm.
  // North America: C = 2.55 x s + 36.5 mm. UK/Ireland/Australia: letters, one letter = 1.25 mm, size C = 40 mm.
  // Italy/Spain/Switzerland: size = circumference - 40 mm.
  var MIN = 35, MAX = 80;
  function clamp(c) { return isFinite(c) && c >= MIN && c <= MAX ? c : null; }
  function ukLetterToMm(s) {
    if (typeof s !== 'string') return null;
    var m = s.trim().toUpperCase().replace(/\u00BD/g, ' 1/2').match(/^([A-Z])(?:\s*(?:\+|\.5|1\/2)|\s*\u00BD)?$/);
    if (!m) return null;
    var half = /(\+|\.5|1\/2)$/.test(s.trim().toUpperCase().replace(/\u00BD/g, ' 1/2')) ? 0.5 : 0;
    var k = m[1].charCodeAt(0) - 65 + half; // A = 0
    return 40 + 1.25 * (k - 2);
  }
  function mmToUk(c) {
    var k = Math.round((c - 40) / 1.25 * 2) / 2 + 2; // nearest half size, A = 0
    if (k < 0 || k > 25.5) return null;
    var letter = String.fromCharCode(65 + Math.floor(k));
    return { label: letter + (k % 1 ? ' 1/2' : ''), mm: 40 + 1.25 * (k - 2) };
  }
  function toMm(system, v) {
    var c;
    if (system === 'iso') c = +v;
    else if (system === 'na') c = 2.55 * +v + 36.5;
    else if (system === 'uk') c = ukLetterToMm(String(v));
    else if (system === 'swiss') c = +v + 40;
    else if (system === 'diameter') c = Math.PI * +v;
    else if (system === 'string') c = +v;
    else return null;
    return c === null || c === undefined ? null : clamp(c);
  }
  function qtr(x) { return Math.round(x * 4) / 4; }
  function convert(c) {
    c = clamp(c); if (c === null) return null;
    var na = (c - 36.5) / 2.55, uk = mmToUk(c);
    return { circumference: c, iso: c, isoRound: Math.round(c), na: qtr(na), naExact: na, naOut: na < 0 || na > 16, uk: uk, swiss: Math.round((c - 40) * 2) / 2, diameter: c / Math.PI, diameterIn: c / Math.PI / 25.4 };
  }
  var api = { toMm: toMm, convert: convert, ukLetterToMm: ukLetterToMm, mmToUk: mmToUk, MIN: MIN, MAX: MAX };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.RingFit = api;
})(typeof window !== 'undefined' ? window : this);
