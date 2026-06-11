import type { Lang } from "./i18n";

const en = {
  nav: {
    services: "Services",
    experience: "Experience",
    stylists: "Stylists",
    gallery: "Gallery",
    visit: "Visit",
    bookNow: "Book now",
    book: "Book",
  },
  hero: {
    eyebrow: "Seasons Place · City of Industry",
    h1: "Leave looking like the best version of you.",
    sub: "Precision cuts, dimensional color and silk-finish treatments in a marble-and-gold studio — open every day, 10:30 to 7.",
    cta: "Reserve your chair",
    ctaSecondary: "View services",
    trust:
      "Open 7 days  ·  Walk-ins welcome, appointments first  ·  Inside Seasons Place",
  },
  services: {
    eyebrow: "The service menu",
    h2: "Every appointment begins in the chair, not the chart.",
    intro:
      "A consultation comes first — your hair, your face shape, your routine. Pricing is quoted up front, before a single snip.",
    bookThis: "Book this →",
    items: [
      {
        title: "Women's cuts & styling",
        blurb:
          "Shape that grows out gracefully. Cuts, restyles and event styling finished with a signature blowout.",
      },
      {
        title: "Men's & kids' cuts",
        blurb:
          "Sharp fades, classic scissor work and patient first haircuts. In style at every age.",
      },
      {
        title: "Color & balayage",
        blurb:
          "Lived-in blonde, glossy brunette, dimensional balayage and fashion shades — built to flatter your skin tone and your schedule.",
      },
      {
        title: "Perms & waves",
        blurb:
          "Soft digital perms and modern waves that add movement, not frizz. Set it and forget the curling iron.",
      },
      {
        title: "Treatments & keratin",
        blurb:
          "Repair rituals, scalp care and smoothing keratin that leave hair silk to the touch for months.",
      },
      {
        title: "Extensions",
        blurb:
          "Length and fullness that match seamlessly — premium hair, invisible placement, zero damage.",
      },
    ],
  },
  experience: {
    eyebrow: "The experience",
    h2: "A salon that looks the way you want to feel",
    body: "Marble walls, gold-arched mirrors and a few famous art toys keep you company while you transform. But the real luxury is the attention: unhurried consultations, meticulous sectioning, and stylists who remember how you like your fringe.",
    points: [
      {
        title: "Consultation first",
        body: "We listen before we lift a pair of scissors.",
      },
      {
        title: "Quality products",
        body: "Professional color lines and treatment systems we trust on our own hair.",
      },
      {
        title: "Seven days a week",
        body: "Open daily 10:30–7, because good hair days shouldn't wait for one.",
      },
    ],
  },
  stylists: {
    eyebrow: "Stylists",
    h2: "The artists behind the chair",
    team: [
      {
        name: "Jade",
        role: "Color specialist",
        bio: "Known for icy blondes and seamless balayage — the colorist behind many of the transformations on our wall.",
      },
      {
        name: "John",
        role: "Senior stylist",
        bio: "Precision scissor work and clean, modern shapes — the cut that still falls into place weeks later.",
      },
      {
        name: "Ryan",
        role: "Stylist",
        bio: "Sharp fades, textured crops and effortless everyday styling for him and her.",
      },
      {
        name: "Anckley",
        role: "Stylist",
        bio: "Soft perms, silky treatments and blowouts that hold — hair that moves the way you want it to.",
      },
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    h2: "Inside the studio",
    sub: "The marble, the gold arches, the art. Then come sit for the real thing.",
    spaceLabel: "The space",
    workLabel: "Recent work",
  },
  visit: {
    eyebrow: "Visit",
    h2: "Find us at Seasons Place",
    addressLabel: "Address",
    landmark: "Inside the Seasons Place plaza — free parking right outside.",
    hoursLabel: "Hours",
    hours: "Open every day · 10:30 AM – 7:00 PM",
    emailLabel: "Email",
    directions: "Get directions",
    mapTitle:
      "Map showing InStyle Hair Salon at Seasons Place, City of Industry",
  },
  booking: {
    eyebrow: "Reservations",
    h2: "Book your appointment",
    sub: "Tell us what you'd like and when works for you — we'll confirm by email or text, usually within a few hours.",
    name: "Your name",
    namePlaceholder: "Jane Lee",
    contact: "Phone or email",
    contactPlaceholder: "However you'd like us to confirm",
    service: "Service",
    chooseService: "Choose a service",
    stylist: "Preferred stylist",
    noPreference: "No preference",
    date: "Preferred date",
    time: "Preferred time",
    chooseTime: "Choose a time",
    notes: "Notes",
    notesPlaceholder:
      "Anything we should know — hair length, inspo photos coming, first visit…",
    submit: "Request appointment",
    sending: "Sending…",
    reassurance:
      "No payment, no commitment — this is just a request. We confirm every appointment personally before it's set.",
    successTitle: "Request received",
    successSub:
      "Keep an eye on your phone or inbox — we usually reply within a few hours during opening times.",
    another: "Make another request",
    error:
      "Something went wrong sending your request. Please try again, or email us at admin@krontabs.com.",
    serviceOptions: {
      "Women's cut": "Women's cut",
      "Men's cut": "Men's cut",
      "Kids' cut": "Kids' cut",
      "Blowout / styling": "Blowout / styling",
      "Color / balayage": "Color / balayage",
      Perm: "Perm",
      "Treatment / keratin": "Treatment / keratin",
      Extensions: "Extensions",
      "Not sure yet": "Not sure yet",
    } as Record<string, string>,
    timeOptions: {
      "Morning (10:30–12)": "Morning (10:30–12)",
      "Early afternoon (12–3)": "Early afternoon (12–3)",
      "Late afternoon (3–5)": "Late afternoon (3–5)",
      "Evening (5–7)": "Evening (5–7)",
    } as Record<string, string>,
  },
  footer: {
    tagline: "Walk in. Leave in style.",
    hours: "Every day 10:30–7",
    rights: "All rights reserved.",
  },
};

export type Translation = typeof en;

const zh: Translation = {
  nav: {
    services: "服务项目",
    experience: "沙龙体验",
    stylists: "发型师",
    gallery: "店内实拍",
    visit: "到店指南",
    bookNow: "立即预约",
    book: "预约",
  },
  hero: {
    eyebrow: "四季广场 · 工业市",
    h1: "走出门，遇见状态最好的自己。",
    sub: "精剪、立体染发与丝滑护理，尽在大理石与金色交织的高端沙龙——每天营业，10:30 至 7:00。",
    cta: "立即预约",
    ctaSecondary: "查看服务",
    trust: "每周 7 天营业  ·  欢迎随到随剪，预约优先  ·  位于四季广场",
  },
  services: {
    eyebrow: "服务菜单",
    h2: "每次服务，都从椅子上的沟通开始。",
    intro:
      "每次预约都从面对面咨询开始——您的发质、脸型与日常习惯。动剪之前，价格透明报价。",
    bookThis: "预约此项 →",
    items: [
      {
        title: "女士剪发与造型",
        blurb: "长出来也依然好看的层次。剪发、改造与活动造型，以招牌吹整收尾。",
      },
      {
        title: "男士与儿童剪发",
        blurb: "利落渐变、经典剪裁，以及耐心的人生第一剪。任何年龄都有型。",
      },
      {
        title: "染发与挑染",
        blurb:
          "慵懒金、质感棕、立体挑染与时尚色——既衬肤色，也贴合您的日常。",
      },
      {
        title: "烫发与卷度",
        blurb: "柔软数码烫与自然卷度，只增动感、不增毛躁。从此告别卷发棒。",
      },
      {
        title: "护理与角蛋白",
        blurb: "深层修护、头皮护理与柔顺角蛋白，丝滑触感持续数月。",
      },
      {
        title: "接发",
        blurb: "无缝衔接的长度与丰盈——优质发丝、隐形贴合、零损伤。",
      },
    ],
  },
  experience: {
    eyebrow: "沙龙体验",
    h2: "这里的样子，正是你想要的感觉",
    body: "大理石墙面、金色拱形镜，还有几只人气艺术玩偶陪你蜕变。但真正的奢华在于用心：不赶时间的咨询、一丝不苟的分区操作，以及记得你刘海偏好的发型师。",
    points: [
      { title: "咨询优先", body: "动剪之前，我们先倾听。" },
      {
        title: "优质产品",
        body: "我们自己也在用的专业染发与护理系统。",
      },
      {
        title: "每周七天",
        body: "每天 10:30–7:00 营业，好发型不必等待。",
      },
    ],
  },
  stylists: {
    eyebrow: "发型师",
    h2: "椅子背后的艺术家",
    team: [
      {
        name: "Jade",
        role: "染发专家",
        bio: "以冰感金与无痕挑染著称——墙上许多蜕变之作都出自她手。",
      },
      {
        name: "John",
        role: "资深发型师",
        bio: "精准剪裁与干净利落的现代轮廓——几周后依然服帖有型。",
      },
      {
        name: "Ryan",
        role: "发型师",
        bio: "利落渐变、纹理短发与轻松日常造型，男女皆宜。",
      },
      {
        name: "Anckley",
        role: "发型师",
        bio: "柔软烫发、丝滑护理与持久吹整——让头发随心而动。",
      },
    ],
  },
  gallery: {
    eyebrow: "店内实拍",
    h2: "走进 InStyle",
    sub: "大理石、金色拱门与艺术——然后来亲自体验。",
    spaceLabel: "沙龙空间",
    workLabel: "近期作品",
  },
  visit: {
    eyebrow: "到店指南",
    h2: "在四季广场找到我们",
    addressLabel: "地址",
    landmark: "位于四季广场内——门口免费停车。",
    hoursLabel: "营业时间",
    hours: "每天营业 · 上午 10:30 – 晚上 7:00",
    emailLabel: "邮箱",
    directions: "导航前往",
    mapTitle: "InStyle 美发沙龙地图——工业市四季广场",
  },
  booking: {
    eyebrow: "在线预约",
    h2: "预约您的专属时间",
    sub: "告诉我们您想做的项目和方便的时间——我们会通过邮件或短信确认，通常几小时内回复。",
    name: "您的姓名",
    namePlaceholder: "王小姐",
    contact: "手机或邮箱",
    contactPlaceholder: "方便我们确认的联系方式",
    service: "服务项目",
    chooseService: "请选择服务",
    stylist: "指定发型师",
    noPreference: "不指定",
    date: "期望日期",
    time: "期望时间",
    chooseTime: "请选择时间段",
    notes: "备注",
    notesPlaceholder: "想让我们提前了解的——发长、参考图、第一次来…",
    submit: "提交预约申请",
    sending: "发送中…",
    reassurance:
      "无需付款、无需承诺——这只是预约申请，我们会逐一亲自确认后才算预约成功。",
    successTitle: "已收到您的预约申请",
    successSub: "请留意手机或邮箱——营业时间内通常几小时内回复。",
    another: "再提交一个预约",
    error: "发送失败，请重试，或直接发送邮件至 admin@krontabs.com。",
    serviceOptions: {
      "Women's cut": "女士剪发",
      "Men's cut": "男士剪发",
      "Kids' cut": "儿童剪发",
      "Blowout / styling": "吹整造型",
      "Color / balayage": "染发 / 挑染",
      Perm: "烫发",
      "Treatment / keratin": "护理 / 角蛋白",
      Extensions: "接发",
      "Not sure yet": "还不确定",
    },
    timeOptions: {
      "Morning (10:30–12)": "上午（10:30–12:00）",
      "Early afternoon (12–3)": "午后（12:00–3:00）",
      "Late afternoon (3–5)": "下午（3:00–5:00）",
      "Evening (5–7)": "傍晚（5:00–7:00）",
    },
  },
  footer: {
    tagline: "走进来，带着风格离开。",
    hours: "每天 10:30–7:00",
    rights: "版权所有。",
  },
};

export const translations: Record<Lang, Translation> = { en, zh };
