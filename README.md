# Bradley Papke · Still Curious

My personal portfolio, hosted on **AWS Amplify Hosting**: a journey through 25 years at the desk, then About me,
Tech superpowers, Projects and achievements, and Contact.

**Creative feature: the time-travelling desk and its terminal.**

- **The desk.** Drag the slider from 2001 to 2026 and one illustrated scene blends into the next. Each year has
  2–3 callouts on real objects in the picture (the graphics card, the soldering station, the A+ study cards, the
  CTF trophies). Click one to read its story.
- **The terminal.** Every computer screen in the scenes is a real terminal (so is the `>_` button, or press the
  backtick key). Every year is a directory: `cd 2016` travels there, `ls` lists what's on the desk, `cat <object>`
  opens its story, and `traceroute career` hops through every year. Three flags are hidden; find them all and
  `cert <your name>` prints a "you'd pass my course" certificate.

The rest of the site works without either.

## Files

- `index.html`, `styles.css`: the page, no build step
- `data.js`: the timeline. One entry per year with its headline, summary and callouts (x and y are percentages of
  the image, so they stay on the object at any screen size)
- `journey.js`: the slider, the image blending, callouts and story popups
- `script.js`: the terminal and the capture-the-flag
- `images/years/`: one illustration per year (AI-generated illustrations of me at my desk)
- `docs/`: the Builder Center write-up and screenshots

## Deploy

AWS Amplify Hosting, connected to this repository's `main` branch. Every push deploys automatically. No build
settings needed: Amplify serves the files as they are.
