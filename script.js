// The Secure Terminal: a small capture-the-flag that tells my story. The rest of the site works without it.
(function () {
  'use strict';
  var FLAGS = ['flag{packets_to_agents}', 'flag{read_the_logs}', 'flag{ko_not_dodge}'];
  var PROJECTS = {
    'antisocial': { name: 'AntiSOCial', url: 'https://github.com/grand1llusion/antisocial-soc',
      line: 'An agentic SOC whose containment actions are checked by Strands Decider 2B.' },
    'soc-it-to-em': { name: "SOC It To 'Em", url: 'https://github.com/grand1llusion/rock-em-soc-em-robot',
      line: 'An AI analyst that triages live Amazon GuardDuty findings on its own.' },
    'sprint-zero': { name: 'Sprint Zero', url: 'https://github.com/grand1llusion/sprint-zero',
      line: 'A Scrum team simulator: you are the Product Owner, AI agents are the team.' }
  };
  var HOPS = [
    ['a-plus.comptia', 9, 'Hardware, operating systems, troubleshooting'],
    ['network-plus.comptia', 17, 'How packets actually move'],
    ['bs-cyber-forensics.edu', 26, 'B.S. Cybersecurity & Digital Forensics, cum laude'],
    ['security-plus.comptia', 34, 'Security fundamentals'],
    ['cysa-plus.comptia', 47, 'Analyst work: logs, alerts, threat hunting'],
    ['securityx.comptia', 61, 'Advanced security practice'],
    ['ms-cyber.wgu.edu', 75, 'M.S. Cybersecurity, finishing Dec 2026'],
    ['agents.aws.lab', 0, 'Building AI agents on AWS']
  ];

  var wrap = document.getElementById('terminal'), out = document.getElementById('termOut');
  var input = document.getElementById('termInput'), form = document.getElementById('termForm');
  var badge = document.getElementById('flagsBadge'), lastFocus = null, history = [], hIndex = 0, busy = false;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function found() { try { return JSON.parse(store('pf-flags') || '[]'); } catch (e) { return []; } }
  function print(text, cls) { var p = document.createElement('div'); if (cls) p.className = cls; p.textContent = text; out.appendChild(p); out.scrollTop = out.scrollHeight; return p; }
  function printLink(label, url) { var p = document.createElement('div'), a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = label; p.appendChild(a); out.appendChild(p); }
  function updateBadge() { badge.textContent = '🚩 ' + found().length + '/' + FLAGS.length; }

  function capture(flag) {
    var have = found();
    if (have.indexOf(flag) >= 0) { print('(You already have ' + flag + '.)', 'dim'); return; }
    have.push(flag); store('pf-flags', JSON.stringify(have)); updateBadge();
    print('🚩 FLAG CAPTURED: ' + flag + '  (' + have.length + '/' + FLAGS.length + ')', 'flag');
    if (have.length === FLAGS.length) print('All three flags! Type: cert <your name>', 'flag');
  }

  var COMMANDS = {
    help: function () {
      print([
        'Commands:',
        '  whoami              who I am',
        '  ls projects         what I\'ve built',
        '  open <project>      open a project (antisocial, soc-it-to-em, sprint-zero)',
        '  cat superpowers     my tech superpowers',
        '  cat certs           my certifications',
        '  traceroute career   how I got here',
        '  flags               capture-the-flag progress',
        '  contact             how to reach me',
        '  clear · exit',
        '',
        'Three flags are hidden. Real terminals hide files too. Up arrow recalls commands; Tab completes.'
      ].join('\n'));
    },
    whoami: function () {
      print('Bradley Papke: cybersecurity analyst and builder.\n' +
        'I teach people to defend networks, then I build things to prove the lesson works.\n' +
        'Currently: network and log analysis, five CompTIA certifications, and AI agents on AWS. More on LinkedIn: type contact.');
    },
    ls: function (args) {
      if (args[0] === '-a' || args[0] === '-la' || args[0] === '-al') { print('.  ..  .logs  projects/  superpowers  certs  career.log'); return; }
      if (args[0] === 'projects' || args[0] === 'projects/') { Object.keys(PROJECTS).forEach(function (k) { print(k.padEnd(14) + PROJECTS[k].line); }); return; }
      print('projects/  superpowers  career.log');
    },
    cat: function (args) {
      var f = args[0] || '';
      if (f === 'superpowers') {
        print('🛡️  Security ops       Splunk, Elastic Stack, Kibana, ACAS / Tenable Nessus\n' +
          '🔎  Network analysis   Wireshark, tcpdump, editcap, Zeek (Bro) logs, Suricata, Snort\n' +
          '🤖  Applied AI         Amazon Bedrock, Strands Agents, Strands Decider 2B\n' +
          '☁️   AWS                Lambda, DynamoDB, GuardDuty, EventBridge, EC2, IAM, Amplify\n' +
          '📊  Scripting & data   Python, Bash, SQL, R, Tableau, Power BI\n' +
          '🧭  Delivery           Certified ScrumMaster, Microsoft 365, PMP in progress');
      } else if (f === 'certs') {
        print('CompTIA SecurityX · CySA+ · Security+ · Network+ · A+\nCertified ScrumMaster · Data Analytics certificate (4.00 GPA)\nIn progress: CISSP · CISM · PMP');
      } else if (f === '.logs') {
        print('Oct 31 09:14:07 portfolio sshd[2207]: Accepted publickey for visitor\n' +
          'Oct 31 09:14:09 portfolio sudo: visitor : command not allowed ; COMMAND=/usr/bin/hire-me\n' +
          'Oct 31 09:14:11 portfolio analyst: the answer is usually in the logs. Good instinct.');
        capture(FLAGS[1]);
      } else if (f === 'career.log') {
        print('Try: traceroute career');
      } else {
        print('cat: ' + (f || '(nothing)') + ': No such file. Try ls -a', 'err');
      }
    },
    open: function (args) {
      var p = PROJECTS[(args[0] || '').toLowerCase()];
      if (!p) { print('open: which one? ' + Object.keys(PROJECTS).join(', '), 'err'); return; }
      print('Opening ' + p.name + '…'); printLink(p.url, p.url); window.open(p.url, '_blank', 'noopener');
    },
    traceroute: function (args) {
      if (args[0] !== 'career') { print('traceroute: try traceroute career', 'err'); return; }
      busy = true; print('traceroute to builder, ' + HOPS.length + ' hops max');
      HOPS.forEach(function (h, i) {
        setTimeout(function () {
          var ms = h[1] ? (h[1] + ' ms').padStart(7) : '      ★';
          print(String(i + 1).padStart(2) + '  ' + h[0].padEnd(24) + ms + '   ' + h[2]);
          if (i === HOPS.length - 1) { busy = false; capture(FLAGS[0]); input.focus(); }
        }, 450 * (i + 1));
      });
    },
    flags: function () {
      var have = found();
      print('Flags: ' + have.length + '/' + FLAGS.length + (have.length ? '\n' + have.map(function (f) { return '  ✓ ' + f; }).join('\n') : ''));
      if (have.length < FLAGS.length) print('Hints: one is at the end of a journey; one is in a hidden file (they start with a dot); one needs elevated privileges.', 'dim');
    },
    sudo: function (args) {
      if (args.join(' ') === 'hire-me' || args.join(' ') === 'hire me') {
        print('[sudo] password for visitor: ********\nPermission granted. Let\'s talk: type contact.');
        capture(FLAGS[2]);
      } else {
        print('visitor is not in the sudoers file. This incident will be reported. (Try: sudo hire-me)', 'err');
      }
    },
    contact: function () {
      printLink('Email: bradley.papke@gmail.com', 'mailto:bradley.papke@gmail.com');
      printLink('LinkedIn: linkedin.com/in/bradleypapke', 'https://www.linkedin.com/in/bradleypapke');
      printLink('GitHub: github.com/grand1llusion', 'https://github.com/grand1llusion');
    },
    ping: function (args) {
      print(args[0] === 'bradley' ? '64 bytes from bradley: reply in under 24 hours' : 'ping: try ping bradley', args[0] === 'bradley' ? '' : 'err');
    },
    rm: function () { print('Nice try. I teach this.', 'err'); },
    cert: function (args) {
      if (found().length < FLAGS.length) { print('cert: find all three flags first (' + found().length + '/3). Type flags for hints.', 'err'); return; }
      var name = args.join(' ').trim().slice(0, 60) || 'A curious visitor';
      document.getElementById('certName').textContent = name;
      document.getElementById('certDate').textContent = '· ' + new Date().toLocaleDateString();
      document.getElementById('cert').hidden = false; document.getElementById('certPrint').focus();
    },
    clear: function () { out.textContent = ''; },
    exit: function () { close(); }
  };
  var NAMES = Object.keys(COMMANDS).concat(['ls projects', 'ls -a', 'cat superpowers', 'cat certs', 'cat .logs', 'traceroute career', 'sudo hire-me', 'ping bradley']);

  function run(line) {
    var text = line.trim(); if (!text || busy) return;
    print('papke@portfolio:~$ ' + text, 'cmd');
    history.push(text); hIndex = history.length;
    var parts = text.split(/\s+/), cmd = parts[0].toLowerCase(), fn = COMMANDS[cmd];
    if (fn) fn(parts.slice(1)); else print(cmd + ': command not found. Try help', 'err');
  }

  function open() {
    lastFocus = document.activeElement; wrap.hidden = false; document.body.style.overflow = 'hidden';
    if (!out.childNodes.length) {
      print('Secure Terminal v1.0 · connection established', 'dim');
      print('Welcome. This terminal tells my story, and hides three flags. Type help to start.');
    }
    updateBadge(); store('pf-seen', '1'); input.focus();
  }
  function close() {
    wrap.hidden = true; document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll('[data-open-terminal]').forEach(function (b) { b.addEventListener('click', open); });
  document.getElementById('termClose').addEventListener('click', close);
  wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
  form.addEventListener('submit', function (e) { e.preventDefault(); run(input.value); input.value = ''; });
  document.querySelectorAll('[data-cmd]').forEach(function (b) {
    b.addEventListener('click', function () { run(b.getAttribute('data-cmd')); input.focus(); });
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' && hIndex > 0) { hIndex--; input.value = history[hIndex]; e.preventDefault(); }
    else if (e.key === 'ArrowDown') { hIndex = Math.min(history.length, hIndex + 1); input.value = history[hIndex] || ''; e.preventDefault(); }
    else if (e.key === 'Tab') {
      e.preventDefault(); var v = input.value.toLowerCase();
      var m = NAMES.filter(function (n) { return v && n.indexOf(v) === 0; });
      if (m.length === 1) input.value = m[0]; else if (m.length > 1) print(m.join('   '), 'dim');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (!document.getElementById('cert').hidden) document.getElementById('cert').hidden = true; else if (!wrap.hidden) close(); }
    var typing = /input|textarea/i.test((e.target.tagName || ''));
    if (e.key === '`' && !typing && wrap.hidden) { e.preventDefault(); open(); }
  });
  document.getElementById('certPrint').addEventListener('click', function () { window.print(); });
  document.getElementById('certClose').addEventListener('click', function () { document.getElementById('cert').hidden = true; input.focus(); });
  updateBadge();
})();
