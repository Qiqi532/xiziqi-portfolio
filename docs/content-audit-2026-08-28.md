# 个人主页素材审计（2026-08-28）

## Never publish
- Phone number, WeChat ID, birth date, place of origin
- GPA, rank, course scores, certificate scans
- Unapproved PPT figures, laboratory data, collaborator information, or audience photographs
- 身份证号、学号、证书编号、成绩单验证码及源文件下载链接

## 审计说明

- 本文只记录可提炼为网页文案的候选事实；`intro/` 中的源文件不作为网站公开资源。
- `pending` 表示内容或图片尚未得到用户逐项公开授权，实施时不得写入 `src/data/siteContent.js`，也不得复制到 `public/images/profile/`。
- 两份简历对 GPA、排名存在版本差异，因此全部排除，不采用“较新值”推断。
- 科研数据、图表与论文页面仅用于核验项目和论文身份；首版网页建议使用文字摘要，不发布实验图、完整摘要或论文截图。

## 用户批准记录

- 2026-08-28：用户批准低风险首版内容边界。
- 已采用：两项研究、两篇已发表论文、两项竞赛、校园传播、志愿服务、社会实践及公开邮箱。
- 已采用图片：`hero-portrait.jpg`、`life-basketball.jpg`、`life-great-wall.jpg`、`life-coast.jpg`。
- 暂不采用：在投稿件、平台签约称谓、具体实验指标、证书扫描及含他人肖像照片。

## 两份 PPT 与主 PDF

