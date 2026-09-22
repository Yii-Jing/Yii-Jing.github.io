---
layout: research-detail
title: Scaling System 1 towards Inclusive Intelligence
subtitle: Introducing Jev Cowork
date: '2026-09-22'
permalink: /posts/jev-cowork-zh/
lang: zh
translation_key: jev-cowork-inclusive-intelligence
kind: research
kind_label: 研究随笔
toc: true
reading_minutes: 16
excerpt: 低成本、低时延的专业判断，能否扩大证据覆盖，并让研究沿时间持续发生？从行动选择、证据组织与持续监测实验出发，探索 Jev Cowork 的能力、成本和边界。
tags:
- Agents
- AI for Research
- System 1
---

<div class="jev-article">
<p>知识工作的大量成本，发生在答案出现之前：辨认关键事实，在几种解释之间分配注意力，决定下一步查什么。报告完成之后，新的披露、判决或实验结果又可能使其中某个判断失效，研究仍需继续。</p>
<p>这些工作依赖一种专业直觉：知道什么值得注意，什么需要怀疑，什么已经足够。我们称之为 <strong>taste</strong>。Jev 以选择、评分和概率的形式直接给出判断，低成本、低时延使这种直觉有机会进入研究的更多环节。</p>
<p><strong>Jev Cowork</strong> 围绕两个尺度展开：在一个问题内部，扩大证据与关系判断的覆盖；沿着时间，持续维护假设、接收变化、推进调查。我们将这个方向称为 <strong>Inclusive Intelligence</strong>：让更多信息得到考虑，让更多问题获得可负担的、持续的研究关注。</p>
<h2 id="section-1">1. 判断与预测：System 1 的两种能力</h2>
<p>本文用 System 1 指直接给出有界判断、无需展开显式思维链的模型调用。我们测试的是 <code>jev-1.13.0</code> 的结构化接口。<a class="citation" href="#reference-1" aria-label="参考文献 1">[1]</a></p>
<p>System 1 描述的是能力被调用的方式：快速、直接，无需每次展开完整论证。它可以用于预测，也可以用于判断。这两种能力的区别，需要从任务本身理解。</p>
<p><strong>预测关心结果：给定当前信息，未来会发生什么，各有多大概率？判断关心取舍：给定目标、证据和约束，什么值得相信、关注或采取？</strong> 本文用行动选择测试后者，再把它延伸到研究中的注意力分配。</p>
<p>两者共享知识，却有不同的成功条件。一个人可能看准需求增长，仍选错资金方案；也可能无法精确预测市场走势，却能识别某个方案违反流动性约束，或判断哪条证据值得优先核查。对世界的把握与对行动的取舍，需要分别检验。</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="实验比较表"><table>
<thead><tr>
<th>能力</th>
<th>核心问题</th>
<th class="numeric">主要评价依据</th>
</tr></thead>
<tbody>
<tr>
<td>预测</td>
<td>哪些结果会发生，各有多大概率？</td>
<td class="numeric">结果揭晓后的概率误差与校准</td>
</tr>
<tr>
<td>判断，本实验以行动选择为例</td>
<td>在这些目标和约束下，应选什么？</td>
<td class="numeric">约束满足、目标取舍与行动质量</td>
</tr>
</tbody>
</table></div>
<p>输出长度也无法区分它们。一个概率可以承载复杂的预测，一个选项可以承载复杂的专业判断。Taste 尤其体现在几种“都有道理”的选择之间：哪些条件不可违反，哪个例外真正适用，一个可执行的方案是否值得优先采取。</p>
<h3 id="jev-heading-2">给定情境中的行动判断</h3>
<p>Hard Pro 包含金融、法律和医疗三个领域的九个案例，每题十二条记录、五个候选行动，要求模型综合跨记录约束、时间关系与方案成本作出选择。题面与作者标准在运行前冻结，模型不使用检索或工具。结果如下。</p>
<figure class="image-figure " id="figure-1"><a href="{{ '/assets/images/jev-cowork/hard-pro.png' | relative_url }}" target="_blank" rel="noopener" class="image-open" aria-label="查看大图：Hard Pro 主比较：Jev、Hunyuan 3 与 Cogito direct 均为 5/9；Gemini 3.6 Flash 为 7/9；Qwen3 raw direct 为 1/9；BERT-MNLI 为 2/9。" title="查看原图"><img src="{{ '/assets/images/jev-cowork/hard-pro.png' | relative_url }}" alt="Hard Pro 主比较：Jev、Hunyuan 3 与 Cogito direct 均为 5/9；Gemini 3.6 Flash 为 7/9；Qwen3 raw direct 为 1/9；BERT-MNLI 为 2/9。" loading="lazy" decoding="async" width="1600" height="1020"></a><figcaption>图 1｜同一 Hard Pro 题集的主行动匹配数。</figcaption></figure><p>Jev 的表现与 Hunyuan 3 <code>no_think</code>、Cogito-32B <code>direct</code> 相同，比 DS <code>none</code> 和 GLM <code>low</code> 少一题，Gemini 3.6 Flash 为 <strong>7/9</strong>。BERT-MNLI 将各个行动分别转成蕴含判断，得到 <strong>2/9</strong>。局部语义匹配与专业行动选择之间，存在明显距离：后者需要把散落在材料中的条件组织成一个整体。</p>
<p>更难的金融题也暴露了这种直觉的局限。Jev 与 DS <code>none</code> 都是 <strong>0/3</strong>，DS <code>max</code> 为 <strong>3/3</strong>。其中一道资金安排题，Jev 选中了可执行但成本更高的方案。局部条件的识别，与全局取舍的完成，是两层能力。</p>
<p>时延则呈现出另一种差异。Jev 主行动请求的中位耗时为 <strong>0.846 秒</strong>，DS <code>none</code> 为 <strong>1.887 秒</strong>，DS <code>max</code> 为 <strong>9.004 秒</strong>。这是实验链路上的观测值。对需要反复发生的局部判断，亚秒级响应已经具有实用意义。</p>
<h3 id="jev-heading-3">未知结果的概率预测</h3>
<p>行动选择之外，我们还测试了历史事件预测。六条路线共同成功的七道财经题中，Brier 分数如下，越低越好。</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="实验比较表"><table>
<thead><tr>
<th>路线</th>
<th class="numeric">Brier 分数</th>
</tr></thead>
<tbody>
<tr>
<td>DS V4.1 Flash max</td>
<td class="numeric">0.05347</td>
</tr>
<tr>
<td>Gemini 3.6 Flash，thinking budget 0</td>
<td class="numeric">0.09671</td>
</tr>
<tr>
<td>GLM-5.3-Flash low</td>
<td class="numeric">0.11794</td>
</tr>
<tr>
<td>DS V4.1 Flash none</td>
<td class="numeric">0.13233</td>
</tr>
<tr>
<td>Hunyuan 3 no_think</td>
<td class="numeric">0.14357</td>
</tr>
<tr>
<td>Jev</td>
<td class="numeric">0.15239</td>
</tr>
</tbody>
</table></div>
<p>Jev 在这组预测上落后于其他路线。与前面的行动实验合看，我们得到一幅更具体的能力画像：它能够处理一部分专业约束与行动取舍，对未知事件的概率估计则相对较弱。两组实验各自测量一个侧面，不能彼此代替。</p>
<p>这个差别对 System 1 同样成立。快速识别情境中的关键结构，与快速给出校准的概率，需要学会不同的映射。能直接选出一个合适行动，并不保证能准确分配各个未来结果的概率；接口返回了置信度，也仍需单独检验其校准。<a class="citation" href="#reference-2" aria-label="参考文献 2">[2]</a></p>
<p>另一个十二题实验中，先由 DS 生成摘要、机制解读或证据审计，再交给 Jev，没有降低相对直接 Jev 的平均 Brier 误差。 解释增加了什么，与这些信息是否改善概率估计，是两个需要分别回答的问题。</p>
<h3 id="jev-heading-4">判断与预测的协同</h3>
<p>真实决策常常同时需要预测和判断。预测提供可能的结果，判断决定如何看待收益、损失与约束。同样的结果概率，面对不同的资金期限或失败代价，可以导向不同的行动。若行动会改变结果，预测本身也要随行动条件而变化。</p>
<p>Hard Pro 将规则和关键条件放进题面，使我们可以较直接地观察取舍能力。开放式研究还要更早做一次判断：缺少什么信息，哪个不确定性重要，接下来值得为它付出多少调查成本。此时，taste 参与决定预测和推理应该用在何处。</p>
<p>这给 Jev 的系统角色提供了一个具体入口。即使系统暂时无法准确预测某家公司下一年的利润，它仍可能识别一段重要披露、发现两个口径之间的张力，或提示一个假设值得重看。我们接下来的实验，检验这些判断能否改善研究过程。</p>
<h2 id="section-2">2. 判断的边际成本</h2>
<p>当一次专业判断足够便宜，研究的组织方式就有了新的选择。</p>
<p>按实验使用的每百万输入 token <strong>0.042 美元</strong>标价，每次两千 token，一万次判断的输入费用约为 <strong>0.84 美元</strong>。Jev Cowork 的一组研究实验进行了 <strong>934 次独立 Jev 调用</strong>，输入约 256 万 token，输入费用估算约 <strong>0.108 美元</strong>。综合模型、检索与复核成本另计。</p>
<p>这一量级允许我们细化判断的对象：一条材料的重要性，两条证据的互补关系，一个结论的适用范围，一次新披露对旧假设的影响。它们可以分别计算、并行发生，并作为研究状态保留下来。</p>
<p>这里的 scaling 增加的是<strong>不同判断的覆盖</strong>。十次相同提问仍可能停留在同一个盲点；十个新的证据关系，可能打开另一条调查路径。规模的价值取决于新增判断带来的信息增量。</p>
<p>知识工作始终受注意力约束。研究者会优先照顾最紧迫的几个问题，其余疑点、弱信号和长期假设只能等待。低成本判断提供了一种扩展关注范围的可能：让更多材料先被看见，让更多联系先被提出，让一些暂时无人重读的问题继续接受新信息。</p>
<p><strong>Inclusive Intelligence</strong> 包含两层含义。研究内部，更多证据与解释获得被考虑的机会；研究之外，更低的维护成本有望使小团队和个人也能持续照顾较大的问题集合。Jev Cowork 用深度研究与连续研究，分别探索这两种可能。</p>
<h2 id="section-3">3. 向深处：扩大证据与关系的覆盖</h2>
<p>Jev 判断哪些材料值得一起读、哪里存在限定与反证；代码将这些关系组织成议程，综合模型结合完整原文形成带引用的报告。</p>
<figure class="flow" aria-label="深度研究流程：原文分别进入关系判断和完整上下文，两路汇合为研究简报，再进行来源复核。">
    <div class="flow-title">
