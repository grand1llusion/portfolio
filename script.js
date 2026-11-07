// The desk terminal: a small capture-the-flag that also drives the timeline. The rest of the site works without it.
(function () {
  'use strict';
  var FLAGS = ['flag{packets_to_agents}', 'flag{read_the_logs}', 'flag{ko_not_dodge}'];
  var PROJECTS = {
    'antisocial': { name: 'AntiSOCial', url: 'https://github.com/grand1llusion/antisocial-soc',
      line: 'An agentic SOC whose containment actions are checked by Strands Decider 2B.' },
    'soc-it-to-em': { name: "SOC It To 'Em", url: 'https://github.com/grand1llusion/rock-em-soc-em-robot',
      line: 'An AI analyst that triages live Amazon GuardDuty findings on its own.' },
    'sprint-zero': { name: 'Sprint Zero', url: 'https://github.com/grand1llusion/sprint-zero',
      line: 'A Scrum team simulator: you are the Product Owner, AI agents are the team.' },
    'portfolio': { name: 'This portfolio', url: 'https://github.com/grand1llusion/portfolio',
      line: 'This desk, this terminal, deployed with AWS Amplify Hosting.' }
  };

  var J = function () { return window.Journey; };
  var wrap = document.getElementById('terminal'), out = document.getElementById('termOut');
  var input = document.getElementById('termInput'), form = document.getElementById('termForm');
  var badge = document.getElementById('flagsBadge'), ps1 = document.getElementById('ps1'), title = document.getElementById('termYear');
  var lastFocus = null, history = [], hIndex = 0, busy = false, year = 2001, prevYear = null;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function found() { try { return JSON.parse(store('pf-flags') || '[]'); } catch (e) { return []; } }
  function print(text, cls) { var p = document.createElement('div'); if (cls) p.className = cls; p.textContent = text; out.appendChild(p); out.scrollTop = out.scrollHeight; return p; }
  function printLink(label, url) { var p = document.createElement('div'), a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = label; p.appendChild(a); out.appendChild(p); out.scrollTop = out.scrollHeight; }
  function updateBadge() { badge.textContent = '🚩 ' + found().length + '/' + FLAGS.length; }
  function slug(s) { return String(s).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9+]+/g, '-').replace(/^-|-$/g, ''); }
  function objects() { return J() ? J().current().callouts : []; }

  function capture(flag) {
    var have = found();
    if (have.indexOf(flag) >= 0) { print('(You already have ' + flag + '.)', 'dim'); return; }
    have.push(flag); store('pf-flags', JSON.stringify(have)); updateBadge();
    print('🚩 FLAG CAPTURED: ' + flag + '  (' + have.length + '/' + FLAGS.length + ')', 'flag');
    if (have.length === FLAGS.length) print('All three flags! Type: cert <your name>', 'flag');
  }

  function setYear(y) {
    year = y; title.textContent = y; ps1.textContent = 'papke@desk:~/' + y + '$';
  }

  function go(y) {
    if (!J() || J().indexOf(y) < 0) { print('cd: ' + y + ': No such year. Try: history', 'err'); return; }
    prevYear = year; J().go(y);
    var r = J().years[J().indexOf(y)];
    print(y + ' · ' + r.chapter + ': ' + r.headline, 'dim');
  }

  var COMMANDS = {
    help: function () {
      print([
        'You are at the desk. Every year is a directory.',
        '',
        '  ls                  what is on the desk this year',
        '  cat <object>        open an object\'s story (Tab completes)',
        '  cd <year>           travel to a year (cd .. goes back one, cd ~ is today)',
        '  history             every year, one line each',
        '  traceroute career   travel the whole path, hop by hop',
        '  whoami · cat certs · cat superpowers · ls projects · open <project>',
        '  flags · contact · clear · exit',
        '',
        'Three flags are hidden. Real terminals hide files too. Up arrow recalls; Tab completes.'
      ].join('\n'));
    },
    whoami: function () {
      print('Bradley Papke: Cyber Operations Planner, builder, instructor.\n' +
        'Electronics repair → cybersecurity → teaching → AI agents on AWS. Still asking how things work.\n' +
        'Currently: ~/' + year + '. Type history to see the whole path.');
    },
    pwd: function () { print('/home/papke/desk/' + year); },
    ls: function (args) {
      var a = args[0] || '';
      if (a === 'projects' || a === 'projects/') { Object.keys(PROJECTS).forEach(function (k) { print(k.padEnd(14) + PROJECTS[k].line); }); return; }
      if (/^\d{4}$/.test(a)) { go(+a); return; }
      var names = objects().map(function (c) { return slug(c.label); });
      if (a === '-a' || a === '-la' || a === '-al') names = ['.', '..', '.logs'].concat(names);
      print(names.join('   ') + '   projects/');
    },
    cd: function (args) {
      var a = args[0] || '~';
      if (a === '~' || a === '/') { go(2026); return; }
      if (a === '-') { if (prevYear) go(prevYear); return; }
      var ys = J().years.map(function (r) { return r.year; }), i = ys.indexOf(year);
      if (a === '..') { if (i > 0) go(ys[i - 1]); else print('cd: already at the beginning', 'err'); return; }
      if (a === 'next' || a === '2027') { J().next(); print('2027 has not happened yet. Opening the plan instead.', 'dim'); return; }
      go(parseInt(a, 10));
    },
    history: function () {
      J().years.forEach(function (r) { print(String(r.year).padEnd(6) + r.chapter.padEnd(28) + r.note); });
    },
    cat: function (args) {
      var f = args.join(' ').trim(), s = slug(f);
      if (f === 'superpowers') {
        print('🛡️  Security ops       Splunk, Elastic Stack, Kibana, ACAS / Tenable Nessus\n' +
          '🔎  Network analysis   Wireshark, tcpdump, editcap, Zeek (Bro) logs, Suricata, Snort\n' +
          '🤖  Applied AI         Amazon Bedrock, Strands Agents, Strands Decider 2B\n' +
          '☁️   AWS                Lambda, DynamoDB, GuardDuty, EventBridge, EC2, IAM, Amplify\n' +
          '🧑‍🏫  Teaching           Kolb, experiential learning, Certified ScrumMaster\n' +
          '🔧  Hardware           Electronics repair, Raspberry Pi, Python, Bash, SQL');
        return;
      }
      if (f === 'certs') { print('CompTIA SecurityX · CySA+ · Network+ · Security+ · A+\nCertified ScrumMaster · Journeyman, Electronics Technician\nNext: PenTest+ · CISM · CISSP · Certified Scrum Trainer'); return; }
      if (f === '.logs') {
        print('Nov 06 21:14:07 desk sshd[2207]: Accepted publickey for visitor\n' +
          'Nov 06 21:14:09 desk sudo: visitor : command not allowed ; COMMAND=/usr/bin/hire-me\n' +
          'Nov 06 21:14:11 desk analyst: the answer is usually in the logs. Good instinct.');
        capture(FLAGS[1]); return;
      }
      var c = objects().filter(function (o) { var k = slug(o.label); return k === s || (s && k.indexOf(s) >= 0); })[0];
      if (c) { print(c.label + ': ' + c.text); J().open(c); return; }
      print('cat: ' + (f || '(nothing)') + ': No such file in ' + year + '. Try ls -a', 'err');
    },
    open: function (args) {
      var p = PROJECTS[(args[0] || '').toLowerCase()];
      if (!p) { print('open: which one? ' + Object.keys(PROJECTS).join(', '), 'err'); return; }
      print('Opening ' + p.name + '…'); printLink(p.url, p.url); window.open(p.url, '_blank', 'noopener');
    },
    traceroute: function (args) {
      if (args[0] !== 'career') { print('traceroute: try traceroute career', 'err'); return; }
      var ys = J().years; busy = true;
      document.getElementById('journey').scrollIntoView({ behavior: 'smooth', block: 'start' });
      print('traceroute to builder (2026), ' + ys.length + ' hops max');
      (function hop(i) {
        if (i >= ys.length) { busy = false; print(' *  2027.next                 type cd next', 'dim'); capture(FLAGS[0]); input.focus(); return; }
        J().step(i, i === 0 ? 500 : 520, function () {
          var r = ys[i], ms = (8 + i * 4) + ' ms';
          print(String(i + 1).padStart(2) + '  ' + (r.year + '.' + slug(r.chapter)).padEnd(32) + ms.padStart(7) + '   ' + r.note);
          setTimeout(function () { hop(i + 1); }, 120);
        });
      })(0);
    },
    flags: function () {
      var have = found();
      print('Flags: ' + have.length + '/' + FLAGS.length + (have.length ? '\n' + have.map(function (f) { return '  ✓ ' + f; }).join('\n') : ''));
      if (have.length < FLAGS.length) print('Hints: one is at the end of the journey; one is in a hidden file (they start with a dot); one needs elevated privileges.', 'dim');
    },
    sudo: function (args) {
      var a = args.join(' ');
      if (a === 'hire-me' || a === 'hire me') {
        print('[sudo] password for visitor: ********\nPermission granted. Let\'s talk: type contact.');
        capture(FLAGS[2]);
      } else {
        print('visitor is not in the sudoers file. This incident will be reported. (The logs might know what is allowed.)', 'err');
      }
    },
    contact: function () {
      printLink('Email: bradley.papke@gmail.com', 'mailto:bradley.papke@gmail.com');
      printLink('LinkedIn: linkedin.com/in/bradleypapke', 'https://www.linkedin.com/in/bradleypapke');
      printLink('GitHub: github.com/grand1llusion', 'https://github.com/grand1llusion');
    },
    ping: function (args) { print(args[0] === 'bradley' ? '64 bytes from bradley: reply in under 24 hours' : 'ping: try ping bradley', args[0] === 'bradley' ? '' : 'err'); },
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
  COMMANDS.dir = COMMANDS.ls;

  function completions() {
    return Object.keys(COMMANDS).concat(['ls projects', 'ls -a', 'cat superpowers', 'cat certs', 'cat .logs', 'traceroute career',
      'sudo hire-me', 'ping bradley', 'cd next'])
      .concat(objects().map(function (c) { return 'cat ' + slug(c.label); }))
      .concat(J() ? J().years.map(function (r) { return 'cd ' + r.year; }) : [])
      .concat(Object.keys(PROJECTS).map(function (k) { return 'open ' + k; }));
  }

  function run(line) {
    var text = line.trim(); if (!text || busy) return;
    print(ps1.textContent + ' ' + text, 'cmd');
    history.push(text); hIndex = history.length;
    var parts = text.split(/\s+/), cmd = parts[0].toLowerCase(), fn = COMMANDS[cmd];
    if (fn) fn(parts.slice(1)); else print(cmd + ': command not found. Try help', 'err');
  }

  function open() {
    lastFocus = document.activeElement; wrap.hidden = false;
    if (!out.childNodes.length) {
      print('Desk terminal v2.0 · connection established', 'dim');
      print('Welcome to my desk. Every year is a directory, and three flags are hidden. Type help to start.');
    }
    updateBadge(); store('pf-seen', '1'); input.focus();
  }
  function close() { wrap.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }

  document.querySelectorAll('[data-open-terminal]').forEach(function (b) { b.addEventListener('click', open); });
  document.getElementById('termClose').addEventListener('click', close);
  form.addEventListener('submit', function (e) { e.preventDefault(); run(input.value); input.value = ''; });
  document.querySelectorAll('[data-cmd]').forEach(function (b) { b.addEventListener('click', function () { run(b.getAttribute('data-cmd')); input.focus(); }); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' && hIndex > 0) { hIndex--; input.value = history[hIndex]; e.preventDefault(); }
    else if (e.key === 'ArrowDown') { hIndex = Math.min(history.length, hIndex + 1); input.value = history[hIndex] || ''; e.preventDefault(); }
    else if (e.key === 'Tab') {
      e.preventDefault(); var v = input.value.toLowerCase();
      var m = completions().filter(function (n) { return v && n.indexOf(v) === 0; });
      if (m.length === 1) input.value = m[0]; else if (m.length > 1) print(m.join('   '), 'dim');
    }
  });
  document.addEventListener('keydown', function (e) {
    var certBox = document.getElementById('cert');
    if (e.key === 'Escape') { if (!certBox.hidden) certBox.hidden = true; else if (!wrap.hidden) close(); }
    var typing = /input|textarea/i.test(e.target.tagName || '');
    if (e.key === '`' && !typing && wrap.hidden) { e.preventDefault(); open(); }
  });
  document.getElementById('certPrint').addEventListener('click', function () { window.print(); });
  document.getElementById('certClose').addEventListener('click', function () { document.getElementById('cert').hidden = true; input.focus(); });

  window.Terminal = { open: open, setYear: setYear };
  if (J()) setYear(J().current().year);
  updateBadge();
})();
