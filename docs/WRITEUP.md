# Still asking how things work: a time-travelling portfolio on AWS Amplify

*Description (under 160 characters):* My portfolio on AWS Amplify: drag through 25 years at my desk, click the objects
to hear their stories, and hack the terminal on every screen.

**Live site:** [FILL Amplify URL]
**Code:** https://github.com/grand1llusion/portfolio

## What I built

A one-page portfolio that tells my story the way I lived it: at a desk. It has five parts:

- **The journey:** an illustrated scene of my desk for every chapter from 2001 to 2026, from a hand-me-down
  computer in my bedroom to Army electronics repair, a cybersecurity degree, teaching at the Cyber School, and
  building AI agents on AWS.
- **About me:** who I am now, what ties it together, and my family.
- **Tech superpowers:** six skill cards, from Splunk and Wireshark to Amazon Bedrock, Strands Agents, teaching and
  electronics repair.
- **Projects and achievements:** three AI agents I built on AWS this fall (AntiSOCial, SOC It To 'Em and Sprint
  Zero) with code and video links, my certifications with the year I earned each one, CTF wins, and education.
- **Contact:** email, LinkedIn and GitHub.

[Screenshot: the top of the page] (`docs/screenshots/1-home-desktop.png`)
[Screenshot: skills] (`docs/screenshots/2-skills.png`)
[Screenshot: projects and certifications] (`docs/screenshots/3-projects.png`)

## The creative feature: a desk you can time-travel and hack

**The desk.** Drag the slider and one illustration blends into the next, year by year. Each scene has two or three
callouts pinned to real objects in the picture: the graphics card I installed at 12, the soldering station from my
Army repair years, the A+ study cards, the crutches from the year I broke my foot, the CTF trophies. Click one and
it tells its story. A family photo on the desk grows as our children arrive.

**The terminal.** The hint under the headline says: *"Every computer screen on this desk is a real terminal. Click
one (or press `) and type `help`. Three flags are hidden inside."* The terminal docks at the bottom so you can watch
the desk while you type, and every year is a directory:

- `cd 2016` travels to 2016; `cd ..` goes back a year; `history` lists every chapter
- `ls` shows what's on the desk this year, and `cat a+-study-cards` opens that object's story
- `traceroute career` hops through every year, one certification or milestone per hop
- `whoami`, `cat certs`, `cat superpowers`, `ls projects`, `open sprint-zero`, `contact`

Three flags reward the instincts a security analyst needs:

| Flag | How you find it | The lesson |
|---|---|---|
| `flag{packets_to_agents}` | Follow `traceroute career` to the end of the journey | Know the path |
| `flag{read_the_logs}` | Notice the hidden file with `ls -a`, then `cat .logs` | The answer is usually in the logs |
| `flag{ko_not_dodge}` | `sudo hire-me` (the logs give it away) | Escalate privileges, politely |

Find all three and `cert <your name>` prints a "You'd pass my course" certificate you can save as a PDF. The
terminal has history (up arrow), Tab completion and tap-to-run buttons for phones. The site works fully without it.

[Screenshot: a year with its callouts] (`docs/screenshots/4-callouts.png`)
[Screenshot: the terminal after traceroute career] (`docs/screenshots/5-terminal.png`)
[Screenshot: the site on a phone] (`docs/screenshots/6-phone.png`)

## AWS services used

I followed the *Build a Website on the Cloud* tutorial path and host the site with AWS Amplify Hosting.

- **AWS Amplify Hosting:** serves the site over HTTPS on Amplify's global CDN. I connected the GitHub repository,
  so every push to `main` builds and deploys automatically. There is no build step: Amplify serves the HTML, CSS,
  JavaScript and images as they are.
- **GitHub + Amplify continuous deployment:** a fix is a commit, and the live site updates in about a minute.

The projects on the site use more of AWS: Amazon Bedrock, Amazon GuardDuty, Amazon EventBridge, AWS Lambda,
Amazon DynamoDB, Amazon EC2 and Amazon S3.

[Screenshot: Amplify console, deployment succeeded] (take this one in the console; hide the account ID)
[Screenshot: Amplify branch connected to GitHub] (hide the account ID)

## What I learned

1. **Tell the story where it happened.** A list of certifications is forgettable. The same list as objects on a
   desk that changes over 25 years is something people remember.
2. **Keep data separate from the page.** Every year lives in one data file: headline, summary and callouts, with
   positions as percentages of the image, so they stay on the right object at any screen size. Adding a year is
   an edit, not a redesign.
3. **Let the creative feature drive the page, not block it.** The terminal docks at the bottom instead of covering
   everything, so `cd 2016` visibly moves the desk. And the whole site still works for a recruiter who never opens it.
4. **Load what you need first.** Eighteen illustrations are heavy. The first one loads with the page and the rest
   load in the background, so the page appears quickly.
5. **Continuous deployment changes how you work.** Once GitHub was connected to Amplify, every improvement was
   one commit away from live.

## Challenges

- **Callouts that make sense.** The first version had callouts that didn't match the picture. I went through
  every illustration and pinned each callout to an object that is really there and really part of that year.
- **Phones.** Labels crowd a small screen, so on phones the callouts become tap targets, the year buttons become a
  grid, and the terminal takes the lower half of the screen.
- **Honesty about the art.** The scenes are AI-generated illustrations of me at my desk, not photos, and the story
  sticks to what really happened.

*Built with an AI coding agent. Views are my own.*
