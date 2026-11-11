
const DEBIAN = {
  maintained: [
    'alien', 'bear', 'cramfsswap', 'cryfs', 'doctest', 'enca', 'judy', 'libarchive', 'libb64', 'palabos', 'plptools', 'procinfo', 'quill', 'rdiff-backup-fs', 'rmlint','rust-json5', 'sqlcipher', 'srain', 'ssmtp', 'utfcpp'
  ],
  adopting: [
    'dmalloc', 'gnunet', 'gts', 'ifstat', 'network-manager-openconnect', 'openconnect',
    'vpnc-scripts', 'xinetd'
  ],
  qa: [
    'amavisd-milter', 'bluemon', 'cadabra2', 'dact', 'efte', 'flpsed', 'gfxboot', 'jpegpixi',
    'kst', 'libam7xxx', 'liblaxjson', 'microdc2', 'mstch', 'o3dgc', 'obexftp', 'otp',
    'proxsmtp', 'rpmlint', 'sredird', 'storebackup', 'systemtap', 'tcpspy', 'xcolorsel',
    'xfractint', 'yasm'
  ]
};

const FOSS = {
  maintained: [
    'https://github.com/rdiff-backup/rdiff-backup-fs',
    'https://github.com/Project-OSS-Revival/enca',
    'https://github.com/Project-OSS-Revival/ssmtp',
    'https://github.com/Project-OSS-Revival/alien'
  ],
  contributed: [
    'https://github.com/openzfs/zfs',
    'https://github.com/picocms/pico-composer',
    'https://github.com/picocms/picocms.github.io',
    'https://github.com/plptools/plptools',
    'https://github.com/odygrd/quill',
    'https://github.com/canonical/multipass',
    'https://github.com/vesoft-inc/nebula',
    'https://github.com/sahib/rmlint',
    'https://github.com/Icinga/icinga2',
    'https://github.com/bpftrace/bpftrace',
    'https://github.com/memgraph/memgraph',
    'https://github.com/DynamoRIO/drmemory',
    'https://github.com/cherrypy/cherrypy'
  ]
};

(function () {
  const tracker = name => `https://tracker.debian.org/pkg/${name}`;
  const repoName = url => url.split('/').pop();
  const debianMaintained = new Set(DEBIAN.maintained);
  const upstreamMaintained = new Set(FOSS.maintained.map(repoName));

  function item(href, html, mark) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = html;
    li.appendChild(a);
    if (mark) li.insertAdjacentHTML('beforeend', mark);
    return li;
  }

  const debianItem = name => item(tracker(name), name,
    upstreamMaintained.has(name) ? '<sup title="Also maintained upstream">↑</sup>' : '');

  function fossItem(url) {
    const [owner, name] = url.split('/').slice(-2);
    return item(url, `<span class="owner">${owner}/</span>${name}`,
      debianMaintained.has(name) ? '<sup title="Also maintained in Debian">D</sup>' : '');
  }

  function setCount(key, n) {
    document.querySelectorAll(`[data-count-for="${key}"]`).forEach(el => el.textContent = n);
  }

  function fill(listId, items) {
    const el = document.getElementById(listId);
    if (!el) return;
    items.forEach(node => el.appendChild(node));
    setCount(listId, items.length);
  }

  document.addEventListener('DOMContentLoaded', function () {
    fill('debian-maintained', DEBIAN.maintained.map(debianItem));
    fill('debian-adopting', DEBIAN.adopting.map(debianItem));
    fill('debian-qa', DEBIAN.qa.map(debianItem));
    fill('foss-maintained', FOSS.maintained.map(fossItem));
    fill('foss-contributed', FOSS.contributed.map(fossItem));
    setCount('foss', FOSS.maintained.length + FOSS.contributed.length);

    const mobile = window.matchMedia('(max-width: 768px)');
    const blocks = document.querySelectorAll('.project-block');
    const syncBlocks = () => blocks.forEach((d, i) => { d.open = !mobile.matches || i === 0; });
    blocks.forEach(d => d.querySelector('summary').addEventListener('click', e => {
      if (!mobile.matches) e.preventDefault();
    }));
    mobile.addEventListener('change', syncBlocks);
    syncBlocks();

    const stats = document.querySelectorAll('.project-stat strong');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const countUp = el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1200;
      const start = performance.now();
      const tick = now => {
        const t = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    stats.forEach(el => {
      el.dataset.target = el.textContent;
      el.textContent = '0';
      observer.observe(el);
    });
  });
})();