<span>JEV COWORK / DEEP RESEARCH</span>From evidence to a research brief</div>
    <div class="flow-node "><strong>Source materials &amp; research question</strong></div>
<div class="flow-arrow" aria-hidden="true">↓</div>
    <div class="flow-branches">
<div>
<div class="flow-node accent">
<strong>Jev relationship judgments</strong><span>Importance · Complementarity · Scope</span>
</div>
<div class="flow-arrow" aria-hidden="true">↓</div>
<div class="flow-node ">
<strong>Research agenda</strong><span>Deduplication · Coverage · Composition</span>
</div>
</div>
    <div class="source-branch"><div class="flow-node source">
<strong>Full source context</strong><span>Original text, table headers and scope</span>
</div></div>
</div>
    <div class="flow-arrow" aria-hidden="true">↓</div>
<div class="flow-node ">
<strong>Synthesis model → Cited research brief</strong><span>Research agenda + full source context</span>
</div>
<div class="flow-arrow" aria-hidden="true">↓</div>
<div class="flow-node "><strong>Source verification &amp; human judgment</strong></div>
  </figure><h3 id="jev-heading-7">从找到材料到形成论证</h3>
<p>证据检索实验覆盖 <strong>380 份完整文档、90,041 个原文片段</strong>。</p>
<figure class="image-figure " id="figure-2"><a href="{{ '/assets/images/jev-cowork/evidence-retrieval.png' | relative_url }}" target="_blank" rel="noopener" class="image-open" aria-label="查看大图：四项检索指标：金融目标页定位、金融文档排序、法律文档排序与法律正例覆盖。" title="查看原图"><img src="{{ '/assets/images/jev-cowork/evidence-retrieval.png' | relative_url }}" alt="四项检索指标：金融目标页定位、金融文档排序、法律文档排序与法律正例覆盖。" loading="lazy" decoding="async" width="1600" height="1110"></a><figcaption>图 2｜金融可评分集为 17 题、4 家公司，按公司等权；法律为 13 个引用案件，按案件等权。Hit@20 衡量目标页进入前二十的情况，MRR 衡量第一条相关文档的位置，Recall@20 衡量正例覆盖。</figcaption></figure><p>金融目标页 Hit@20 从词面检索的 <strong>0.107</strong> 提高到 Jev 排序的 <strong>0.929</strong>，同轮 DS <code>max</code> 为 <strong>0.893</strong>。Jev 在法律文档排序上也领先，但正例覆盖仍由 DS <code>max</code> 领先。</p>
<p>找到材料并不等于完成论证。在 SVB 与 Akorn 的六个研究问题上，Jev 证据组合加 DS <code>max</code> 的来源复核评分为 <strong>78.33/100</strong>，完整证据直接 DS <code>max</code> 为 <strong>90.83/100</strong>。筛选可能丢掉定义和表头，因此报告生成保留完整原文，让议程引导阅读，而不是代替来源。</p>
<h3 id="jev-heading-8">直觉提出联系，原文约束结论</h3>
<p>在 3M 与 Waterkeeper 的四个研究任务中，<strong>512 次不同的 Jev 关系判断</strong>形成议程，由 DS <code>medium</code> 结合完整原页完成写作。</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="实验比较表"><table>
<thead><tr>
<th>3M / Waterkeeper，四个任务</th>
<th>Jev 议程 + DS medium</th>
<th>纯 DS max</th>
<th class="numeric">纯 DS none</th>
</tr></thead>
<tbody>
<tr>
<td>研究任务成功</td>
<td>3/4</td>
<td>3/4</td>
<td class="numeric">2/4</td>
</tr>
<tr>
<td>关键事实核验</td>
<td>20/20</td>
<td>20/20</td>
<td class="numeric">15/20</td>
</tr>
<tr>
<td>预声明重大错误</td>
<td>0</td>
<td>0</td>
<td class="numeric">1</td>
</tr>
<tr>
<td>已审引用支持</td>
<td>60/61</td>
<td>57/59</td>
<td class="numeric">38/49</td>
</tr>
<tr>
<td>写作输出 token，含推理</td>
<td>49,993</td>
<td>67,512</td>
<td class="numeric">11,137</td>
</tr>
<tr>
<td>平均写作耗时</td>
<td>55.9 秒</td>
<td>72.4 秒</td>
<td class="numeric">14.6 秒</td>
</tr>
</tbody>
</table></div>
<p><em>引用采用模型辅助来源复核。token 为四题合计，时间为单次 DS 写作请求均值，议程构建与研究评测另计。</em></p>
<p>议程加 <code>medium</code> 与纯 <code>max</code> 的任务成功和关键事实核验持平，两者各有一份法律报告因引用编号错误未通过交付。前者写作输出 token 少 <strong>25.9%</strong>，平均耗时少 <strong>22.7%</strong>；四份议程的 Jev 构建费用按标价估算约 <strong>0.0624 美元</strong>。这是议程与较低推理档位组合后的表现。</p>
<p>这些数字之外，报告还留下了可以继续调查的问题。3M 的每股收益小幅上升，但调整后盈利与现金流走弱。报告没有停在“盈利质量下降”，而是把原材料、汇率的影响与销量、价格、生产率放在一起，追问下降中有多少可能随外部条件缓解，有多少来自经营本身。如果主要是暂时性的成本压力，对持续盈利的判断可能缓和；如果销量与单位盈利也持续走弱，就需要进一步检查剩余业务的经营表现。后续研究因此有了具体对象，而不只是“继续关注财报”。</p>
<p>Waterkeeper 案例中的联系来自同一判决的不同页面。一处写到当事人没有承认水体的相对永久性，但也没有直接争执这一事实；另一处则写到它反驳了对方关于“永久长存水体”的主张。把两段放在一起，报告提出了一个核查方向：回到审前陈述和庭审记录，确认哪些自然事实已被承认、哪些仍有争议。这关系到新法律标准下还需要补充什么证据，也影响后续审理可以围绕哪些问题展开。</p>
<p><strong>信息增量来自已有证据被联系起来。</strong> 原材料没有增加，但分散的事实被组织成了需要区分的解释、需要补齐的前提。议程在这里提供的是研究线索，而不是直接给出答案。接下来还需要安排顺序：先查哪个问题最可能改变结论，哪些检查依赖前一步的结果，什么证据出现后就可以停止追问。</p>
<h2 id="section-4">4. 沿时间：让研究继续发生</h2>
<p>报告中的判断通常具有条件性：“公司仍在优先保留资本”“结论依赖某项监管条件”“需要观察下一季度的现金流”。这些条件很少被单独维护。新信息到来时，研究者需要重新找到旧判断，再建立联系。</p>
<p>Jev Cowork 将简报中的发现保存为工作假设，记录复核条件，让后续材料与它们持续匹配。值得关注的变化产生提醒，调查取得的证据进入同一份档案。</p>
<figure class="flow" aria-label="连续研究流程：研究发现形成工作假设，与新材料一起接受 Jev 复核，提醒经过人工复核和调查后更新档案，再反馈到工作假设。">
    <div class="flow-title">
