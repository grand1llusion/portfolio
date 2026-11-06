# A cybersecurity portfolio with a capture-the-flag inside, hosted on AWS Amplify

*Description (under 160 characters):* My portfolio site on AWS Amplify, with a Secure Terminal: a small
capture-the-flag that tells my story and hides three flags.

**Live site:** [FILL Amplify URL]
**Code:** https://github.com/grand1llusion/portfolio

## What I built

A one-page portfolio for my work in cybersecurity, AI agents and AWS. It has four sections:

- **About me:** my story, one layer at a time, from CompTIA A+ to building AI agents, and what I do now: from packets to decisions: capturing traffic, hunting through logs, tuning detections, and
  turning what I find into something a non-specialist can act on.
- **Tech superpowers:** six skill cards, from Splunk and the Elastic Stack to Wireshark, Zeek, Suricata,
  Amazon Bedrock and Strands Agents.
- **Projects and certifications:** three AI agents I built on AWS this fall (AntiSOCial, SOC It To 'Em and
  Sprint Zero) with code and video links, plus my CompTIA certifications and degrees.
- **Contact:** email, LinkedIn and GitHub.

[Screenshot: home page, desktop] (`docs/screenshots/1-home-desktop.png`)
[Screenshot: skills] (`docs/screenshots/2-skills.png`)
[Screenshot: projects] (`docs/screenshots/3-projects.png`)

## The creative feature: the Secure Terminal

I teach people to defend networks, and the best lessons let you try it yourself. So instead of only listing
skills, the site has a terminal you can hack.

A hint under the headline says: *"Open the terminal and type `help`. Three flags are hidden inside."* A
`>_` button opens it (so does the backtick key). The commands tell my story:

- `whoami`, `ls projects`, `cat superpowers`, `cat certs`, `open sprint-zero`
- `traceroute career` traces my path hop by hop, from CompTIA A+ to building AI agents on AWS

Three flags reward the instincts a security analyst needs:

| Flag | How you find it | The lesson |
|---|---|---|
| `flag{packets_to_agents}` | Follow `traceroute career` to the end | Know the path |
| `flag{read_the_logs}` | Notice the hidden file with `ls -a`, then `cat .logs` | The answer is usually in the logs |
| `flag{ko_not_dodge}` | `sudo hire-me` (the logs give it away) | Escalate privileges, politely |

Find all three and `cert <your name>` prints a "You'd pass my course" certificate you can save as a PDF.
The terminal has command history (up arrow), Tab completion, quick-command buttons for phones, and the site
works fully without it.

[Screenshot: the terminal with all three flags] (`docs/screenshots/4-terminal.png`)
[Screenshot: the certificate] (`docs/screenshots/5-certificate.png`)
[Screenshot: the site on a phone] (`docs/screenshots/6-phone.png`)

## AWS services used

I followed the *Build a Website on the Cloud* tutorial path and host the site with AWS Amplify Hosting.


- **AWS Amplify Hosting:** serves the site over HTTPS on Amplify's global CDN. I connected the GitHub
  repository, so every push to `main` builds and deploys automatically; there is no build step, Amplify
  serves the HTML, CSS and JavaScript as they are.
- **GitHub + Amplify continuous deployment:** fixing a typo is a commit, and the live site updates in about
  a minute.

The projects on the site use more of AWS: Amazon Bedrock, Amazon GuardDuty, Amazon EventBridge, AWS Lambda,
Amazon DynamoDB, Amazon EC2 and Amazon S3.

[Screenshot: Amplify console, deployment succeeded] (take this one in the console; hide the account ID)

## What I learned

1. **Plain files are enough.** No framework, no build: three files and a photo. Amplify serves them fast,
   and anyone can read the code.
2. **Make the creative feature optional.** The terminal is the fun part, but a recruiter in a hurry still
   gets everything from the page itself. Accessibility mattered too: focus moves into the terminal and back when it closes,
   Esc closes it, and it announces new output to screen readers.
3. **Phones change the design.** Typing commands on a phone is slow, so the terminal has tap-to-run buttons
   for the main commands.
4. **Continuous deployment changes how you work.** Once GitHub was connected to Amplify, every improvement
   was one commit away from live.

## Challenges

- **Keeping it focused.** I cut background content so the site stays on technical skills and
  certifications, with the rest on LinkedIn.
- **Hints that teach without giving the answer.** The `flags` command gives one hint per flag; the logs
  point at the last flag, so careful readers are rewarded.

*Built with an AI coding agent. Views are my own.*