| Source | Slide/page | Public web claim | Destination | Approval status |
|---|---:|---|---|---|
| `黄新宏-开放日汇报PPT.pptx` | 1 | 姓名；南京大学开放日汇报场景不属于个人主页履历 | Profile name；活动背景不采用 | pending / exclude context |
| `黄新宏-开放日汇报PPT.pptx` | 2 | 中山大学物理与天文学院物理学本科生 | Hero / About | pending |
| `黄新宏-开放日汇报PPT.pptx` | 2 | 年级排名 | 不公开 | excluded |
| `黄新宏-开放日汇报PPT.pptx` | 3 | 英语成绩与“发表英文学术论文” | 具体分数不公开；论文以论文条目呈现 | excluded / pending |
| `黄新宏-开放日汇报PPT.pptx` | 4 | 基础课程名称、学分与分数 | 不公开 | excluded |
| `黄新宏-开放日汇报PPT.pptx` | 5 | 选修课程名称、学分与分数 | 不公开 | excluded |
| `黄新宏-开放日汇报PPT.pptx` | 6 | 两次优秀学生奖学金三等奖、两次优秀共青团员、十五运会优秀志愿者、中山大学二星志愿者 | Research/Practice 荣誉摘要（只写名称，不放证书） | pending |
| `黄新宏-开放日汇报PPT.pptx` | 7 | 校党委宣传部、校团委宣传部、学院新媒体中心经历 | Practice：校园传播 | pending |
| `黄新宏-开放日汇报PPT.pptx` | 7 | 为校级新媒体供稿图片上百张；作品见于《光明日报》《中国国家旅游》等媒体；视觉中国、海丝泉州签约摄影师 | Practice：影像传播 | pending（平台称谓建议逐项确认） |
| `黄新宏-开放日汇报PPT.pptx` | 7 | 2025 年三下乡项目《锦绣连山，针线间的壮乡记忆》获省级“优秀” | Practice：社会实践 | pending |
| `黄新宏-开放日汇报PPT.pptx` | 7 | 十五运会志愿服务；累计志愿时超过 300 小时；中山大学二星志愿者 | Practice：志愿服务 | pending（时长为动态数据） |
| `黄新宏-开放日汇报PPT.pptx` | 7 | 2025 逸仙杯篮球赛男子组冠军、2026 逸仙杯龙舟赛男子组冠军 | About：个人切面 | pending |
| `黄新宏-开放日汇报PPT.pptx` | 8 | 2025 全国大学生数学建模竞赛广东省一等奖，队长 | Research：竞赛 | pending |
| `黄新宏-开放日汇报PPT.pptx` | 8 | 2025 华南大学生物理实验设计大赛省级二等奖，队长 | Research：竞赛 | pending |
| `黄新宏-开放日汇报PPT.pptx` | 8 | 光纤温盐传感大创项目负责人，校级立项并优秀结题 | Research：项目卡 | pending |
| `黄新宏-开放日汇报PPT.pptx` | 8 | 化学奇异星识别大创项目负责人，校级立项、进行中 | Research：项目卡 | pending |
| `黄新宏-开放日汇报PPT.pptx` | 8 | 3 篇论文条目：Measurement 第一作者、Optical Fiber Technology 第三作者、另 1 篇在投 | Research：论文列表 | pending（在投状态需上线前再确认） |
| `黄新宏-开放日汇报PPT.pptx` | 9 | 光纤温盐传感器项目的问题、方法和个人贡献；实验分辨率与弱压力性能数据 | Research：项目摘要；具体实验指标不公开 | pending / exclude metrics |
| `黄新宏-开放日汇报PPT.pptx` | 10 | 谐波游标效应温度传感论文与单管双腔温盐传感论文的核心贡献 | Research：论文摘要 | pending |
| `黄新宏-开放日汇报PPT.pptx` | 11 | 基于 LAMOST DR13、物理特征与机器学习筛选化学奇异星；尝试无监督异常检测 | Research：项目摘要 | pending |
| `黄新宏-开放日汇报PPT.pptx` | 11 | AUROC/AUPRC 等阶段性模型指标与研究图表 | 不公开，除非用户确认数据可披露且仍有效 | excluded |
| `黄新宏-开放日汇报PPT.pptx` | 12 | 结束页，无新增事实 | 不采用 | excluded |
| `中山大学-黄新宏 - 线下交流.pptx` | 1 | 中山大学物理学专业；意向方向“自主视觉感知” | Hero/About；研究兴趣 | pending（意向方向需确认是否仍有效） |
| `中山大学-黄新宏 - 线下交流.pptx` | 2 | 学校、专业、荣誉与研究意向 | 与其他材料交叉核验；GPA、排名、英语、籍贯、政治面貌不公开 | pending / excluded sensitive |
| `中山大学-黄新宏 - 线下交流.pptx` | 3 | 两项竞赛、两项大创、三篇论文 | Research 列表 | pending |
| `中山大学-黄新宏 - 线下交流.pptx` | 4 | 光纤温盐传感项目周期、负责人任务、优秀结题与省级二等奖 | Research：项目详情 | pending |
| `中山大学-黄新宏 - 线下交流.pptx` | 5 | 温度自补偿型光纤弱压力传感装置及光谱解调控制程序 | Research：竞赛项目摘要 | pending（具体性能指标不采用） |
| `中山大学-黄新宏 - 线下交流.pptx` | 6 | Measurement 论文：谐波游标效应相对独立 MZI 提升 13.2 倍 | Research：论文摘要 | pending |
| `中山大学-黄新宏 - 线下交流.pptx` | 7 | PyTorch LHC 顶夸克标记课程项目，对比 CNN 与传统方法 | Research：课程项目/技能 | pending |
| `中山大学-黄新宏 - 线下交流.pptx` | 8-9 | 化学奇异星项目背景、方法、进展与模型指标 | Research：项目摘要；指标不公开 | pending / exclude metrics |
| `中山大学-黄新宏 - 线下交流.pptx` | 10 | 校园传播、志愿服务、奖学金、优秀共青团员、勤工俭学先进个人 | Practice / 荣誉摘要 | pending |
| `中山大学-黄新宏 - 线下交流.pptx` | 11 | 研究生阶段规划 | 不作为当前事实；首版不采用 | excluded |
| `中山大学-黄新宏 - 线下交流.pptx` | 12 | 结束页，无新增事实 | 不采用 | excluded |
| `科研.pdf` | 1 | 教育背景、两项科研项目、两篇已发表论文、两项竞赛、荣誉与公共服务 | 用于交叉核验上述候选文案 | pending |
| `科研.pdf` | 1 | 电话、出生年月、籍贯、性别、GPA、排名、课程成绩 | 不公开 | excluded |
| `实习.pdf` | 1 | 科研、竞赛、校园传播、志愿服务、三下乡项目与摄影平台经历 | Research / Practice 候选摘要 | pending |
| `实习.pdf` | 1 | 电话、出生年月、籍贯、性别、GPA、排名、课程成绩 | 不公开 | excluded |

## 其他资料核验