<span>JEV COWORK / CONTINUOUS RESEARCH</span>Keeping judgments connected to evidence</div>
    <div class="flow-branches">
<div>
<div class="flow-node "><strong>Research findings</strong></div>
<div class="flow-arrow" aria-hidden="true">↓</div>
<div class="flow-node ">
<strong>Working assumptions</strong><span>Judgments and review conditions</span>
</div>
</div>
<div class="source-branch"><div class="flow-node source">
<strong>New source materials</strong><span>New disclosures and evidence</span>
</div></div>
</div>
    <div class="flow-arrow" aria-hidden="true">↓</div>
<div class="flow-node accent">
<strong>Jev: does this merit review?</strong><span>Connect new evidence to active assumptions</span>
</div>
<div class="flow-arrow" aria-hidden="true">↓</div>
    <div class="flow-node "><strong>Source-linked review alerts</strong></div>
<div class="flow-arrow" aria-hidden="true">↓</div>
<div class="flow-node "><strong>Human review &amp; further investigation</strong></div>
<div class="flow-arrow" aria-hidden="true">↓</div>
    <div class="flow-node "><strong>Updated evidence, assumptions &amp; brief</strong></div>
<div class="flow-loop">↳ Continue maintaining working assumptions</div>
  </figure><h3 id="jev-heading-10">CVS：资本配置假设的更新</h3>
