/* ═════════════════════════════════════════════════════════════
   Radius Assistant — knowledge base
   ═════════════════════════════════════════════════════════════
   ADD YOUR OWN ANSWERS HERE — no other file needs to change.

   Each entry in INTENTS:
     keywords : words/phrases matched against the visitor's
                message (case-insensitive, whole words only).
                The entry with the MOST keyword hits wins;
                on a tie, the one EARLIER in this list wins —
                so keep specific topics above generic ones.
     reply    : the assistant's answer (plain text).
     showHandoff : true → show "Email us" / "WhatsApp" buttons
                under the reply.

   Example — add a new answer:
     {
       keywords: ['office', 'location', 'where are you based'],
       reply: 'We are headquartered in Kochi, India, serving clients worldwide.',
     },
   ═════════════════════════════════════════════════════════════ */

export const CONTACT = {
  email: 'hello@radiuscorelabs.com',
  whatsapp:
    'https://wa.me/919847099911?text=' +
    encodeURIComponent("Hi Radius Core, I'd like to chat about telecom testing."),
};

export const INTENTS = [

  /* ── Careers ─────────────────────────────────────────────── */
  {
    keywords: ['hiring', 'hire', 'career', 'careers', 'job', 'jobs', 'vacancy', 'vacancies', 'opening', 'openings', 'recruit', 'recruitment', 'apply', 'cv', 'resume', 'work with you', 'work for you', 'join your team', 'join the team'],
    reply:
      'Yes — we\'re always looking for good engineers! We hire both students/graduates and experienced professionals across 4G, 5G, IMS, Packet Core, Cloud, and AI. Visit our Careers page (top navigation) to learn more, or email your CV to ' +
      CONTACT.email + '.',
  },
  {
    keywords: ['intern', 'internship', 'graduate', 'graduates', 'fresher', 'freshers', 'student', 'students', 'campus', 'entry level', 'no experience'],
    reply:
      'We welcome students and fresh graduates! You\'ll work on cutting-edge telecom technologies (4G, 5G, IMS, Packet Core, Cloud, AI) and learn from experienced engineers through structured mentoring, hands-on projects, and our Innovation Lab. Send your CV to ' +
      CONTACT.email + '.',
  },
  {
    keywords: ['experienced professional', 'senior', 'lead', 'architect', 'years of experience', 'experienced role'],
    reply:
      'For experienced professionals we offer roles where you can lead innovation, mentor future engineers, and shape next-generation communication technologies — serving operators, MVNOs, vendors, and enterprises worldwide. Email ' +
      CONTACT.email + ' with your profile.',
  },
  {
    keywords: ['remote', 'work from home', 'wfh', 'hybrid', 'onsite', 'relocation'],
    reply:
      'Work arrangements depend on the role and project. The best way to find out is to ask us directly — email ' +
      CONTACT.email + ' and mention the role you\'re interested in.',
    showHandoff: true,
  },
  {
    keywords: ['salary', 'pay', 'compensation', 'package', 'ctc', 'benefits', 'perks'],
    reply:
      'Compensation depends on the role, experience, and location — we keep it competitive with the market. For specifics, email ' +
      CONTACT.email + ' about the role you have in mind.',
  },
  {
    keywords: ['interview', 'hiring process', 'recruitment process', 'selection process', 'how to apply'],
    reply:
      'To apply, email your CV to ' + CONTACT.email +
      ' or use the Careers page. Our process is straightforward: an intro conversation, a technical discussion matched to your experience level, and a final chat with the team.',
  },

  /* ── Services — specific first ───────────────────────────── */
  {
    keywords: ['managed test', 'taas', 'test as a service', 'testing as a service', 'managed services', 'outsource', 'outsourcing'],
    reply:
      'Our Managed Test Services and TAAS (Testing-as-a-Service) let you hand your entire test operation to us — we run the lab, the automation, and the reporting, so your team can focus on the network. Email ' +
      CONTACT.email + ' for a scoping call.',
  },
  {
    keywords: ['5g', 'core network', 'sa', 'nsa', 'slice', 'slicing', 'standalone'],
    reply:
      'Our 5G Core practice covers end-to-end SA/NSA core testing, network-slice validation, and performance assurance — from lab validation through pre-production sign-off.',
  },
  {
    keywords: ['4g', 'lte', 'epc', 'packet core', 'diameter', 'gtp', 'pfcp', 'sctp'],
    reply:
      'We have deep EPC and packet-core expertise: 4G/LTE core validation, Diameter, GTP, PFCP and SCTP protocol testing, and interop across vendors.',
  },
  {
    keywords: ['ims', 'volte', 'vilte', 'vowifi', 'voice', 'sms', 'call', 'calling', 'sip', 'srvcc', 'emergency calling', 'rcs'],
    reply:
      'We do comprehensive IMS and voice-service testing: VoLTE, ViLTE, VoWiFi, SMS, RCS, SIP, SRVCC, and emergency calling — interop and regression across vendors.',
  },
  {
    keywords: ['roaming', 'interop', 'plmn', 'steering', 'interworking', 'ir testing', 'international'],
    reply:
      'We validate international and inter-PLMN roaming: LTE/VoLTE/5G roaming, steering, interworking, and IR testing with partner assurance.',
  },
  {
    keywords: ['automation', 'automate', 'ci/cd', 'cicd', 'pipeline', 'robot framework', 'jenkins', 'gitlab', 'python', 'framework', 'scripting'],
    reply:
      'We build CI/CD-native telecom test automation using Python, Robot Framework, Jenkins, GitLab, and REST APIs — reducing manual effort and speeding up releases. Around 95% of our test execution is automated.',
  },
  {
    keywords: ['performance', 'load', 'stress', 'capacity', 'benchmark', 'benchmarking', 'latency', 'throughput', 'kpi', 'scale'],
    reply:
      'Our performance practice covers load, stress, and capacity benchmarking at scale — latency, throughput, and KPI validation for optimal network performance.',
  },
  {
    keywords: ['cloud', 'kubernetes', 'k8s', 'docker', 'aws', 'azure', 'openshift', 'helm', 'cloud-native', 'container', 'containers'],
    reply:
      'We validate cloud-native telecom deployments on Kubernetes, Docker, OpenShift, AWS, and Azure — including Helm-based deployment testing.',
  },
  {
    keywords: ['compliance', 'audit', 'regulatory', 'certification', '3gpp', 'standard', 'standards', 'acceptance'],
    reply:
      'We provide regulatory compliance testing and network audit for quality assurance — validating against 3GPP standards and operator acceptance criteria.',
  },
  {
    keywords: ['consulting', 'consultancy', 'advisory', 'strategy', 'lab design', 'release readiness', 'vendor acceptance'],
    reply:
      'Our consulting covers QA strategy, lab design, automation strategy, vendor acceptance, and release-readiness advisory — engineering-first guidance from people who\'ve run these networks.',
  },
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml'],
    reply:
      'AI is one of the technology areas our engineers work with — from intelligent test optimization to future products in our RC Labs innovation arm. Ask us about specifics at ' +
      CONTACT.email + '.',
  },
  {
    keywords: ['rc labs', 'future products', 'innovation lab', 'products', 'product'],
    reply:
      'RC Labs is our innovation arm — we\'re investing in next-generation telecom engineering products and intellectual property that goes beyond pure services. Watch this space, or ask us at ' +
      CONTACT.email + '.',
  },
  {
    keywords: ['iot', 'automotive', 'connected car', 'm2m', 'devices'],
    reply:
      'Automotive & IoT is one of the verticals we serve — validating connectivity, roaming, and core-network behavior for connected devices at scale.',
  },
  {
    keywords: ['mvno', 'mvne', 'greenfield', 'launch', 'startup', 'new operator'],
    reply:
      'We help greenfield MVNOs and startups launch with confidence — end-to-end validation of your core, IMS, and roaming before go-live, plus ongoing regression as you grow. From launch to tier-1 scale, we\'ve done it across 4 continents.',
  },

  /* ── Services — generic ──────────────────────────────────── */
  {
    keywords: ['service', 'services', 'testing', 'test', 'what do you offer', 'validation', 'qa', 'what do you do', 'capabilities', 'expertise'],
    reply:
      'We provide end-to-end telecom testing: 5G Core (SA/NSA) validation, EPC testing, IMS & VoLTE, international roaming, network performance and load testing, test automation, compliance & audit, and consulting. Which area are you interested in?',
  },
  {
    keywords: ['technology', 'technologies', 'stack', 'tools', 'protocols', 'tech'],
    reply:
      'Our coverage spans radio & access (4G LTE, 5G SA/NSA), core & IMS (VoLTE, VoWiFi), protocols & APIs (Diameter, SIP, GTP, PFCP, HTTP/2, REST), cloud & infra (Kubernetes, Docker, AWS, Azure, OpenShift), and automation tooling (Python, Robot Framework, Jenkins, GitLab, Ansible, Prometheus, Grafana).',
  },
  {
    keywords: ['industry', 'industries', 'operator', 'operators', 'enterprise', 'vendor', 'vendors', 'clients', 'customers', 'who do you work', 'verticals'],
    reply:
      'We work with mobile network operators, MVNOs & MVNEs, equipment vendors, enterprises, cloud providers, telecom startups, and automotive & IoT players — from greenfield MVNOs to tier-1 carriers across 4 continents.',
  },

  /* ── How we work ─────────────────────────────────────────── */
  {
    keywords: ['process', 'methodology', 'how do you work', 'approach', 'delivery', 'workflow', 'lifecycle'],
    reply:
      'Our delivery process is engineering-first and structured in six steps: Discover → Plan → Design Test Strategy → Validate → Automate → Deliver. We move from discovery to continuous validation, with clear reporting throughout.',
  },
  {
    keywords: ['engagement', 'engagement model', 'dedicated team', 'project based', 'retainer', 'contract'],
    reply:
      'We offer flexible engagement models: fully managed test services (TAAS), dedicated test teams embedded with yours, and fixed-scope project delivery. Email ' +
      CONTACT.email + ' and we\'ll recommend the right fit.',
  },
  {
    keywords: ['nda', 'confidential', 'confidentiality', 'security', 'data protection', 'privacy', 'ip protection'],
    reply:
      'Absolutely — we routinely work under NDA and treat customer network data, configurations, and results as strictly confidential. Happy to sign your NDA before any technical discussion; reach us at ' +
      CONTACT.email + '.',
  },
  {
    keywords: ['report', 'reports', 'reporting', 'dashboard', 'results', 'deliverables', 'documentation'],
    reply:
      'Every engagement includes clear deliverables: test plans, execution reports, defect analysis, KPI dashboards, and release-readiness summaries — so your stakeholders always know where quality stands.',
  },
  {
    keywords: ['quality', 'defect', 'detection rate', 'metrics', 'track record', 'results you achieved'],
    reply:
      'Some numbers we\'re proud of: 99.9% defect detection rate, 2× faster releases for our clients, ~95% test automation, 50+ operators served, and 12+ years of experience.',
  },
  {
    keywords: ['vendor neutral', 'independent', 'third party', 'unbiased', 'objective'],
    reply:
      'We\'re fully vendor-neutral: independent validation across multiple platforms and vendors, so you get objective results your team can trust.',
  },
  {
    keywords: ['tools you use', 'lab', 'test lab', 'equipment', 'simulators', 'test tools'],
    reply:
      'We combine industry-standard test tools with our own automation frameworks (Python, Robot Framework) and protocol-level tooling for Diameter, SIP, GTP, and PFCP — plus cloud labs on Kubernetes, AWS, and Azure. Tell us your setup and we\'ll match it: ' +
      CONTACT.email + '.',
  },
  {
    keywords: ['how long', 'timeline', 'duration', 'turnaround', 'onboarding', 'start', 'kick off', 'kickoff'],
    reply:
      'Timelines depend on scope — a focused validation can start within days, while a full managed-test setup typically takes a few weeks to stand up. Email ' +
      CONTACT.email + ' with your target dates and we\'ll confirm feasibility.',
  },

  /* ── Company ─────────────────────────────────────────────── */
  {
    keywords: ['about', 'company', 'who are you', 'founded', 'mission', 'vision', 'history', 'background'],
    reply:
      'Radius Core Labs is a specialized telecom engineering company founded by telecom engineers, with 12+ years of experience and 50+ operators served. Our mission: make telecom testing rigorous, automated, and accessible — eliminating network failures before they reach production. Our vision: a world where every packet is trusted.',
  },
  {
    keywords: ['team', 'people', 'engineers', 'staff', 'who works'],
    reply:
      'Our people are seasoned telecom engineers with hands-on experience across major operators, equipment vendors, and standards bodies — built by engineers, for engineers.',
  },
  {
    keywords: ['location', 'located', 'office', 'where are you', 'based', 'country', 'countries', 'address', 'headquarters'],
    reply:
      'We serve operators across 4 continents — from greenfield MVNOs to tier-1 carriers. For office and meeting details, drop us a line at ' +
      CONTACT.email + '.',
    showHandoff: true,
  },
  {
    keywords: ['why choose', 'choose you', 'why you', 'different', 'differentiator', 'better', 'compare', 'competitor', 'usp', 'advantage'],
    reply:
      'Six reasons clients choose us: deep telecom expertise (protocols to production), engineering-led delivery, global standards alignment, automation-first mindset, independent vendor-neutral validation, and trusted long-term partnership — we\'re a partner, not a one-off vendor.',
  },
  {
    keywords: ['website', 'linkedin', 'twitter', 'github', 'social', 'follow'],
    reply:
      'You\'re already on our website! You can also find us on LinkedIn, Twitter/X, and GitHub — links are in the footer below.',
  },

  /* ── Commercial ──────────────────────────────────────────── */
  {
    keywords: ['price', 'pricing', 'cost', 'quote', 'quotation', 'rate', 'rates', 'budget', 'how much', 'charges', 'fees'],
    reply:
      'Pricing depends on scope — network type, test coverage, and duration. Email us at ' +
      CONTACT.email +
      " with a short description of your project and we'll get back with a tailored quote.",
  },
  {
    keywords: ['demo', 'trial', 'poc', 'proof of concept', 'pilot', 'sample'],
    reply:
      'We\'re happy to start small — a scoped pilot or proof-of-concept is a great way to see how we work before committing. Email ' +
      CONTACT.email + ' and tell us what you\'d like to validate.',
    showHandoff: true,
  },
  {
    keywords: ['rfp', 'rfq', 'proposal', 'tender', 'bid'],
    reply:
      'We respond to RFPs/RFQs regularly. Send the documents to ' +
      CONTACT.email + ' and our solutions team will take it from there.',
  },
  {
    keywords: ['meeting', 'schedule', 'book', 'appointment', 'discuss', 'intro call', 'connect with'],
    reply:
      'Let\'s set something up! Email ' + CONTACT.email +
      ' with a couple of time slots that work for you (and your timezone), or ping us on WhatsApp — we\'ll confirm quickly.',
    showHandoff: true,
  },
  {
    keywords: ['partner', 'partnership', 'collaborate', 'collaboration', 'work together', 'reseller', 'alliance'],
    reply:
      'We\'d love to explore working together. We offer flexible engagement models — managed services, dedicated teams, and project-based delivery. Drop a line to ' +
      CONTACT.email + ' and we\'ll set up an intro call.',
    showHandoff: true,
  },

  /* ── Contact ─────────────────────────────────────────────── */
  {
    keywords: ['contact', 'email', 'reach', 'talk', 'human', 'agent', 'person', 'phone', 'number', 'whatsapp', 'sales', 'support', 'get in touch', 'call you'],
    reply:
      'You can reach the team at ' +
      CONTACT.email +
      ', or chat with a human on WhatsApp using the button below. We usually respond within one business day.',
    showHandoff: true,
  },
  {
    keywords: ['response time', 'how fast', 'how soon', 'when will you reply', 'reply time'],
    reply:
      'We usually respond within one business day — often much faster. For anything urgent, WhatsApp is the quickest route.',
    showHandoff: true,
  },

  /* ── Small talk & meta (keep near the bottom) ────────────── */
  {
    keywords: ['are you a bot', 'are you ai', 'are you human', 'are you real', 'chatbot', 'robot', 'who made you'],
    reply:
      'I\'m the Radius Core website assistant — a friendly bot with instant answers about our services, careers, and how to reach the team. For anything I can\'t handle, a real human is one click away below. 🤖',
    showHandoff: true,
  },
  {
    keywords: ['help', 'what can you do', 'options', 'menu', 'faq'],
    reply:
      'I can tell you about our testing services (5G, IMS, roaming, automation, performance, cloud), the industries we serve, our technology stack, careers and hiring, pricing and engagement models, and how to contact the team. What would you like to know?',
  },
  {
    keywords: ['how are you', 'whats up', "what's up", 'how is it going'],
    reply: 'Doing great and ready to help! 😊 What would you like to know about Radius Core Labs?',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'hai', 'good morning', 'good afternoon', 'good evening', 'greetings', 'namaste'],
    reply:
      "Hello! 👋 I'm the Radius Core assistant. Ask me about our testing services, the industries and technologies we cover, careers, or how to get in touch.",
  },
  {
    keywords: ['thank', 'thanks', 'great', 'awesome', 'perfect', 'nice', 'cool', 'bye', 'goodbye', 'ok', 'okay', 'see you'],
    reply: "You're welcome! If anything else comes up, I'm right here. 😊",
  },
];

export const FALLBACK = {
  reply:
    "I'm not sure about that one — I can help with our services, industries, technologies, careers, pricing, and contact details. For anything else, the team is happy to help directly:",
  showHandoff: true,
};

export const QUICK_QUESTIONS = [
  'What services do you offer?',
  'Which industries do you serve?',
  'Are you hiring?',
  'How do I contact the team?',
];

/* Whole-word, case-insensitive matching.
   "hi" no longer matches inside "hiring". */
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function matchIntent(text) {
  let best = FALLBACK;
  let bestScore = 0;
  for (const intent of INTENTS) {
    let score = 0;
    for (const k of intent.keywords) {
      // Optional trailing "s" so singular keywords match plurals (mvno → mvnos).
      if (new RegExp(`\\b${escapeRegex(k)}s?\\b`, 'i').test(text)) {
        // Multi-word phrases are more specific — count each word.
        score += k.split(' ').length;
      }
    }
    if (score > bestScore) { best = intent; bestScore = score; }
  }
  return best;
}
