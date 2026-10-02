var E = require('./engine.js'), n = 0, bad = 0;
function near(a, b, tol, m) { n++; if (!(Math.abs(a - b) <= tol)) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// Wikipedia ISO table: size (circumference mm) -> internal diameter mm, 49 to 72
var D = { 49: 15.6, 50: 15.9, 51: 16.2, 52: 16.6, 53: 16.9, 54: 17.2, 55: 17.5, 56: 17.8, 57: 18.1, 58: 18.5, 59: 18.8, 60: 19.1, 61: 19.4, 62: 19.7, 63: 20.1, 64: 20.4, 65: 20.7, 66: 21, 67: 21.3, 68: 21.6, 69: 22, 70: 22.3, 71: 22.6, 72: 22.9 };
Object.keys(D).forEach(function (k) { near(Math.round(E.convert(+k).diameter * 10) / 10, D[k], 0.0001, 'ISO table ' + k); });
// North America: C = 2.55 s + 36.5 and d = 0.8128 s + 11.63 (US 7 = 54.35 mm, 17.32 mm); a whole size is 2.55 mm
near(E.toMm('na', 7), 54.35, 1e-9, 'US 7 mm'); near(E.convert(E.toMm('na', 7)).diameter, 0.8128 * 7 + 11.63, 0.03, 'US 7 diameter formula (Wikipedia rounds each formula)'); near(E.toMm('na', 8) - E.toMm('na', 7), 2.55, 1e-9, 'whole size 2.55 mm');
near(E.convert(54.35).naExact, 7, 1e-9, 'back to 7'); is(E.convert(54.35).na, 7, 'US 7'); is(E.convert(55.6).na, 7.5, 'quarter rounding');
// whole size differs by 0.032 in of diameter (0.81 mm)
near((E.toMm('na', 8) - E.toMm('na', 7)) / Math.PI, 0.81, 0.005, 'diameter step 0.81 mm');
// UK: size C = 40 mm, 1.25 mm per letter
near(E.toMm('uk', 'C'), 40, 1e-9, 'UK C'); near(E.toMm('uk', 'D'), 41.25, 1e-9, 'UK D'); near(E.toMm('uk', 'N'), 40 + 1.25 * 11, 1e-9, 'UK N'); near(E.toMm('uk', 'N 1/2'), 40 + 1.25 * 11.5, 1e-9, 'UK N half'); near(E.toMm('uk', 'n+'), 40 + 1.25 * 11.5, 1e-9, 'UK n+'); near(E.toMm('uk', 'N\u00BD'), 40 + 1.25 * 11.5, 1e-9, 'UK N with half sign');
is(E.mmToUk(40).label, 'C', 'mm to C'); is(E.mmToUk(41.25).label, 'D', 'mm to D'); is(E.mmToUk(41.875).label, 'D 1/2', 'half'); is(E.convert(54.35).uk.label, 'N 1/2', 'US 7 is UK N 1/2'); near(E.convert(54.35).uk.mm, 54.375, 1e-9, 'N 1/2 mm');
// Switzerland / Italy / Spain: circumference minus 40; size 10 = ISO 50
near(E.toMm('swiss', 10), 50, 1e-9, 'swiss 10'); is(E.convert(50).swiss, 10, 'swiss back');
// diameter and finger string: a ring with 17.2 mm inner diameter is about ISO 54; 54 mm string = ISO 54
is(E.convert(E.toMm('diameter', 17.2)).isoRound, 54, 'diameter 17.2'); near(E.toMm('string', 54), 54, 0, 'string'); near(E.convert(54).diameterIn, 54 / Math.PI / 25.4, 1e-12, 'inches');
// round trips through every system for ISO 54
var c = E.toMm('iso', 54); near(E.toMm('na', E.convert(c).naExact), 54, 1e-9, 'na round trip'); near(E.toMm('swiss', E.convert(c).swiss), 54, 1e-9, 'swiss round trip');
// invalid input
is(E.toMm('iso', 10), null, 'too small'); is(E.toMm('iso', 200), null, 'too big'); is(E.toMm('uk', '7'), null, 'uk digit'); is(E.toMm('uk', 'AA'), null, 'uk double'); is(E.toMm('xx', 5), null, 'bad system'); is(E.toMm('iso', 'abc'), null, 'nan'); is(E.convert(5), null, 'convert invalid');
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