<p>2020 年末，CVS 仍有较大的未用回购授权，但第四季度没有执行回购。研究者据此保留一个资本配置假设：公司是否仍在优先保留资本？</p>
<p>后续 2022 年报披露了约 <strong>35 亿美元</strong>的实际回购。系统把这条新材料连接到原有假设，提出复核提醒：回购已经恢复，资本配置判断值得更新。</p>
<figure class="image-figure " id="figure-3"><a href="{{ '/assets/images/jev-cowork/cvs-review.png' | relative_url }}" target="_blank" rel="noopener" class="image-open" aria-label="查看大图：Jev Cowork CVS 案例英文重排：左侧为工作假设，右侧为新披露触发的复核提醒。" title="查看原图"><img src="{{ '/assets/images/jev-cowork/cvs-review.png' | relative_url }}" alt="Jev Cowork CVS 案例英文重排：左侧为工作假设，右侧为新披露触发的复核提醒。" loading="lazy" decoding="async" width="1600" height="760"></a><figcaption>图 3｜依据保存的 CVS 案例翻译并重排：从资本配置假设到回购恢复提醒。Jev 与 DS 均识别了这次更新，提醒获得模型来源支持。</figcaption></figure><p>研究的基本单位由此扩展为<strong>问题、假设与证据之间的关系</strong>。一份报告留下的判断，可以继续参与后续研究。</p>
<h3 id="jev-heading-11">持续监测与调查行动</h3>
<p>连续研究实验覆盖八个公司或法律主题，底库 <strong>397 份完整文档</strong>，每案 256 条候选材料、96 条时序更新，分别测试注意力分配、持续监测与调查行动。</p>
<figure class="image-figure " id="figure-4"><a href="{{ '/assets/images/jev-cowork/continuous-monitoring.png' | relative_url }}" target="_blank" rel="noopener" class="image-open" aria-label="查看大图：持续监测：Jev 的送达提醒来源支持为 12/12，案例平均及时召回为 37.5%；DS 为 7/12 和 41.7%；规则为 2/18 和 4.2%。" title="查看原图"><img src="{{ '/assets/images/jev-cowork/continuous-monitoring.png' | relative_url }}" alt="持续监测：Jev 的送达提醒来源支持为 12/12，案例平均及时召回为 37.5%；DS 为 7/12 和 41.7%；规则为 2/18 和 4.2%。" loading="lazy" decoding="async" width="1600" height="760"></a><figcaption>图 4｜左图为送达提醒的模型来源支持，右图为八案及时召回率的平均。Jev 及时覆盖 5/20 个复核对象；合并召回为 25%，案例等权平均为 37.5%。</figcaption></figure><p>Jev 送出的 <strong>12 条提醒全部获得来源支持</strong>，DS 为 <strong>7/12</strong>，规则为 <strong>2/18</strong>。较高的提醒质量让这个入口值得继续探索。不过，Jev 的案例平均及时召回为 <strong>37.5%</strong>，遗漏仍多，目前适合辅助研究者持续关注。</p>
<p>注意力与调查则更依赖具体的工作流设计。注意力任务在控制通过的六案中，Jev 完整支持 <strong>13/24</strong> 个问题，规则为 <strong>12/24</strong>。调查任务中，Jev 为 <strong>18/32</strong>，规则达到 <strong>20/32</strong>。Block 案例存在预算内完整取证的路径，Jev 实际行动却只充分支持了四个问题中的一个。</p>
<p>这暴露了连续研究更深一层的需求：系统要记得已经解决了什么、还缺什么，并据此选择下一步。判断之间需要有状态。否则，即使每次调用都便宜，大量局部选择也可能重复消耗在同一个问题上。</p>
<h2 id="section-5">5. Jev Cowork：研究协作工作台</h2>
<p><strong>Jev Cowork 目前是一个以案例展示为核心的研究原型。</strong> 它将前述方法组织成可操作的工作台，便于回放已有结果、观察研究流程，并尝试新的材料。当前实现主要围绕本文案例展开，通用性、稳定性与长期使用体验仍有待完善。</p>
<p>项目仓库：<a href="https://github.com/Yii-Jing/Jev-Cowork" rel="noreferrer">Yii-Jing/Jev-Cowork</a>。</p>
<p>仓库以统一的研究档案连接深度研究与连续研究，串联材料导入、证据组织与假设维护，展示这一协作方式的基本形态。</p>
<p>工作台包含五个相互连接的视图：</p>
<div class="table-wrap" tabindex="0" role="region" aria-label="实验比较表"><table>
<thead><tr>
<th>视图</th>
<th class="numeric">主要功能</th>
</tr></thead>
<tbody>
<tr>
<td>深度研究</td>
<td class="numeric">查看证据关系，组织研究议程</td>
</tr>
<tr>
<td>证据队列</td>
<td class="numeric">检索原文，记录阅读与核验状态</td>
</tr>
<tr>
<td>研究简报</td>
<td class="numeric">阅读带引用的报告，对照来源</td>
</tr>
<tr>
<td>持续研究</td>
<td class="numeric">维护工作假设，接收更新与复核提醒</td>
</tr>
<tr>
<td>调查与笔记</td>
<td class="numeric">保存补查线索、研究记录，导出档案</td>
</tr>
</tbody>
</table></div>
<p>仓库内置两组完整示例。3M 示例包含 <strong>136 组保存的 Jev 关系判断</strong>，可以对照议程引导与直接综合生成的研究报告；CVS 示例展示资本配置假设如何与后续披露建立连接。两组示例都可在本地回放，查看原文、判断与报告之间的对应关系。</p>
<p>用户可以导入 TXT、Markdown、JSON 或 PDF 材料，创建自己的研究档案。材料、笔记和运行记录保存在本机，档案支持 Markdown 与 JSON 导出、JSON 恢复。<strong>开展实时模型分析，需要用户提供自己的 Jev API 密钥；生成研究报告还需配置自己的综合模型 API 地址、模型与密钥。</strong> 调用费用由用户所接入的服务收取。</p>
<p>项目采用 Python 3.10+ 与轻量前端，无需 Node 构建，PDF 导入使用可选依赖。未配置 API 时，可浏览保存的示例并使用本地规则整理材料。仓库提供运行说明、模型接入配置、测试及发布脚本，应用代码采用 MIT 许可。</p>
<p>这种组织方式使研究成果能够继续参与后续工作：证据关系进入简报，简报中的发现形成假设，新材料再触发复核与调查。研究档案保留了这一过程的来源与变化。</p>
<h2 id="section-6">6. Inclusive Intelligence：初步探索</h2>
<p>Jev Cowork 指向一种值得进一步研究的智能形态：专业判断以较低成本广泛分布于工作过程，覆盖更多证据关系，并持续参与问题的更新。我们将它称为 <strong>Inclusive Intelligence</strong>。</p>
<p><strong>它首先意味着考虑范围的扩展。</strong> 一次分析能够容纳多少证据、识别多少相互限制的解释，取决于有限注意力如何分配。低成本的局部判断，有机会让较弱的信号、边缘材料和替代解释更早进入研究视野。信息的价值仍需经过来源核验与整体论证，但被认真考虑的机会可以增加。</p>
<p><strong>它也意味着研究能力的可及性。</strong> 持续维护大量问题，通常需要稳定的人力投入。如果判断能够成为轻量、频繁、可组合的操作，个人和小团队就可能以更低成本维持更广的研究覆盖。一个长期问题即使暂时无人主动提问，也可以继续接收相关变化。</p>
<p>这两层含义通过研究状态连接起来。单次判断的价值有限；当它被保存为证据关系、工作假设或复核条件，就能参与未来的判断。深度带来更充分的考虑，连续性保留这些考虑的成果，两者共同构成积累性的研究能力。</p>
<p><strong>本文是对这一方向的初步探索。</strong> 现有结果展示了专业判断、证据组织和持续监测中的若干可用成分，也揭示了从局部判断到完整论证、从提醒到有效调查之间的距离。接下来需要在更长时间的真实工作中观察：系统能否减少重要遗漏，改善调查顺序，并让更多人持续开展原本难以负担的研究。</p>
<p>Jev Cowork 为这些问题提供了一个具体起点。直觉发现线索，推理展开论证，原文提供约束，人保留最后的判断。Inclusive Intelligence 所关心的，是这种协作能够延伸到多大的信息范围、多少人的工作，以及多长的时间。</p>
<hr>
<h2 id="section-7" class="references-heading">参考资料</h2>
<ol>
<li id="reference-1">TypeSafe. <a href="https://docs.typesafe.ai/models" rel="noreferrer">Jev：模型与定价</a>。</li>
<li id="reference-2">TypeSafe. <a href="https://docs.typesafe.ai/confidence" rel="noreferrer">Confidence versus Probability</a>。</li>
</ol>

</div>
