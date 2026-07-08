import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AutoSlider from './AutoSlider.jsx';
import { useReveal, Logo, Tag, ArrowRight, PrimaryBtn, SectionLabel, NAV_LINKS } from './siteShared.jsx';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const SERVICES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'Telecom Testing',
    desc: 'Complete validation across telecom technologies.',
    tags: ['Functional Validation', 'Integration Testing', 'Regression', 'Acceptance Testing'],
    accent: 'from-blue-500/20 to-blue-600/5',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: '5G Core',
    desc: 'Validate every component of the 5G ecosystem.',
    tags: ['AMF', 'SMF', 'UPF', 'NRF', 'UDM', 'UDR', 'AUSF', 'PCF', 'NSSF', 'NEF', 'SBA'],
    accent: 'from-brand/20 to-brand/5',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h7" />
      </svg>
    ),
    title: 'Packet Core',
    desc: 'Complete LTE EPC validation across all core elements.',
    tags: ['MME', 'SGW', 'PGW', 'HSS', 'PCRF', 'OCS', 'DRA', 'Charging'],
    accent: 'from-violet-500/20 to-violet-600/5',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'IMS & Voice',
    desc: 'Full IMS stack and voice service validation.',
    tags: ['VoLTE', 'VoWiFi', 'IMS', 'SMS', 'SIP', 'SRVCC', 'Emergency Calling'],
    accent: 'from-rose-500/20 to-rose-600/5',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Roaming',
    desc: 'International and inter-PLMN roaming validation.',
    tags: ['LTE Roaming', 'VoLTE Roaming', '5G Roaming', 'Steering', 'Interworking', 'IR Testing'],
    accent: 'from-sky-500/20 to-sky-600/5',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Automation',
    desc: 'CI/CD-native frameworks for continuous telecom validation.',
    tags: ['Python', 'Robot Framework', 'REST APIs', 'Jenkins', 'CI/CD', 'Ansible', 'GitLab'],
    accent: 'from-purple-500/20 to-purple-600/5',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Performance',
    desc: 'Load, stress and capacity benchmarking at scale.',
    tags: ['Load Testing', 'Stress Testing', 'Capacity Planning', 'Benchmarking', 'Latency', 'Throughput'],
    accent: 'from-amber-500/20 to-amber-600/5',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Consulting',
    desc: 'Strategic QA, lab design, and release readiness advisory.',
    tags: ['QA Strategy', 'Lab Design', 'Automation Strategy', 'Vendor Acceptance', 'Release Readiness', 'Advisory'],
    accent: 'from-emerald-500/20 to-emerald-600/5',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'Cloud',
    desc: 'Cloud-native telecom validation on Kubernetes, AWS, Azure and OpenShift.',
    tags: ['Docker', 'Kubernetes', 'OpenShift', 'AWS', 'Azure', 'Helm'],
    accent: 'from-sky-500/20 to-sky-600/5',
  },
];

const TESTING_SERVICES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '5G Core Testing',
    desc: 'End-to-end 5G SA/NSA core testing, slice validation and performance assurance.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'IMS & VoLTE Testing',
    desc: 'Comprehensive IMS testing including VoLTE, VILTE, VoWiFi and RCS.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
      </svg>
    ),
    title: 'Roaming Testing',
    desc: 'International roaming validation, interop testing and partner assurance.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l2 2" />
      </svg>
    ),
    title: 'Network Performance',
    desc: 'Load testing, stress testing and KPI validation for optimal performance.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Automation Testing',
    desc: 'Test automation framework development and test process optimization.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Compliance & Audit',
    desc: 'Regulatory compliance testing and network audit for quality assurance.',
  },
];

const STATS = [
  { value: 'Roaming',   label: 'Testing & validation' },
  { value: '4G',    label: 'LTE / EPC'        },
  { value: '5G',    label: 'Standalone Core'  },
  { value: 'IMS',   label: 'VoLTE'            },
  { value: 'Global',label: 'Delivery'         },
  { value: '5G',  label: 'Private networks' },
];

