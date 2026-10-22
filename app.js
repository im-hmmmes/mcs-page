'use strict';
(() => {
  const config = window.PORTAL_CONFIG || {};
  const siteName = config.siteName || '方塊之間';
  document.querySelectorAll('[data-site-name]').forEach(node => { node.textContent = siteName; });
  document.title = `${siteName} · Bedrock 伺服器入口`;
  const grid = document.getElementById('server-grid');
  const colors = ['#c5ed84', '#8fced3', '#e4ba86'];
  const servers = Array.isArray(config.servers) ? config.servers : [];
  let toastTimer;
  const notify = message => {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.textContent = ''; }, 4500);
  };
  const make = (tag, className, content) => {
    const node = document.createElement(tag);
    node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  const validHost = host => {
    if (typeof host !== 'string' || host.length > 253) return false;
    // IPv4 and DNS names; IPv6 addresses can be enclosed in brackets.
    return /^(?:\[[0-9a-fA-F:]+\]|[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?)$/.test(host);
  };
  let visibleCount = 0;
  servers.forEach((server, index) => {
    if (!server || typeof server.name !== 'string' || !server.name.trim() || !validHost(server.host)) return;
    const port = server.port === undefined || server.port === '' ? 19132 : Number(server.port);
    if (!Number.isInteger(port) || port < 1 || port > 65535) return;
    visibleCount++;
    const card = make('article', 'card');
    card.style.setProperty('--card-color', colors[index % colors.length]);
    const top = make('div', 'card-top');
    const icon = make('span', 'server-icon', ['▦', '◇', '⌘'][index % 3]);
    icon.setAttribute('aria-hidden', 'true');
    top.append(icon);
    const heading = make('h3', '', server.name);
    const address = `${server.host}:${port}`;
    const location = make('div', 'address', server.host);
    location.append(make('span', '', `PORT / ${port}`));
    const launch = make('a', 'primary', '開啟 Minecraft');
    // Microsoft's documented Bedrock URI: name|address:port.
    // Encode user-controlled values while preserving the protocol delimiters.
    launch.href = `minecraft://?addExternalServer=${encodeURIComponent(server.name)}|${server.host}:${port}`;
    launch.setAttribute('aria-label', `開啟 Minecraft 並新增 ${server.name}`);
    const arrow = make('span', '', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    launch.append(arrow);
    launch.addEventListener('click', () => notify('請在遊戲內確認新增伺服器；若未開啟，可複製位址手動加入。'));
    const copy = make('button', 'copy', '複製位址與連接埠');
    copy.type = 'button';
    copy.setAttribute('aria-label', `複製 ${server.name} 的位址與連接埠`);
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(address);
        notify(`已複製 ${address}`);
      } catch {
        const input = document.getElementById('copy-value');
        input.value = address;
        document.getElementById('copy-dialog').showModal();
        input.focus();
        input.select();
      }
    });
    card.append(top, heading, location, launch, copy);
    grid.append(card);
  });
  document.getElementById('server-count').textContent = `${visibleCount} 個伺服器`;
  if (!visibleCount) grid.append(make('p', 'empty', '伺服器即將開放。清單準備好後，就可以在這裡選擇你的世界。'));
})();
