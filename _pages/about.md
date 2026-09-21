---
layout: research
permalink: /
title: "AI Researcher | Post-training & LLM Agents"
description: "Yi Jing is an AI researcher at Tsinghua University and a research intern at Tencent Hy, working on LLM post-training, reinforcement learning, and agents. Explore publications and research notes."
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<section class="profile">
  <div class="profile__intro">
    <p class="eyebrow">AI researcher / Beijing</p>
    <h1>Yi Jing</h1>
    <p class="profile__focus">Post-training, agents, and how language models learn.</p>
    <p>I'm a fourth-year undergraduate at <strong>Tsinghua University</strong> and an incoming PhD student at Peking University's Institute of Computational Linguistics, advised by Prof. <a href="https://scholar.google.com/citations?hl=zh-CN&amp;user=y2EaftAAAAAJ&amp;view_op=list_works">Zhifang Sui</a>.</p>
    <p>Currently, I'm a research intern at <strong>Tencent Hy</strong> (Project UP), working on post-training and LLM agents.</p>
    <div class="profile__links">
      <a href="mailto:jingy22@mails.tsinghua.edu.cn"><i class="fas fa-envelope" aria-hidden="true"></i> Email</a>
      <a href="https://github.com/Yii-Jing"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>
    </div>
  </div>
  <figure class="profile__portrait">
    <img src="{{ '/images/jingyi.jpg' | relative_url }}" alt="Yi Jing" width="176" height="200" fetchpriority="high">
    <figcaption>Beijing, China</figcaption>
  </figure>
</section>

<section class="home-section">
  <div class="section-heading">
    <h2>Selected research</h2>
    <a class="quiet-link" href="{{ '/publications/' | relative_url }}">All publications <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
  </div>
  <div class="publication-list">
    {% assign selected = site.publications | where: 'featured', true | sort: 'date' | reverse %}
    {% for paper in selected %}
      <article class="publication-row">
        <div class="publication-row__year">{{ paper.date | date: '%Y' }}</div>
        <div class="publication-row__body">
          <h3><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></h3>
          <p class="publication-row__venue">{{ paper.venue }}</p>
          <div class="research-link-group">
            {% for link in paper.links %}<a href="{{ link.url }}">{{ link.label }} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>{% endfor %}
          </div>
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section class="home-section">
  <div class="section-heading">
    <h2>Latest writing</h2>
    <a class="quiet-link" href="{{ '/blogs/' | relative_url }}">All writing <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
  </div>
  {% assign latest_posts = site.posts | where: 'lang', 'en' | sort: 'date' | reverse %}
  {% assign current_timestamp = site.time | date: '%s' | plus: 0 %}
  {% assign recent_cutoff = current_timestamp | minus: 31536000 %}
  {% assign recent_posts_shown = 0 %}
  {% for post in latest_posts %}
    {% assign post_timestamp = post.date | date: '%s' | plus: 0 %}
    {% if post_timestamp >= recent_cutoff and post_timestamp <= current_timestamp %}
    <article class="home-post" lang="{{ post.lang }}">
      <div class="post-meta"><span class="post-kind {% if post.kind == 'essay' %}post-kind--essay{% endif %}">{{ post.kind_label }}</span><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%Y.%m.%d' }}</time></div>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html }}</p>
    </article>
    {% assign recent_posts_shown = recent_posts_shown | plus: 1 %}
    {% if recent_posts_shown == 2 %}{% break %}{% endif %}
    {% endif %}
  {% endfor %}
</section>

<section class="home-section home-background">
  <div>
    <h2>Background</h2>
    <p>Xinya College &amp; Computer Science, Tsinghua University.</p>
    <p>Previously, I worked on interpretability and reinforcement learning at <a href="https://keg.cs.tsinghua.edu.cn/">THUKEG</a>, human-centered AI at Maryland's <a href="https://www.umiacs.umd.edu/labs/clip">CLIP Lab</a>, and AI for neuroscience at <a href="https://brain.tsinghua.edu.cn/">THBI</a> and Oxford's <a href="https://www.fmrib.ox.ac.uk/">FMRIB</a>.</p>
    <details class="background-details">
      <summary>Collaborators &amp; mentors</summary>
      <p>Prof. <a href="https://keg.cs.tsinghua.edu.cn/persons/ljz/index.html">Juanzi Li</a> (THUKEG), Prof. <a href="https://boydgraber.org/">Jordan Boyd-Graber</a> (CLIP), Prof. <a href="https://birthlab.github.io/en/index.html">Qiyuan Tian</a> (THBI), and Prof. <a href="https://www.win.ox.ac.uk/people/wenchuan-wu">Wenchuan Wu</a> (FMRIB).</p>
    </details>
  </div>
  <div class="home-note">
    <h2>On the calendar</h2>
    <time datetime="2026-08-28">August 28–30, 2026</time>
    <p>AI4Humanities 2026<br>Shanghai, China</p>
  </div>
</section>
