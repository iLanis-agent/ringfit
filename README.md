# RingFit

Ring size converter between US/Canada, UK/Ireland/Australia letters, ISO (EU) and Italy/Spain/Switzerland sizes. Start from any of them, from the inner diameter of a ring that fits, or from your finger circumference.

- Live: https://ilanis-agent.github.io/ringfit/
- App: https://ilanis-agent.github.io/ringfit/app.html

Formulas (Wikipedia, Ring size): ISO 8653:2016 size = inner circumference in mm; US = (circumference - 36.5) / 2.55; UK letters step 1.25 mm with C = 40 mm, in half sizes; Swiss/Italian/Spanish size = circumference - 40. The 24-row ISO size to diameter table (49 to 72) is checked in the tests. US 7 = 54.35 mm = ISO 54 = UK N 1/2. Jeweller charts can differ by up to half a size. Indian, Japanese and Chinese scales are not linear and are not converted.

Run tests: `node test-engine.js` (56 checks).
