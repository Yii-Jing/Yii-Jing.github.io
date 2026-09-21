(function () {
  'use strict';

  var root = document.documentElement;
  var chinese = root.lang === 'zh';
  function readPreference(key) {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  }
  function savePreference(key, value) {
    try { localStorage.setItem(key, value); } catch (error) {}
  }

  var themeButton = document.querySelector('.theme-toggle');
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  function refreshThemeButton() {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : systemTheme.matches;
    var label = dark ? 'Switch to light theme' : 'Switch to dark theme';
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
    themeButton.querySelector('i').className = dark ? 'fas fa-sun' : 'fas fa-moon';
  }
  if (themeButton) {
    themeButton.hidden = false;
    refreshThemeButton();
    themeButton.addEventListener('click', function () {
      var dark = root.dataset.theme ? root.dataset.theme === 'dark' : systemTheme.matches;
      root.dataset.theme = dark ? 'light' : 'dark';
      savePreference('yi-theme', root.dataset.theme);
      refreshThemeButton();
    });
    systemTheme.addEventListener('change', refreshThemeButton);
  }

  var languageControls = document.querySelector('.language-options');
  if (languageControls) {
    languageControls.hidden = false;
    var languageButtons = languageControls.querySelectorAll('button');
    var params = new URLSearchParams(location.search);
    function setWritingLanguage(language) {
      document.querySelectorAll('.writing-entry').forEach(function (entry) {
        var versions = Array.from(entry.querySelectorAll('.writing-version'));
        var selected = versions.find(function (version) { return version.dataset.postLanguage === language; }) || versions[0];
        versions.forEach(function (version) { version.hidden = version !== selected; });
      });
      languageButtons.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.writingLanguage === language)); });
      var count = document.querySelector('.writing-count');
      var total = document.querySelectorAll('.writing-entry').length;
      count.textContent = language === 'zh' ? total + ' 篇文章' : total + (total === 1 ? ' piece' : ' pieces');
    }
    var initialLanguage = params.get('lang') === 'zh' ? 'zh' : 'en';
    setWritingLanguage(initialLanguage);
    languageButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var language = button.dataset.writingLanguage;
        setWritingLanguage(language);
        var url = new URL(location.href);
        url.searchParams.set('lang', language);
        history.replaceState(null, '', url);
      });
    });
  }

  var article = document.querySelector('.article-content');
  if (!article) return;

  var tools = document.querySelector('.reading-tools');
  var status = document.querySelector('.action-status');
  if (tools) {
    tools.hidden = false;
    var textSize = Number(readPreference('yi-text-size')) || 18;
    function applyTextSize() {
      textSize = Math.max(16, Math.min(22, textSize));
      root.style.setProperty('--body-size', textSize + 'px');
      tools.querySelector('[data-text-size="decrease"]').disabled = textSize === 16;
      tools.querySelector('[data-text-size="increase"]').disabled = textSize === 22;
    }
    applyTextSize();
    tools.querySelectorAll('[data-text-size]').forEach(function (button) {
      button.addEventListener('click', function () {
        textSize += button.dataset.textSize === 'increase' ? 1 : -1;
        applyTextSize();
        savePreference('yi-text-size', String(textSize));
        status.textContent = chinese ? '字号 ' + textSize : 'Text size ' + textSize;
        scheduleReadingUpdate();
      });
    });
    var copyButton = tools.querySelector('[data-copy-link]');
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      copyButton.hidden = true;
    } else {
      copyButton.addEventListener('click', async function () {
        try {
          var url = new URL(location.href);
          url.hash = '';
          await navigator.clipboard.writeText(url.href);
          status.textContent = chinese ? '链接已复制' : 'Link copied';
        } catch (error) {
          status.textContent = chinese ? '未能复制，请使用浏览器地址栏' : 'Could not copy. Use the address bar.';
        }
      });
    }
  }

  var headings = Array.from(article.querySelectorAll('h2[id]'));
  var tocContainers = document.querySelectorAll('[data-toc]');
  tocContainers.forEach(function (container) {
    var list = document.createElement('ol');
    headings.forEach(function (heading) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + encodeURIComponent(heading.id);
      link.textContent = heading.textContent;
      if (heading.id === 'tldr') link.textContent = chinese ? '概览' : 'Overview';
      item.appendChild(link);
      list.appendChild(item);
    });
    container.appendChild(list);
  });
  if (headings.length && tocContainers.length) {
    document.querySelector('.article-toc').hidden = false;
    document.querySelector('.mobile-toc').hidden = false;
    document.querySelector('.mobile-toc').addEventListener('click', function (event) {
      if (event.target.closest('a')) this.open = false;
    });
  }

  article.querySelectorAll('h2[id], h3[id]').forEach(function (heading) {
    heading.setAttribute('aria-label', heading.textContent);
    var anchor = document.createElement('a');
    anchor.className = 'heading-anchor';
    anchor.href = '#' + encodeURIComponent(heading.id);
    anchor.setAttribute('aria-label', (chinese ? '链接到：' : 'Link to: ') + heading.textContent);
    anchor.title = chinese ? '章节链接' : 'Section link';
    var icon = document.createElement('i');
    icon.className = 'fas fa-link';
    icon.setAttribute('aria-hidden', 'true');
    anchor.appendChild(icon);
    heading.appendChild(anchor);
  });

  var header = document.querySelector('.site-header');
  var progress = document.querySelector('.reading-progress span');
  var scheduled = false;
  function updateReading() {
    scheduled = false;
    var headerHeight = header.getBoundingClientRect().height;
    root.style.setProperty('--header-height', headerHeight + 'px');
    var mobileToc = document.querySelector('.mobile-toc');
    var readingOffset = headerHeight + (mobileToc && getComputedStyle(mobileToc).display !== 'none' ? 48 : 0);
    var bounds = article.getBoundingClientRect();
    var distance = Math.max(1, bounds.height - (innerHeight - readingOffset));
    var ratio = Math.max(0, Math.min(1, (readingOffset - bounds.top) / distance));
    if (progress) progress.style.transform = 'scaleX(' + ratio + ')';
    var current = headings[0];
    headings.forEach(function (heading) {
      if (heading.getBoundingClientRect().top <= readingOffset + 60) current = heading;
    });
    tocContainers.forEach(function (container) {
      container.querySelectorAll('a').forEach(function (link) {
        if (current && decodeURIComponent(link.hash.slice(1)) === current.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }
  function scheduleReadingUpdate() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateReading); }
  }
  window.addEventListener('scroll', scheduleReadingUpdate, { passive: true });
  window.addEventListener('resize', scheduleReadingUpdate);
  window.addEventListener('load', scheduleReadingUpdate);
  if ('ResizeObserver' in window) new ResizeObserver(scheduleReadingUpdate).observe(article);
  updateReading();
})();