| Source | Slide/page | Public web claim | Destination | Approval status |
|---|---:|---|---|---|
| `reward/Measurement.pdf` | 1 | 论文 *Enhanced temperature sensing performance of pure silica MZI and FPI sensors using the harmonic Vernier effect*；黄新宏为共同第一作者；Measurement 271 (2026) 120953；DOI `10.1016/j.measurement.2026.120953` | Research：论文条目与外链 | pending |
| `reward/optical fiber Technology .pdf` | 1 | 论文 *Low-crosstalk compact fiber-optic temperature-salt sensor based on dual-cavity functional partitioning design in a single tube*；黄新宏为第三作者；Optical Fiber Technology 98 (2026) 104548；DOI `10.1016/j.yofte.2025.104548` | Research：论文条目与外链 | pending |
| `reward/数模广东省一等奖.pdf` | 1 | 2025 全国大学生数学建模竞赛本科组广东省一等奖；B 题“碳化硅外延层厚度的确定” | Research：竞赛条目 | pending |
| `reward/华南大学生物理实验竞赛二等奖.pdf` | 1 | 证书图像可佐证省级二等奖 | 只核验，不展示证书 | pending / exclude scan |
| `reward/全运会志愿者.pdf` | 1 | 证书图像可佐证十五运会志愿经历 | Practice 文案核验；不展示证书 | pending / exclude scan |
| `reward/中山大学二星级志愿者.pdf` | 1 | 证书图像可佐证二星志愿者 | Practice 文案核验；不展示证书 | pending / exclude scan |
| `reward/奖学金2024.pdf`、`reward/奖学金2023.jpg` | 1 | 奖学金经历 | 荣誉摘要；不展示证书 | pending / exclude scan |
| `reward/优秀共青团员2023.jpg`、`reward/优秀共青团员2024.jpg` | 1 | 优秀共青团员经历 | 荣誉摘要；不展示证书 | pending / exclude scan |
| `reward/全国物理实验研讨会科研论文一等奖.jpg` | 1 | 奖项名称与当前 PPT/简历叙述未完全对应 | 暂不采用，需用户说明对应成果与年份 | pending clarification |
| `reward/CET46.pdf` | 1-2 | CET 成绩单含证件号等敏感信息 | 不公开、不展示、不链接 | excluded |
| `reward/获奖合集.pdf` | 1-13 | 含成绩单、身份证明、论文首页、证书扫描与验证码 | 仅作核验，不展示、不链接 | excluded as asset |
| `reward/千年古树的现代生存密码-光明日报-光明网_files/` | — | 网页离线资源可能佐证媒体采用或摄影实践 | 首版不直接发布；需找到原始文章页及署名关系后再决定 | pending clarification |

## 候选公开图片（尚未复制）

| Source | Slide/page | Public web claim | Destination | Approval status |
|---|---:|---|---|---|
| `pic/证件照.jpg` | image | 正面证件肖像；alt：`黄新宏的正面肖像` | `public/images/profile/hero-portrait.jpg` | pending（推荐 hero） |
| `pic/三下乡.JPG` | image | 社会实践现场；含其他人物；alt：`黄新宏参加社会实践交流活动` | `public/images/profile/practice-fieldwork.jpg` | pending（需确认他人肖像授权） |
| `pic/篮球赛 (1).jpg` | image | 校园篮球活动；alt：`黄新宏参加校园篮球赛` | `public/images/profile/life-basketball.jpg` | pending |
| `pic/光电会议.jpg` | image | 学术会议现场；含其他人物；alt：`黄新宏参加光电学术会议` | `public/images/profile/life-conference.jpg` | pending（需确认他人肖像授权） |
| `pic/长城.jpg` | image | 长城旅行切面；alt：`黄新宏在长城旅行` | `public/images/profile/life-great-wall.jpg` | pending |
| `pic/20251003-DSC_1575.jpg` | image | 海边环境人像；alt：`黄新宏在海边观看日落` | `public/images/profile/life-coast.jpg` | pending（可作为 hero 的环境人像备选） |

未列入首版候选：`北京.jpg`、`杭州.jpg`、`南京.png`、`泉州.jpg`、`香港.jpg`。这些照片构图可用，但与现有候选表达重复；遵循首版最多 1 张 hero、2 张实践、3 张个人切面图片的限制。

## 建议首版公开文案边界

若用户批准，可使用以下低风险、可核验的精简表述：

1. **身份：** 中山大学物理与天文学院物理学本科生，关注光纤传感、天文光谱与机器学习，也持续参与校园传播、志愿服务和摄影创作。
2. **光纤传感：** 负责人参与海水温度—盐度同步测量光纤传感项目，完成传感结构研究、光场仿真与光谱解调控制程序，项目优秀结题。
3. **化学奇异星：** 基于 LAMOST DR13 光谱，探索物理特征、机器学习与无监督异常检测相结合的化学奇异星识别方法；项目进行中。
4. **论文：** 列出两篇已发表论文的标准题名、作者位次、期刊、年份和 DOI；在投稿件不在首版列出，除非上线前再次确认状态。
5. **实践：** 用“校园传播 / 志愿服务 / 社会实践”三条代表经历概括，不公开证书图片、志愿系统截图或活动参与者合照。

## 待用户批准或澄清

- 是否批准上述 1-5 条精简文案整体作为首版内容基线。
- 论文作者身份是否采用“共同第一作者”而不是 PPT 中的“第一作者”。论文首页带共同贡献标记，建议用更准确的“共同第一作者”。
- “视觉中国签约摄影师”“海丝泉州签约摄影师”“中国国家旅游采用”等平台/媒体表述是否公开，并是否有稳定的公开链接。
- “自主视觉感知”是否仍是当前研究意向；若不是，首页只写已开展的光纤传感与天文光谱方向。
- 在投稿论文是否暂缓展示（推荐暂缓）。
- 从 6 张候选图片中批准具体图片；含他人肖像的 `三下乡.JPG` 与 `光电会议.jpg` 需额外确认公开授权。