const WHY_CARDS = [
  {
    title: 'Deep Telecom Expertise',
    desc: '12+ years of packet core engineering across live operator networks on 4 continents.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    accent: 'border-brand/20 hover:border-brand/40',
    iconColor: 'text-brand bg-brand/10 border-brand/20',
  },
  {
    title: 'Engineering-led Delivery',
    desc: 'Not generic QA. Telecom specialists who understand protocols, edge cases, and production stakes.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    accent: 'border-sky-500/20 hover:border-sky-500/40',
    iconColor: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  },
  {
    title: 'Global Standards',
    desc: 'Aligned with GSMA, 3GPP, ETSI, and TM Forum — we validate to the standards that matter.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>,
    accent: 'border-violet-500/20 hover:border-violet-500/40',
    iconColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  },
  {
    title: 'Automation First',
    desc: 'Reduce manual effort and increase release velocity with CI/CD-native telecom automation.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    accent: 'border-amber-500/20 hover:border-amber-500/40',
    iconColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  },
  {
    title: 'Independent Validation',
    desc: 'Vendor-neutral testing across multiple platforms — objective results your team can trust.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    accent: 'border-emerald-500/20 hover:border-emerald-500/40',
    iconColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
  {
    title: 'Trusted Partnership',
    desc: 'Transparent, reliable, and engineering-focused — a long-term partner, not a one-off vendor.',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    accent: 'border-rose-500/20 hover:border-rose-500/40',
    iconColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  },
];

const DELIVERY_STEPS = [
  { num: '01', title: 'Discover',           desc: 'Understand network topology, interfaces, and test objectives.'    },
  { num: '02', title: 'Plan',               desc: 'Define scope, tooling, environments, and success criteria.'       },
  { num: '03', title: 'Design Test Strategy',desc: 'Architect test cases, automation frameworks, and CI pipelines.' },
  { num: '04', title: 'Validate',           desc: 'Execute functional, regression, and integration test suites.'     },
  { num: '05', title: 'Automate',           desc: 'Embed continuous validation into your release pipeline.'          },
  { num: '06', title: 'Deliver',            desc: 'Report findings, knowledge transfer, and ongoing support.'        },
];

const INDUSTRIES = [
  {
    label: 'Mobile Network Operators',
    services: ['Core validation', 'Performance testing', 'Test automation', 'Regression & UAT'],
    accent: 'border-brand/25 hover:border-brand/50',
    iconColor: 'text-brand bg-brand/10 border-brand/25',
    glow: 'rgba(249,115,22,0.04)',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
  },
  {
    label: 'MVNO & MVNE',
    services: ['Roaming validation', 'IMS & VoLTE testing', 'Charging & OCS', 'Interoperability'],
    accent: 'border-sky-400/25 hover:border-sky-400/50',
    iconColor: 'text-sky-400 bg-sky-400/10 border-sky-400/25',
    glow: 'rgba(56,189,248,0.04)',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    label: 'Enterprises',
    services: ['Private 5G validation', 'IoT connectivity testing', 'Network assurance', 'Performance benchmarking'],
    accent: 'border-violet-400/25 hover:border-violet-400/50',
    iconColor: 'text-violet-400 bg-violet-400/10 border-violet-400/25',
    glow: 'rgba(167,139,250,0.04)',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: 'Cloud Providers',
    services: ['Cloud-native telecom QA', 'Kubernetes / OpenShift validation', 'CI/CD integration', 'Microservices testing'],
    accent: 'border-emerald-400/25 hover:border-emerald-400/50',
    iconColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
    glow: 'rgba(52,211,153,0.04)',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    label: 'Telecom Vendors',
    services: ['Product QA & certification', 'Interoperability testing', 'Vendor acceptance testing', 'Protocol conformance'],
    accent: 'border-amber-400/25 hover:border-amber-400/50',
    iconColor: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
    glow: 'rgba(251,191,36,0.04)',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Automotive & IoT',
    services: ['Connectivity testing', 'IoT certification', 'V2X validation', 'Device interoperability'],
    accent: 'border-rose-400/25 hover:border-rose-400/50',
    iconColor: 'text-rose-400 bg-rose-400/10 border-rose-400/25',
    glow: 'rgba(251,113,133,0.04)',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2.5-2.5M13 16H9m4 0h3m3 0h.01M16 16V8l-3-3H6" />
      </svg>
    ),
  },
];

