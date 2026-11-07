**Live site:** https://main.d38f5mo467iaae.amplifyapp.com/
**Code:** https://github.com/grand1llusion/portfolio

## What I built

A one-page portfolio that tells my story the way I lived it: at a desk. A hand-me-down computer in my bedroom started a journey through Army electronics repair, a cybersecurity degree, offensive and defensive cyber operations, teaching at the Cyber School, and building AI agents on AWS. The page has five parts:

- **The journey:** an illustrated scene of my desk for every chapter from 2001 to 2026. This is the creative feature.
- **About me:** who I am now, what ties it together, and my family.
- **Tech superpowers:** six skill cards, from Splunk and Wireshark to Amazon Bedrock, Strands Agents, teaching and electronics repair.
- **Projects and achievements:** three AI agents I built on AWS this fall (AntiSOCial, SOC It To 'Em and Sprint Zero) with code and video links, my certifications with the year I earned each one, CTF wins, and education.
- **Contact:** email, LinkedIn and GitHub.

>>> INSERT IMAGE HERE: 1-home-desktop.jpg (The top of the page) <<<

>>> INSERT IMAGE HERE: 2-skills.jpg (Tech superpowers) <<<

>>> INSERT IMAGE HERE: 3-projects.jpg (Projects and certifications) <<<

## The creative feature: a desk you can time-travel and hack

**The desk.** Drag the slider and one illustration blends into the next, year by year. Each scene has two or three callouts pinned to real objects in the picture: the graphics card I installed at 12, the soldering station from my Army repair years, the A+ study cards, the crutches from the year I broke my foot, the CTF trophies. Click one and it tells its story. A family photo on the desk grows as our children arrive.

>>> INSERT IMAGE HERE: 4-callouts.jpg (2017, with its callouts) <<<

**The terminal.** The hint near the top of the page says: *"Every computer screen on this desk is a real terminal. Click one (or press the backtick key) and type help. Three flags are hidden inside."* Every screen in every scene has a small green `>_` button. The terminal docks at the bottom of the window so you can watch the desk while you type, and every year is a directory:

- `cd 2016` travels to 2016, `cd ..` goes back a year, and `history` lists every chapter
- `ls` shows what's on the desk this year, and `cat a+-study-cards` opens that object's story
- `traceroute career` hops through all 18 years, one milestone per hop, while the desk changes behind it
- `whoami`, `cat certs`, `cat superpowers`, `ls projects`, `open sprint-zero` and `contact` cover the rest

Three flags reward the instincts a security analyst needs:

| Flag | How you find it | The lesson |
|---|---|---|
| `flag{packets_to_agents}` | Follow `traceroute career` to the end of the journey | Know the path |
| `flag{read_the_logs}` | Notice the hidden file with `ls -a`, then `cat .logs` | The answer is usually in the logs |
| `flag{ko_not_dodge}` | `sudo hire-me` (the logs give it away) | Escalate privileges, politely |

Find all three and `cert <your name>` prints a "You'd pass my course" certificate you can save as a PDF. The terminal has command history (up arrow), Tab completion and tap-to-run buttons for phones. The rest of the site works fully without it, and the menu at the top always jumps straight to About, Skills, Projects and Contact.

>>> INSERT IMAGE HERE: 5-terminal.jpg (The terminal after traceroute career) <<<

>>> INSERT IMAGE HERE: 6-phone.jpg (The site on a phone) <<<

## AWS services used

I followed the *Build a Website on the Cloud* tutorial path and host the site with **AWS Amplify Hosting**.

- **AWS Amplify Hosting** serves the site over HTTPS on Amplify's global content delivery network at https://main.d38f5mo467iaae.amplifyapp.com/.
- **Continuous deployment from GitHub:** I connected the `grand1llusion/portfolio` repository and its `main` branch. Every push builds and deploys automatically, so a fix is one commit away from live.
- **A build spec in the repository (`amplify.yml`)** tells Amplify the site has no build step and to serve the files as they are: HTML, CSS, JavaScript and the 18 illustrations.

>>> INSERT IMAGE HERE: 7-amplify-deployed.jpg (Amplify: the app deployed from the main branch) <<<

>>> INSERT IMAGE HERE: 8-amplify-branch.jpg (Amplify: main connected to GitHub with auto-build on) <<<

The projects on the site use more of AWS: Amazon Bedrock, Amazon GuardDuty, Amazon EventBridge, AWS Lambda, Amazon DynamoDB, Amazon EC2 and Amazon S3.

## What I learned

1. **Tell the story where it happened.** A list of certifications is forgettable. The same list as objects on a desk that changes over 25 years is something people remember.
2. **Keep the data separate from the page.** Every year lives in one data file with its headline, summary and callouts. Callout positions are percentages of the image, so they stay on the right object at any screen size. Adding a year is an edit, not a redesign.
3. **Let the creative feature drive the page, not block it.** The terminal docks at the bottom instead of covering everything, so `cd 2016` visibly moves the desk. A recruiter who never opens it still gets everything.
4. **Load what you need first.** Eighteen illustrations are heavy. The first one loads with the page and the rest load in the background, so the page appears quickly.
5. **Continuous deployment changes how you work.** Once GitHub was connected to Amplify, every improvement was one commit away from live.

## Challenges

- **Callouts that make sense.** My first draft had callouts that didn't match the picture. I went through every illustration and pinned each callout to an object that is really there and really part of that year.
- **Phones.** Labels crowd a small screen, so on phones the callouts become tap targets, the year buttons become a grid, and the terminal takes the lower half of the screen.
- **Choosing a design.** I built two complete versions, a technical one-pager and this timeline, before choosing the one that tells my story best.
- **Honesty about the art.** The scenes are AI-generated illustrations of me at my desk, not photos, and the stories stick to what really happened.

*Built with an AI coding agent. Views are my own.*