const TECHNOLOGIES = [
  {
    label: '4G LTE', group: 'radio',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
  },
  {
    label: '5G SA', group: 'radio',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
  },
  {
    label: '5G NSA', group: 'radio',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
  },
  {
    label: 'IMS', group: 'core',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  },
  {
    label: 'VoLTE', group: 'core',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  },
  {
    label: 'VoWiFi', group: 'core',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01M4.93 10.93a9.5 9.5 0 0114.14 0" /></svg>,
  },
  {
    label: 'Diameter', group: 'protocol',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  },
  {
    label: 'HTTP/2', group: 'protocol',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>,
  },
  {
    label: 'SIP', group: 'protocol',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  },
  {
    label: 'GTP', group: 'protocol',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
  },
  {
    label: 'PFCP', group: 'protocol',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4h16v16H4V4zm4 4h8m-8 4h8m-8 4h4" /></svg>,
  },
  {
    label: 'REST APIs', group: 'protocol',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  },
  {
    label: 'Kubernetes', group: 'cloud',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3l14 9-14 9V3z" /></svg>,
  },
  {
    label: 'Docker', group: 'cloud',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  },
  {
    label: 'OpenShift', group: 'cloud',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth={1.8} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3" /></svg>,
  },
  {
    label: 'AWS', group: 'cloud',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  },
  {
    label: 'Azure', group: 'cloud',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  },
  {
    label: 'GitLab', group: 'automation',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 22l4-4H8l4 4zM3.27 9L12 22 20.73 9l-2.19-6.01a.48.48 0 00-.9 0L15.5 9h-7L6.36 2.99a.48.48 0 00-.9 0L3.27 9z" /></svg>,
  },
  {
    label: 'Jenkins', group: 'automation',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  {
    label: 'Python', group: 'automation',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  },
  {
    label: 'Robot Framework', group: 'automation',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>,
  },
  {
    label: 'SCTP', group: 'protocol',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
  },
  {
    label: 'Ansible', group: 'automation',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 10h16M4 14h16M4 18h7" /></svg>,
  },
  {
    label: 'Helm', group: 'cloud',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  },
  {
    label: 'Prometheus', group: 'cloud',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  },
  {
    label: 'Grafana', group: 'cloud',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  },
];

const TECH_GROUP_COLORS = {
  radio:      'border-brand/30      text-brand      bg-brand/8',
  core:       'border-sky-400/30    text-sky-400    bg-sky-400/8',
  protocol:   'border-violet-400/30 text-violet-400 bg-violet-400/8',
  cloud:      'border-emerald-400/30 text-emerald-400 bg-emerald-400/8',
  automation: 'border-amber-400/30  text-amber-400  bg-amber-400/8',
};

const SLIDE_DATA = [
  {
    label: 'Core Services',
    tag: 'What We Deliver',
    title: 'Telecom Engineering\nExcellence',
    desc: 'Comprehensive testing, automation, and validation for modern telecom networks — from RAN to core to edge.',
    cta: 'Explore Services',
    target: 'services',
    metrics: [
      { v: '500+', l: 'Test Cases',    color: 'text-brand' },
      { v: '6',    l: 'Disciplines',   color: 'text-sky-400' },
      { v: '100%', l: 'Stack Coverage', color: 'text-emerald-400' },
    ],
    accentColor: 'rgba(249,115,22,0.12)',
  },
  {
    label: 'Why Radius Core',
    tag: 'Our Expertise',
    title: 'Telecom-Native\nValidation',
    desc: 'Deep expertise in packet core, IMS, 5G, and production-grade network assurance — built for engineers by engineers.',
    cta: 'Our Approach',
    target: 'expertise',
    metrics: [
      { v: '95%',  l: 'Automation',    color: 'text-brand' },
      { v: '2×',   l: 'Faster Deploy', color: 'text-sky-400' },
      { v: '15+',  l: 'Protocol Layers', color: 'text-violet-400' },
    ],
    accentColor: 'rgba(56,189,248,0.08)',
  },
  {
    label: 'Get In Touch',
    tag: "Let's Build Together",
    title: 'Ready to Transform\nYour Testing?',
    desc: 'Partner with Radius Core for precision engineering and intelligent telecom validation at any scale.',
    cta: 'Contact Us',
    target: 'contact',
    metrics: [
      { v: '50+',   l: 'Operators',   color: 'text-brand' },
      { v: '10+',   l: 'Years',       color: 'text-amber-400' },
      { v: '99.9%', l: 'Detection',   color: 'text-emerald-400' },
    ],
    accentColor: 'rgba(167,139,250,0.07)',
  },
];

/* ─────────────────────────────────────────────
   Reusable primitives
───────────────────────────────────────────── */
function GhostBtn({ onClick, children, size = 'md' }) {
  const sz = size === 'lg'
    ? 'px-8 py-4 text-sm rounded-xl gap-2.5'
    : 'px-6 py-3 text-sm rounded-xl gap-2';
  return (
    <button onClick={onClick}
      className={`inline-flex items-center ${sz} bg-navy-800/80 border border-[var(--border-light)] hover:border-brand/40 hover:text-brand active:scale-95 text-slate-300 font-semibold transition-all duration-200 leading-none select-none`}>
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Hero Visual — premium animated dashboard card
───────────────────────────────────────────── */
function HeroVisual() {
  const iconFull = 88;
  const margin   = Math.round(iconFull * 0.10);
  const iconSize = iconFull - margin * 2;

  const activity = [
    { label: 'SS7 MAP conformance',   status: 'PASSED',  color: 'text-emerald-400' },
    { label: 'Diameter AVP validation',status: 'PASSED',  color: 'text-emerald-400' },
    { label: 'GTPv2 handover seq.',   status: 'RUNNING', color: 'text-amber-400'   },
    { label: '5G NR RRC test suite',  status: 'QUEUED',  color: 'text-sky-400'     },
  ];

  return (
    /* Outer wrapper: on mobile we don't need giant min-height or absolute rings bleeding out */
    <div className="relative flex items-center justify-center select-none py-8 lg:py-0 lg:min-h-[500px] w-full overflow-hidden">

      {/* Background: subtle telecom grid / circuit pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.045] pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f97316" strokeWidth="0.5"/>
          </pattern>
          <pattern id="hero-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#f97316" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
        {/* Signal path lines */}
        <g stroke="#f97316" strokeWidth="0.8" fill="none" opacity="0.6">
          <polyline points="20,80 60,80 60,120 140,120 140,160 220,160" />
          <polyline points="320,60 360,60 360,100 400,100 400,140" />
          <polyline points="60,200 100,200 100,240 180,240 180,280 260,280" />
          <polyline points="280,180 320,180 320,220 380,220" />
          <circle cx="60" cy="80" r="3" fill="#f97316" />
          <circle cx="140" cy="120" r="3" fill="#f97316" />
          <circle cx="220" cy="160" r="3" fill="#f97316" />
          <circle cx="360" cy="60" r="3" fill="#f97316" />
          <circle cx="100" cy="200" r="3" fill="#f97316" />
          <circle cx="180" cy="240" r="3" fill="#f97316" />
          <circle cx="320" cy="180" r="3" fill="#f97316" />
        </g>
      </svg>

      {/* Concentric rings — visible on all screens */}
      <div>
        {[380, 280, 190].map((size, i) => (
          <div key={size} className="absolute rounded-full border border-brand/[0.06]"
            style={{
              width: size, height: size,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `pulse-glow 4s ease-in-out ${i * 1.2}s infinite`,
            }} />
        ))}
      </div>


      {/* Central dashboard card */}
      <div className="relative z-20 w-[260px] xs:w-[288px] sm:w-[300px] glass border border-[var(--border-light)] rounded-3xl overflow-hidden shadow-card-lg animate-float grad-border">

        {/* Card header */}
        <div className="px-5 pt-5 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="overflow-hidden rounded-xl" style={{ width: iconSize, height: iconSize }}>
                <img src="/logo-icon.png" alt="Radius Core" loading="lazy"
                  style={{ width: iconFull, height: iconFull, maxWidth: 'none', marginTop: -margin, marginLeft: -margin, display: 'block' }} />
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-tight">Radius Core</p>
                <p className="text-[var(--text-muted)] text-[10px] leading-tight">Test Engine v4.2</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="dot-live" />
              <span className="text-[10px] text-emerald-400 font-medium">Live</span>
            </div>
          </div>

          {/* Mini bar chart */}
          <div className="flex items-end gap-1 h-10">
            {[45, 70, 55, 90, 65, 85, 78, 92, 60, 88].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm origin-bottom"
                style={{
                  height: `${h}%`,
                  background: i === 9 ? 'var(--brand)' : i > 6 ? 'rgba(249,115,22,0.5)' : 'rgba(249,115,22,0.2)',
                  animation: `bar-grow 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.05}s both`,
                }} />
            ))}
          </div>
          <p className="text-[var(--text-muted)] text-[10px] mt-1.5 font-medium">Test pass rate — last 10 runs</p>
        </div>

        {/* Activity feed */}
        <div className="px-5 py-3 space-y-2">
          {activity.map((a, i) => (
            <div key={i} className="flex items-center justify-between gap-2"
              style={{ animation: `fade-up-in 0.4s ease ${0.2 + i * 0.1}s both` }}>
              <span className="text-[var(--text-muted)] text-[10px] truncate">{a.label}</span>
              <span className={`text-[9px] font-bold tracking-wider shrink-0 ${a.color}`}>{a.status}</span>
            </div>
          ))}
        </div>

        {/* Card footer */}
        <div className="px-5 py-3 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-[var(--text-muted)] text-[10px]">4 suites active</span>
          <div className="flex gap-1">
            {['bg-emerald-400', 'bg-emerald-400', 'bg-amber-400', 'bg-sky-400'].map((c, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${c}`} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   Who We Are section
───────────────────────────────────────────── */
function WhoWeAreSection() {
  const ref = useReveal(0.08);
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-900/30 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative text-center">
        <div ref={ref} className="reveal">
          <Tag>Who We Are</Tag>
          <h2 className="fluid-h2 font-bold mb-6">
            We Validate <span className="text-gradient">Mission-Critical</span> Networks.
          </h2>
          <p className="fluid-lead text-[var(--text-muted)] leading-relaxed mb-6 max-w-3xl mx-auto">
            Every dropped call, failed registration, roaming issue, or network outage impacts millions of users.
            Our engineers help telecom providers release with confidence by validating complex mobile core networks before deployment.
          </p>
          <p className="fluid-lead text-[var(--text-muted)] leading-relaxed max-w-3xl mx-auto">
            From EPC to cloud-native 5G Core, Radius Core Labs delivers engineering excellence across every stage of network evolution.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Why card
───────────────────────────────────────────── */
function WhyCard({ card, index }) {
  const ref = useReveal(0.07);
  return (
    <div ref={ref}
      className={`reveal why-card-hover bg-navy-900 border ${card.accent} rounded-2xl p-7 flex flex-col`}
      style={{ transitionDelay: `${index * 70}ms` }}>
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 flex-shrink-0 ${card.iconColor}`}>
        {card.icon}
      </div>
      <h3 className="text-white font-semibold text-base mb-2.5">{card.title}</h3>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1">{card.desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Delivery step card
───────────────────────────────────────────── */
function DeliveryStepCard({ step, index }) {
  const ref = useReveal(0.07);
  return (
    <div ref={ref}
      className="reveal card-hover bg-navy-900 border border-[var(--border)] rounded-2xl p-6 flex gap-4"
      style={{ transitionDelay: `${index * 65}ms` }}>
      <div className="flex-shrink-0">
        <span className="text-2xl font-bold text-gradient leading-none">{step.num}</span>
      </div>
      <div>
        <h3 className="text-white font-semibold text-sm mb-1.5">{step.title}</h3>
        <p className="text-[var(--text-muted)] text-xs leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Industry card
───────────────────────────────────────────── */
function IndustryCard({ ind, index }) {
  const ref = useReveal(0.07);
  return (
    <div ref={ref}
      className={`reveal group relative bg-navy-900 border ${ind.accent} rounded-2xl p-6 flex flex-col overflow-hidden transition-all duration-300`}
      style={{ transitionDelay: `${index * 65}ms` }}>
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse 80% 60% at 10% 0%, ${ind.glow}, transparent)` }} />
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${ind.iconColor}`}>
          {ind.icon}
        </div>
        <h3 className="text-white font-semibold text-sm leading-snug">{ind.label}</h3>
      </div>
      <div className="h-px bg-[var(--border)] mb-4" />
      <ul className="flex flex-col gap-2 flex-1">
        {ind.services.map(svc => (
          <li key={svc} className="flex items-center gap-2.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0 opacity-70" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[var(--text-muted)] text-xs font-medium leading-snug group-hover:text-slate-300 transition-colors duration-200">{svc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Service card
───────────────────────────────────────────── */
function ServiceCard({ service, index, delay = 0 }) {
  const ref = useReveal(0.08);
  return (
    <article ref={ref} className="reveal card-hover group relative bg-navy-900 border border-[var(--border)] rounded-2xl p-6 flex flex-col overflow-hidden"
      style={{ transitionDelay: `${delay}ms` }}>
      <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${service.accent} rounded-bl-full opacity-50 pointer-events-none`} />
      <span className="absolute top-5 right-5 text-[11px] font-mono text-[var(--text-subtle)] select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="w-11 h-11 rounded-xl bg-navy-800 border border-[var(--border-light)] flex items-center justify-center text-brand mb-5 group-hover:border-brand/40 group-hover:bg-navy-700 transition-all duration-200 flex-shrink-0">
        {service.icon}
      </div>

      <h3 className="text-white font-semibold text-base mb-1.5">{service.title}</h3>
      <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-4">{service.desc}</p>

      <ul className={service.tags.length > 6 ? 'grid grid-cols-2 gap-x-3 gap-y-1.5' : 'flex flex-col gap-1.5'}>
        {service.tags.map(tag => (
          <li key={tag} className="flex items-center gap-2">
            <svg className="w-3 h-3 text-brand flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[11px] text-[var(--text-muted)] font-medium">{tag}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}


function CareerCard({ card }) {
  const ref = useReveal(0.08);
  return (
    <article ref={ref}
      className="reveal card-hover group bg-navy-900 border border-[var(--border)] rounded-2xl p-7 flex flex-col">
      <h3 className="text-white font-semibold text-lg mb-3">{card.title}</h3>
      <div className="flex-1 mb-6 space-y-3">
        {card.desc.map((p, i) => (
          <p key={i} className="text-[var(--text-muted)] text-sm leading-relaxed">{p}</p>
        ))}
      </div>
      <Link to="/careers"
        className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full border border-[var(--border-light)] text-slate-300 text-xs font-semibold uppercase tracking-wide hover:border-brand/50 hover:text-brand transition-all duration-200">
        {card.cta}
        <ArrowRight />
      </Link>
    </article>
  );
}

function TestingServiceCard({ item, index }) {
  const ref = useReveal(0.08);
  return (
    <article ref={ref}
      className="reveal card-hover group bg-navy-900 border border-[var(--border)] rounded-2xl p-5 flex flex-col items-center text-center"
      style={{ transitionDelay: `${index * 50}ms` }}>
      <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4 group-hover:bg-brand/15 group-hover:border-brand/40 transition-all duration-200">
        {item.icon}
      </div>
      <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
      <p className="text-[var(--text-muted)] text-xs leading-relaxed">{item.desc}</p>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function RadiusCoreWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [slide, setSlide] = useState(0);
  const [activeNav, setActiveNav] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Highlight active section in nav
      const sections = ['services', 'industries', 'technologies', 'expertise', 'rclabs', 'about', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveNav(id); return; }
      }
      setActiveNav('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    // Careers has its own dedicated page — launch it instead of scrolling
    if (id === 'careers') { navigate('/careers'); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, [navigate]);

  // Shared slide shell — left text copy + right visual panel
  function SlideShell({ s, visual }) {
    return (
      <div className="w-full h-full relative flex items-center bg-navy-950 overflow-hidden">
        {/* Per-slide radial accent */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 55% 70% at 2% 50%, ${s.accentColor}, transparent)` }} />
        {/* Dot-grid texture */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Left-to-right gradient fade so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/20 pointer-events-none" />
        {/* Brand accent bar */}
        <div className="absolute left-0 inset-y-10 w-[2px] rounded-full bg-gradient-to-b from-transparent via-brand to-transparent opacity-70" />

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center px-5 sm:px-10 lg:px-14 gap-6 lg:gap-10 py-8 sm:py-10">
          {/* Left — text */}
          <div className="flex flex-col justify-center w-full lg:w-[45%] lg:flex-shrink-0">
            <Tag>{s.tag}</Tag>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-white mb-3 sm:mb-4 whitespace-pre-line leading-[1.12]">{s.title}</h2>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5 sm:mb-7 line-clamp-3 sm:line-clamp-none">{s.desc}</p>
            {/* Metrics row */}
            <div className="flex gap-4 sm:gap-6 mb-5 sm:mb-7">
              {s.metrics.map(m => (
                <div key={m.l}>
                  <p className={`text-lg sm:text-xl font-bold ${m.color} leading-none`}>{m.v}</p>
                  <p className="text-[var(--text-muted)] text-[10px] mt-0.5 font-medium">{m.l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryBtn onClick={() => scrollTo(s.target)}>
                {s.cta} <ArrowRight />
              </PrimaryBtn>
            </div>
          </div>

          {/* Right — fills remaining space, desktop only */}
          <div className="hidden lg:flex flex-1 items-center justify-center h-full min-w-0">
            {visual}
          </div>
        </div>
      </div>
    );
  }

  // ── Slide 1 visual: telecom engineering image ──
  const Slide1Visual = () => (
    <div className="relative w-full max-w-[520px] select-none"
      style={{ animation: 'fade-up-in 0.5s ease 0.1s both' }}>
      <img
        src="/slide1-network.jpg"
        alt="Telecom network analysis"
        className="w-full h-auto rounded-2xl object-cover shadow-card-lg"
        style={{ maskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 60%, transparent 100%)' }}
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-navy-950/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );

  // ── Slide 2 visual: Automation pipeline ──
  const Slide2Visual = () => {
    const steps = [
      { label: 'Code Push',     icon: '⬆', done: true },
      { label: 'Build',         icon: '⚙', done: true },
      { label: 'Protocol Tests',icon: '🔬', done: true },
      { label: 'Regression',    icon: '↩', done: false, running: true },
      { label: 'Deploy',        icon: '🚀', done: false },
    ];
    return (
      <div className="relative w-full max-w-[420px] select-none">
        {/* Pipeline header */}
        <div className="glass border border-[var(--border)] rounded-2xl p-4 mb-3"
          style={{ animation: 'fade-up-in 0.35s ease 0.1s both' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-xs font-semibold">CI/CD Pipeline</span>
            <span className="text-amber-400 text-[10px] font-bold tracking-wider">RUNNING</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand to-amber-400 rounded-full" style={{ width: '62%', animation: 'none' }} />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-[var(--text-muted)]">
            <span>Step 4 of 5</span>
            <span>62%</span>
          </div>
        </div>
        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={step.label}
              className={`flex items-center gap-3 glass border rounded-xl px-4 py-2.5 transition-colors ${step.done ? 'border-emerald-400/25' : step.running ? 'border-amber-400/30' : 'border-[var(--border)]'}`}
              style={{ animation: `fade-up-in 0.35s ease ${0.18 + i * 0.07}s both` }}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] flex-shrink-0 ${step.done ? 'bg-emerald-400/20 text-emerald-400' : step.running ? 'bg-amber-400/20 text-amber-400' : 'bg-navy-800 text-[var(--text-subtle)]'}`}>
                {step.done ? '✓' : step.running ? '●' : '○'}
              </div>
              <span className={`text-xs font-medium flex-1 ${step.done ? 'text-white' : step.running ? 'text-amber-300' : 'text-[var(--text-muted)]'}`}>{step.label}</span>
              {step.done && <span className="text-emerald-400 text-[10px] font-mono">PASS</span>}
              {step.running && <span className="text-amber-400 text-[10px] font-mono">62s</span>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const slides = [
    { label: SLIDE_DATA[0].label, content: <SlideShell s={SLIDE_DATA[0]} visual={<Slide1Visual />} /> },
    { label: SLIDE_DATA[1].label, content: <SlideShell s={SLIDE_DATA[1]} visual={<Slide2Visual />} /> },
    { label: SLIDE_DATA[2].label, content: <SlideShell s={SLIDE_DATA[2]} visual={<HeroVisual />} /> },
  ];

  const heroRef   = useReveal(0.04);
  const statsRef  = useReveal(0.1);
  const expertiseRef = useReveal(0.06);

  return (
    <div className="bg-navy-950 text-white min-h-screen font-sans site-content overflow-x-hidden">

      {/* ══════════════════════════ NAV ══════════════════════════ */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white border-b border-slate-200 shadow-card' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          <button onClick={() => scrollTo('hero')} aria-label="Home" className="flex-shrink-0 pr-6 h-full flex items-center">
            <Logo contentWidth={150} />
          </button>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm">
            {NAV_LINKS.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`relative py-1 transition-colors duration-200 group ${
                  scrolled
                    ? (activeNav === id ? 'text-navy-950' : 'text-slate-600 hover:text-navy-950')
                    : (activeNav === id ? 'text-white' : 'text-[var(--text-muted)] hover:text-white')
                }`}>
                {label}
                <span className={`absolute bottom-0 inset-x-0 h-px bg-brand transition-transform duration-250 origin-left ${activeNav === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            ))}
            <PrimaryBtn onClick={() => scrollTo('contact')}>Get Started</PrimaryBtn>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              scrolled
                ? 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
                : 'text-[var(--text-muted)] hover:text-white hover:bg-navy-800'
            }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-navy-900/98 backdrop-blur-xl border-b border-[var(--border)] px-4 pb-5 pt-2">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)}
                  className="text-left px-3 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-navy-800 transition-colors">
                  {label}
                </button>
              ))}
              <div className="mt-2 px-1">
                <PrimaryBtn onClick={() => scrollTo('contact')}>
                  Get Started <ArrowRight />
                </PrimaryBtn>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden pt-16">
        {/* Layered background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-navy-950 to-navy-900" />
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-brand/5 blur-[120px]" />
          <div className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full bg-sky-500/4 blur-[100px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.022]" preserveAspectRatio="none">
            <defs>
              <pattern id="hero-grid" width="44" height="44" patternUnits="userSpaceOnUse">
                <path d="M 44 0 L 0 0 0 44" fill="none" stroke="white" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Main content */}
        <div ref={heroRef}
          className="reveal relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 pt-10 pb-8 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            {/* Badge — split on mobile so it doesn't overflow */}
            <div className="inline-flex flex-wrap items-center gap-2 glass border border-[var(--border)] rounded-full px-3 py-1.5 xs:px-4 xs:py-2 text-xs font-medium mb-6 sm:mb-8">
              <div className="dot-live flex-shrink-0" />
              <span className="text-brand font-semibold">Telecom Engineering</span>
              <span className="hidden xs:inline w-px h-3 bg-[var(--border)]" />
              <span className="hidden xs:inline text-[var(--text-muted)]">QA Automation · 5G Validation</span>
            </div>

            <h1 className="fluid-hero font-bold tracking-tight mb-4 sm:mb-6">
              Engineering the{' '}
              <span className="text-gradient-animate">Future</span>{' '}
              of Telecom<br className="hidden sm:block" /> Validation
            </h1>

            <p className="fluid-lead text-[var(--text-muted)] leading-relaxed mb-7 sm:mb-10 max-w-lg">
              Radius Core Labs is a specialized telecom engineering company helping operators,
              MVNOs, vendors, and enterprises deliver reliable 4G, 5G, IMS, and cloud-native
              networks through managed testing services ,expert validation, automation, and quality engineering.
            </p>

            <div className="flex flex-wrap gap-3 mb-7 sm:mb-10">
              <PrimaryBtn onClick={() => scrollTo('services')} size="lg">
                Explore Services <ArrowRight />
              </PrimaryBtn>
              <GhostBtn onClick={() => scrollTo('contact')} size="lg">
                Contact Us
              </GhostBtn>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-muted)]">
              {['Qualiyty Engineering', 'MNO/MVNO Operators', 'Global Coverage'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-brand flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — hero network image */}
          <div className="self-stretch flex items-center lg:items-stretch select-none py-6 lg:py-0">
            <div className="relative w-full">
              <img
                src="/hero-network.jpg"
                alt="Global telecom network"
                className="w-full h-auto lg:h-[90%] object-cover object-center"
                style={{ maskImage: 'radial-gradient(ellipse 95% 90% at 55% 50%, black 50%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at 55% 50%, black 50%, transparent 100%)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div ref={statsRef} className="reveal relative z-10 border-t border-[var(--border)] glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-3 sm:grid-cols-6">
            {STATS.map((stat, i) => {
              const mobileRight = i % 3 !== 2 ? 'border-r' : '';
              const smRight     = i < 5 ? 'sm:border-r' : 'sm:border-r-0';
              return (
                <div key={stat.label}
                  className={`text-center py-4 sm:py-5 px-2 sm:px-3 border-[var(--border)] ${mobileRight} ${smRight} ${i < 3 ? 'border-b sm:border-b-0' : ''}`}>
                  <p className="text-lg sm:text-2xl font-bold text-gradient leading-none">{stat.value}</p>
                  <p className="text-[var(--text-muted)] text-[9px] sm:text-xs font-medium mt-1 sm:mt-1.5 leading-tight">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ WHO WE ARE ══════════════════════════ */}
      <WhoWeAreSection />

      {/* ══════════════════════════ SERVICES ══════════════════════════ */}
      <section id="services" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <SectionLabel
            tag="What We Do"
            title={<>End-to-End <span className="text-gradient">Telecom</span> Testing</>}
            desc="From 5G Core validation to roaming compliance, IMS testing to test automation — comprehensive coverage across every layer of your network."
          />

          {/* Comprehensive Telecom Testing Services strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12 sm:mb-16">
            {TESTING_SERVICES.map((item, i) => (
              <TestingServiceCard key={item.title} item={item} index={i} />
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.title} service={svc} index={i} delay={i * 50} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ SLIDER ══════════════════════════ */}
      <section data-slider className="border-y border-[var(--border)]">
        <AutoSlider slides={slides} currentSlide={slide} onSlideChange={setSlide} />
      </section>

      {/* ══════════════════════════ WHY RADIUS CORE ══════════════════════════ */}
      <section id="expertise" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-900/25 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/3 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <SectionLabel
            tag="Why Radius Core"
            title={<>Six Reasons Engineers <span className="text-gradient">Choose Us</span></>}
            desc="Unlike generic software QA firms, telecom engineering is our core expertise — built from the ground up for the protocols, the edge cases, and the stakes of production networks."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-16">
            {WHY_CARDS.map((card, i) => (
              <WhyCard key={card.title} card={card} index={i} />
            ))}
          </div>

          {/* Metrics strip */}
          <div ref={expertiseRef} className="reveal grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Years Experience', value: '12+',   color: 'text-brand'       },
              { label: 'Operators Served', value: '50+',   color: 'text-sky-400'     },
              { label: 'Faster Releases',  value: '2×',    color: 'text-violet-400'  },
              { label: 'Detection Rate',   value: '99.9%', color: 'text-emerald-400' },
            ].map((item, i) => (
              <div key={item.label}
                className="bg-navy-900/60 border border-[var(--border)] rounded-2xl p-5 text-center"
                style={{ transitionDelay: `${i * 80}ms` }}>
                <p className={`text-3xl sm:text-4xl font-bold ${item.color} leading-none mb-1`}>{item.value}</p>
                <p className="text-[var(--text-muted)] text-xs font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ DELIVERY PROCESS ══════════════════════════ */}
      <section id="process" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-900/50 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <SectionLabel
            tag="How We Work"
            title={<>Our <span className="text-gradient">Delivery</span> Process</>}
            desc="A structured, engineering-first approach that moves from discovery to continuous validation."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {DELIVERY_STEPS.map((step, i) => (
              <DeliveryStepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════ INDUSTRIES ══════════════════════════ */}
      <section id="industries" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-900/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/3 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <SectionLabel
            tag="Industries We Support"
            title={<>Built for Every <span className="text-gradient">Telecom</span> Vertical</>}
            desc="From tier-1 operators to private 5G enterprises — Radius Core scales with every segment of the telecom ecosystem."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {INDUSTRIES.map((ind, i) => (
              <IndustryCard key={ind.label} ind={ind} index={i} />
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════ TECHNOLOGIES ══════════════════════════ */}
      <section id="technologies" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <SectionLabel
            tag="Technology Stack"
            title={<>Full <span className="text-gradient">Technology</span> Coverage</>}
            desc="Deep hands-on expertise across radio, core, protocols, cloud infrastructure, and automation tooling."
          />

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { key: 'radio',      label: 'Radio & Access'   },
              { key: 'core',       label: 'Core & IMS'       },
              { key: 'protocol',   label: 'Protocols & APIs' },
              { key: 'cloud',      label: 'Cloud & Infra'    },
              { key: 'automation', label: 'Automation'       },
            ].map(({ key, label }) => (
              <span key={key}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${TECH_GROUP_COLORS[key]}`}>
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {TECHNOLOGIES.map((tech, i) => {
              const ref = useReveal(0.05);
              return (
                <span key={tech.label} ref={ref}
                  className={`reveal inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default ${TECH_GROUP_COLORS[tech.group]}`}
                  style={{ transitionDelay: `${i * 30}ms` }}>
                  {tech.icon}
                  {tech.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════ RC LABS ══════════════════════════ */}
      <section id="rclabs" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/60 to-navy-950 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/4 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <RCLabsBanner scrollTo={scrollTo} />
        </div>
      </section>


      {/* ══════════════════════════ ABOUT ══════════════════════════ */}
      <section id="about" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <SectionLabel
            tag="About Us"
            title={<>Built by Telecom <span className="text-gradient">Engineers</span></>}
            desc="Radius Core was founded with a singular mission — to bring engineering-first testing discipline to the global telecom industry."
          />

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-16">
            {[
              {
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
                title: 'Mission',
                desc: 'Making telecom testing rigorous, automated, and accessible — eliminating network failures before they reach production.',
                accent: 'border-brand/20 bg-brand/5',
              },
              {
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
                title: 'Vision',
                desc: 'A world where every packet is trusted — telecom networks that are continuously validated and self-assuring.',
                accent: 'border-sky-500/20 bg-sky-500/5',
              },
              {
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                title: 'Our People',
                desc: 'Seasoned telecom engineers with hands-on experience across major operators, equipment vendors, and standards bodies.',
                accent: 'border-emerald-500/20 bg-emerald-500/5',
              },
            ].map((item, i) => (
              <AboutCard key={item.title} item={item} index={i} />
            ))}
          </div>

          {/* Full-width highlight banner */}
          <AboutBanner scrollTo={scrollTo} />
        </div>
      </section>

      {/* ══════════════════════════ CAREERS ══════════════════════════ */}
      <section id="careers" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-900/30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand/4 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <SectionLabel
            tag="Careers"
            title={<>Engineer The Future. <span className="text-gradient">Pioneer your career path</span></>}
          />

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Intro copy */}
            <div className="lg:pt-2">
              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-5">
                Join a global team helping the world's leading operators make their networks work with greater confidence, intelligence, and impact.
              </p>
              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-5">
                At Radius Core Labs, you'll work alongside passionate telecom engineers, and innovators building the next generation of communication networks.
              </p>
              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
                From 5G Core and IMS to AI-driven automation and cloud-native technologies, you'll help solve real-world challenges that connect millions of people around the world.
              </p>
            </div>

            {/* Two career cards */}
            {[
              {
                title: 'Students and Graduates',
                desc: [
                  'Launch your engineering career by working on cutting-edge telecom technologies including 4G, 5G, IMS, Packet Core, Cloud, and AI.',
                  'Learn from experienced engineers through structured mentoring, hands-on projects, and our Innovation Lab.',
                ],
                cta: 'Explore about Students and Graduates',
              },
              {
                title: 'Experienced Professionals',
                desc: [
                  'Bring your expertise to a fast-growing engineering company delivering telecom solutions for operators, MVNOs, equipment vendors, and enterprises worldwide.',
                  'Lead innovation, mentor future engineers, and help shape next-generation communication technologies.',
                ],
                cta: 'Explore about Experienced Professionals',
              },
            ].map((card) => (
              <CareerCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════ CONTACT ══════════════════════════ */}
      <section id="contact" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-brand/4 rounded-full blur-[100px] pointer-events-none" />
        <ContactSection scrollTo={scrollTo} />
      </section>

      {/* ══════════════════════════ FOOTER ══════════════════════════ */}
      <footer className="border-t border-[var(--border)] bg-navy-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

            {/* Brand col */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-5">
                <Logo contentHeight={64} />
              </div>
              <p className="text-[var(--text-subtle)] text-xs">© 2026 Radius Core Labs. All rights reserved.</p>
            </div>

            {/* Services col */}
            <div>
              <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Services</h5>
              <ul className="space-y-2.5">
                {['Telecom Testing', '5G Core Validation', 'EPC Testing', 'IMS & VoLTE', 'Test Automation', 'Performance Testing', 'Consulting'].map(s => (
                  <li key={s}>
                    <button onClick={() => scrollTo('services')}
                      className="text-[var(--text-muted)] hover:text-brand transition-colors text-sm">
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company col */}
            <div>
              <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Company</h5>
              <ul className="space-y-2.5">
                {NAV_LINKS.map(([label, id]) => (
                  <li key={id}>
                    <button onClick={() => scrollTo(id)}
                      className="text-[var(--text-muted)] hover:text-brand transition-colors text-sm">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect col */}
            <div>
              <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Connect</h5>
              <div className="flex gap-2.5 mb-5">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-navy-800 border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] hover:text-brand hover:border-brand/40 transition-all duration-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.d} />
                    </svg>
                  </a>
                ))}
              </div>
              <a href="mailto:hello@radiuscorelabs.com"
                className="text-[var(--text-muted)] hover:text-brand transition-colors text-sm break-all">
                hello@radiuscorelabs.com
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

/* ─────────────────────────────────────────────
   About card
───────────────────────────────────────────── */
function AboutCard({ item, index }) {
  const ref = useReveal();
  return (
    <div ref={ref}
      className={`reveal card-hover bg-navy-900 border ${item.accent} rounded-2xl p-5 sm:p-7`}
      style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="w-11 h-11 rounded-xl bg-navy-800 border border-[var(--border-light)] flex items-center justify-center text-brand mb-4 sm:mb-5">
        {item.icon}
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   About highlight banner
───────────────────────────────────────────── */
function AboutBanner({ scrollTo }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-brand/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-56 h-28 bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="relative z-10 px-5 sm:px-10 lg:px-16 py-8 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="text-center sm:text-left max-w-xl">
          <p className="text-brand text-xs font-semibold uppercase tracking-[0.2em] mb-3">Trusted Partner</p>
          <h3 className="fluid-h3 font-bold text-white mb-2">
            Serving operators across <span className="text-gradient">4 continents</span>
          </h3>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed">
            From greenfield MVNOs to tier-1 carriers — Radius Core scales with your ambition.
          </p>
        </div>
        <div className="flex-shrink-0">
          <PrimaryBtn onClick={() => scrollTo('contact')} size="lg">
            Partner With Us <ArrowRight />
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Contact section
───────────────────────────────────────────── */
function ContactSection({ scrollTo }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] grad-border">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-950" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-brand/6 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-sky-500/4 blur-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-brand/60 to-transparent" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
        </div>

        <div className="relative z-10 px-5 sm:px-10 lg:px-16 py-10 sm:py-16 lg:py-20">
          <div className="text-center mb-8 sm:mb-12">
            <Tag>Get In Touch</Tag>
            <h2 className="fluid-h2 font-bold mb-4 sm:mb-5">
              Ready to Transform<br />
              <span className="text-gradient">Your Testing?</span>
            </h2>
            <p className="text-[var(--text-muted)] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
              Partner with Radius Core for precision engineering and intelligent
              telecom validation. Let's build reliable networks together.
            </p>
          </div>

          {/* Contact options */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-2xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: 'Email Us',
                value: 'hello@radiuscorelabs.com',
                href: 'mailto:hello@radiuscorelabs.com',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                label: 'Live Chat',
                value: 'Chat on WhatsApp',
                href: 'https://wa.me/919847099911?text=' + encodeURIComponent("Hi Radius Core, I'd like to chat about telecom testing."),
                external: true,
              },
            ].map((opt) => (
              <a key={opt.label} href={opt.href}
                {...(opt.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="card-hover flex flex-col items-center text-center bg-navy-900/80 border border-[var(--border)] rounded-2xl p-5 gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-navy-800 border border-[var(--border-light)] flex items-center justify-center text-brand group-hover:border-brand/40 transition-colors duration-200">
                  {opt.icon}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-0.5">{opt.label}</p>
                  <p className="text-[var(--text-muted)] text-xs">{opt.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-col xs:flex-row gap-3 justify-center">
            <PrimaryBtn href="mailto:hello@radiuscorelabs.com" size="lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Us a Message
            </PrimaryBtn>
            <GhostBtn onClick={() => scrollTo('services')} size="lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View Services
            </GhostBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RC Labs banner
───────────────────────────────────────────── */
function RCLabsBanner({ scrollTo }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800">
      {/* Decorative */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      <div className="absolute top-0 left-0 w-60 h-60 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-40 bg-violet-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-5 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-7 sm:mb-10">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 glass border border-[var(--border)] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse flex-shrink-0" />
            <span className="text-brand font-semibold">Innovation Lab</span>
            <span className="w-px h-3 bg-[var(--border)]" />
            <span className="text-[var(--text-muted)]">Coming Soon</span>
          </div>
          <h3 className="fluid-h3 font-bold text-white mb-3 sm:mb-4">
            Future Products — <span className="text-gradient">RC Labs</span>
          </h3>
          <p className="text-[var(--text-muted)] text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            Radius Core Labs is investing in next-generation telecom engineering products,
            building intellectual property that goes beyond pure services.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-7 sm:mb-10">
          {[
            { label: 'AI Test Assistant',              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, color: 'border-brand/25 bg-brand/5 text-brand' },
            { label: 'Roaming Analytics',               icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>, color: 'border-sky-400/25 bg-sky-400/5 text-sky-400' },
            { label: 'Network Health Dashboard',        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, color: 'border-violet-400/25 bg-violet-400/5 text-violet-400' },
            { label: 'Traffic Simulation Platform',     icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>, color: 'border-amber-400/25 bg-amber-400/5 text-amber-400' },
            { label: 'Automated Test Framework',        icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, color: 'border-emerald-400/25 bg-emerald-400/5 text-emerald-400' },
            { label: 'Protocol Intelligence',           icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, color: 'border-rose-400/25 bg-rose-400/5 text-rose-400' },
            { label: 'Cloud Lab Platform',              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>, color: 'border-cyan-400/25 bg-cyan-400/5 text-cyan-400' },
          ].map((item, i) => (
            <div key={item.label}
              className={`rounded-2xl border ${item.color} px-4 py-4 flex flex-col items-center text-center gap-2.5`}
              style={{ animation: `fade-up-in 0.4s ease ${0.05 + i * 0.06}s both` }}>
              <div className="opacity-80">{item.icon}</div>
              <p className="text-white text-xs font-semibold leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div className="relative z-10 border-t border-[var(--border)] px-5 sm:px-10 lg:px-16 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <p className="text-[var(--text-muted)] text-sm">
          Stay connected to learn more about upcoming products.
        </p>
        <PrimaryBtn onClick={() => scrollTo('contact')} size="md">
          Stay Updated <ArrowRight />
        </PrimaryBtn>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Social links
───────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
  {
    label: 'Twitter/X',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'GitHub',
    d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
];
