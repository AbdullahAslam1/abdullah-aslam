// ── Project illustrations (matte SVG, inline) ────────────────
export const PROJECT_ART = {
  'resume-analyzer': (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="20" width="140" height="170" rx="6" fill="rgba(123,159,187,0.06)" stroke="rgba(123,159,187,0.15)" strokeWidth="1"/>
      <rect x="75" y="40" width="80" height="5" rx="2" fill="rgba(123,159,187,0.25)"/>
      <rect x="75" y="54" width="110" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
      <rect x="75" y="62" width="95" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
      <rect x="75" y="70" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
      <rect x="75" y="84" width="60" height="4" rx="2" fill="rgba(123,159,187,0.18)"/>
      <rect x="75" y="96" width="110" height="2.5" rx="1.25" fill="rgba(255,255,255,0.05)"/>
      <rect x="75" y="104" width="90" height="2.5" rx="1.25" fill="rgba(255,255,255,0.05)"/>
      <rect x="75" y="112" width="105" height="2.5" rx="1.25" fill="rgba(255,255,255,0.05)"/>
      <rect x="75" y="126" width="60" height="4" rx="2" fill="rgba(123,159,187,0.18)"/>
      <rect x="75" y="138" width="110" height="2.5" rx="1.25" fill="rgba(255,255,255,0.05)"/>
      <rect x="75" y="146" width="80" height="2.5" rx="1.25" fill="rgba(255,255,255,0.05)"/>
      {/* AI scan line */}
      <rect x="60" y="96" width="140" height="1" fill="rgba(123,159,187,0.3)"/>
      {/* Score badge */}
      <rect x="195" y="30" width="70" height="55" rx="8" fill="rgba(123,159,187,0.08)" stroke="rgba(123,159,187,0.2)" strokeWidth="1"/>
      <text x="230" y="55" textAnchor="middle" fill="rgba(168,180,192,0.8)" fontSize="18" fontWeight="700" fontFamily="system-ui">92</text>
      <text x="230" y="68" textAnchor="middle" fill="rgba(123,159,187,0.5)" fontSize="8" fontFamily="system-ui">SCORE</text>
      {/* Dots */}
      <circle cx="240" cy="130" r="18" fill="rgba(123,159,187,0.05)" stroke="rgba(123,159,187,0.12)" strokeWidth="1"/>
      <circle cx="240" cy="130" r="10" fill="rgba(123,159,187,0.08)"/>
      <circle cx="265" cy="148" r="12" fill="rgba(110,155,155,0.05)" stroke="rgba(110,155,155,0.1)" strokeWidth="1"/>
    </svg>
  ),
  'fairshare': (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Group nodes */}
      <circle cx="160" cy="100" r="22" fill="rgba(123,159,187,0.08)" stroke="rgba(123,159,187,0.2)" strokeWidth="1"/>
      <circle cx="80"  cy="60"  r="16" fill="rgba(123,159,187,0.06)" stroke="rgba(123,159,187,0.12)" strokeWidth="1"/>
      <circle cx="240" cy="60"  r="16" fill="rgba(123,159,187,0.06)" stroke="rgba(123,159,187,0.12)" strokeWidth="1"/>
      <circle cx="80"  cy="145" r="16" fill="rgba(123,159,187,0.06)" stroke="rgba(123,159,187,0.12)" strokeWidth="1"/>
      <circle cx="240" cy="145" r="16" fill="rgba(123,159,187,0.06)" stroke="rgba(123,159,187,0.12)" strokeWidth="1"/>
      {/* Connecting lines */}
      <line x1="160" y1="80"  x2="94"  y2="70"  stroke="rgba(123,159,187,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="160" y1="80"  x2="226" y2="70"  stroke="rgba(123,159,187,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="160" y1="120" x2="94"  y2="136" stroke="rgba(123,159,187,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="160" y1="120" x2="226" y2="136" stroke="rgba(123,159,187,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
      {/* Currency symbols */}
      <text x="74"  y="65"  textAnchor="middle" fill="rgba(168,180,192,0.4)" fontSize="10" fontFamily="system-ui">$12</text>
      <text x="234" y="65"  textAnchor="middle" fill="rgba(168,180,192,0.4)" fontSize="10" fontFamily="system-ui">$8</text>
      <text x="74"  y="150" textAnchor="middle" fill="rgba(168,180,192,0.4)" fontSize="10" fontFamily="system-ui">$5</text>
      <text x="234" y="150" textAnchor="middle" fill="rgba(168,180,192,0.4)" fontSize="10" fontFamily="system-ui">$15</text>
      <text x="160" y="105" textAnchor="middle" fill="rgba(123,159,187,0.6)" fontSize="11" fontWeight="600" fontFamily="system-ui">$40</text>
      {/* Pulse ring */}
      <circle cx="160" cy="100" r="32" fill="none" stroke="rgba(123,159,187,0.06)" strokeWidth="1"/>
      <circle cx="160" cy="100" r="44" fill="none" stroke="rgba(123,159,187,0.04)" strokeWidth="1"/>
    </svg>
  ),
  'inventory': (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bar chart */}
      <rect x="50"  y="130" width="28" height="50" rx="3" fill="rgba(123,159,187,0.15)"/>
      <rect x="90"  y="100" width="28" height="80" rx="3" fill="rgba(123,159,187,0.20)"/>
      <rect x="130" y="80"  width="28" height="100" rx="3" fill="rgba(123,159,187,0.25)"/>
      <rect x="170" y="110" width="28" height="70" rx="3" fill="rgba(123,159,187,0.18)"/>
      <rect x="210" y="60"  width="28" height="120" rx="3" fill="rgba(123,159,187,0.30)"/>
      <rect x="250" y="90"  width="28" height="90" rx="3" fill="rgba(123,159,187,0.22)"/>
      {/* Baseline */}
      <line x1="40" y1="182" x2="290" y2="182" stroke="rgba(123,159,187,0.12)" strokeWidth="1"/>
      {/* Trend line */}
      <polyline points="64,155 104,125 144,105 184,135 224,85 264,115"
        fill="none" stroke="rgba(168,180,192,0.35)" strokeWidth="1.5" strokeDasharray="4 2"/>
      {/* Dots on trend */}
      <circle cx="64"  cy="155" r="3" fill="rgba(168,180,192,0.5)"/>
      <circle cx="224" cy="85"  r="3" fill="rgba(168,180,192,0.5)"/>
      {/* Y-axis labels */}
      <text x="35" y="135" textAnchor="end" fill="rgba(123,159,187,0.3)" fontSize="7" fontFamily="system-ui">50</text>
      <text x="35" y="105" textAnchor="end" fill="rgba(123,159,187,0.3)" fontSize="7" fontFamily="system-ui">100</text>
      <text x="35" y="70"  textAnchor="end" fill="rgba(123,159,187,0.3)" fontSize="7" fontFamily="system-ui">150</text>
    </svg>
  ),
  'ecommerce': (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Phone frame */}
      <rect x="105" y="15" width="110" height="175" rx="12" fill="rgba(123,159,187,0.05)" stroke="rgba(123,159,187,0.15)" strokeWidth="1"/>
      {/* Screen content */}
      <rect x="115" y="35" width="90" height="45" rx="4" fill="rgba(123,159,187,0.08)"/>
      <rect x="115" y="87" width="42" height="38" rx="4" fill="rgba(123,159,187,0.06)"/>
      <rect x="163" y="87" width="42" height="38" rx="4" fill="rgba(123,159,187,0.06)"/>
      {/* Product labels */}
      <rect x="119" y="131" width="60" height="3"  rx="1.5" fill="rgba(255,255,255,0.07)"/>
      <rect x="119" y="138" width="40" height="2.5" rx="1.25" fill="rgba(255,255,255,0.04)"/>
      {/* Cart icon area */}
      <rect x="120" y="152" width="80" height="22" rx="6" fill="rgba(123,159,187,0.12)" stroke="rgba(123,159,187,0.2)" strokeWidth="0.5"/>
      <text x="160" y="166" textAnchor="middle" fill="rgba(168,180,192,0.5)" fontSize="8" fontFamily="system-ui">Add to Cart</text>
      {/* Notch */}
      <rect x="145" y="20" width="30" height="5" rx="2.5" fill="rgba(123,159,187,0.1)"/>
      {/* Floating badge */}
      <circle cx="215" cy="40" r="14" fill="rgba(123,159,187,0.1)" stroke="rgba(123,159,187,0.2)" strokeWidth="1"/>
      <text x="215" y="44" textAnchor="middle" fill="rgba(168,180,192,0.6)" fontSize="9" fontWeight="600" fontFamily="system-ui">3</text>
    </svg>
  ),
};

// ── Projects data ─────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 'resume-analyzer',
    title: 'Resume Analyzer',
    tagline: 'AI-powered career intelligence',
    description:
      'Enterprise-grade resume analysis tool built with Flutter and Firebase. Features intelligent AI scoring, PDF handling, JWT auth, and a 3-step onboarding flow — all on Clean Architecture.',
    featured: true,
    badges: ['Featured', 'Production Ready'],
    tech: ['Flutter', 'Firebase', 'Riverpod', 'Google APIs', 'Clean Architecture', 'GetIt', 'dartz'],
    links: { github: 'https://github.com/AbdullahAslam1', live: null },
    caseStudy: {
      sections: [
        {
          title: 'Architecture Overview',
          icon: '◈',
          items: [
            { label: 'Presentation Layer', desc: 'UI pages, widgets, Riverpod state management & async providers' },
            { label: 'Domain Layer',       desc: 'Entities, abstract repositories, use cases — pure business logic' },
            { label: 'Data Layer',         desc: 'Firebase datasources, models, repository implementations' },
          ],
          type: 'layers',
        },
        {
          title: 'Key Features',
          icon: '◆',
          type: 'checklist',
          items: [
            'Email / Password & Google OAuth via Firebase Auth',
            'Resume upload & PDF viewing with SyncFusion',
            'AI-powered resume scoring with Google APIs',
            'Cloud Firestore for real-time document storage',
            '3-step animated onboarding flow',
            'Splash screen + skeleton loading states',
          ],
        },
        {
          title: 'Tech Stack Deep Dive',
          icon: '◇',
          type: 'grid',
          items: [
            { label: 'State Management',       value: 'Riverpod AsyncValue' },
            { label: 'Backend',                value: 'Firebase + Google APIs' },
            { label: 'Error Handling',         value: 'dartz Either pattern' },
            { label: 'Dependency Injection',   value: 'GetIt service locator' },
            { label: 'PDF Handling',           value: 'SyncFusion + file_picker' },
            { label: 'Animations',             value: 'animate_do + custom transitions' },
          ],
        },
        {
          title: 'Challenges & Solutions',
          icon: '◉',
          type: 'challenges',
          items: [
            { label: 'Complex PDF Handling',    desc: 'Solved with SyncFusion PDF viewer + file_picker + permission_handler' },
            { label: 'Async State Complexity',  desc: 'Riverpod AsyncValue with proper error boundaries and loading states' },
            { label: 'Multi-feature Isolation', desc: 'Feature-first architecture with isolated modules & shared core utilities' },
          ],
        },
      ],
    },
  },
  {
    id: 'fairshare',
    title: 'FairShare',
    tagline: 'Real-time group expense splitting',
    description:
      'Collaborative expense tracking app for groups. Real-time sync powered by Supabase, smart multi-strategy splitting algorithms, and custom PostgreSQL functions for balance reconciliation.',
    featured: false,
    badges: ['Full-Stack', 'Real-time'],
    tech: ['Flutter', 'Supabase', 'PostgreSQL', 'Riverpod', 'Real-time'],
    links: { github: 'https://github.com/AbdullahAslam1', live: null },
    caseStudy: {
      sections: [
        {
          title: 'Real-Time Sync Architecture',
          icon: '◈',
          type: 'sync',
          items: [
            'Expense additions across all group members',
            'Group member role & permission updates',
            'Settlement calculation triggers',
            'Balance reconciliation on every transaction',
          ],
        },
        {
          title: 'Smart Splitting Strategies',
          icon: '◆',
          type: 'checklist',
          items: [
            'Equal split — divide evenly among all participants',
            'Percentage-based — custom distribution per member',
            'Custom amount — specify exact amounts per person',
            'Automated debt calculation & settlement suggestions',
            'Multi-currency support for international groups',
          ],
        },
        {
          title: 'Database Architecture',
          icon: '◇',
          type: 'code',
          items: [
            { label: 'add_expense_status.sql',         desc: 'Tracks expense approval state machine' },
            { label: 'check_deletion_eligibility.sql', desc: 'Validates safe expense removal' },
            { label: 'check_exit_eligibility.sql',     desc: 'Ensures clean group exits with zero balances' },
            { label: 'update_granular_balances.sql',   desc: 'Recalculates all member balances atomically' },
          ],
        },
        {
          title: 'UX Highlights',
          icon: '◉',
          type: 'grid',
          items: [
            { label: 'Group Management',  value: 'Create, invite & manage member roles' },
            { label: 'Color-coded Cards', value: 'Red for debts, green for receivables' },
            { label: 'Analytics Charts',  value: 'Visual spending breakdown by category' },
            { label: 'Push Notifications',value: 'Real-time activity alerts via FCM' },
            { label: 'Offline Support',   value: 'Hive local cache for offline access' },
            { label: 'Settlement Flow',   value: 'One-tap mark as settled with history' },
          ],
        },
      ],
    },
  },
  {
    id: 'inventory',
    title: 'Inventory Dashboard',
    tagline: 'Full-stack inventory intelligence',
    description:
      'Comprehensive inventory management system — Flutter + Riverpod frontend connected to a FastAPI + SQL Server backend. Interactive FL Chart visualisations, CSV export, and secure file permissions.',
    featured: false,
    badges: ['Full-Stack'],
    tech: ['Flutter', 'FastAPI', 'Riverpod', 'FL Chart', 'REST APIs', 'SQL Server'],
    links: { github: 'https://github.com/AbdullahAslam1', live: null },
    caseStudy: {
      sections: [
        {
          title: 'Full-Stack Architecture',
          icon: '◈',
          type: 'checklist',
          items: [
            'Flutter frontend with Riverpod state management & async providers',
            'FastAPI Python backend with automatic OpenAPI documentation',
            'SQL Server connectivity via PyODBC with connection pooling',
            'JWT authentication with bcrypt password hashing',
            'Dio HTTP client with interceptors for token refresh',
          ],
        },
        {
          title: 'REST API Integration',
          icon: '◆',
          type: 'grid',
          items: [
            { label: 'GET',    value: 'Fetch inventory data & paginated sales history' },
            { label: 'POST',   value: 'Add new products & record sales transactions' },
            { label: 'PUT',    value: 'Update product details & adjust stock levels' },
            { label: 'DELETE', value: 'Soft-delete products with audit trail' },
            { label: 'PATCH',  value: 'Bulk stock adjustment operations' },
            { label: 'Search', value: 'Full-text search with filters & sorting' },
          ],
        },
        {
          title: 'File Management & Export',
          icon: '◉',
          type: 'layers',
          items: [
            { label: 'CSV Export',        desc: 'Export filtered inventory & sales reports to CSV' },
            { label: 'Permission Handler',desc: 'Secure platform-specific file access permissions' },
            { label: 'Share Plus',        desc: 'Cross-platform report sharing via native share sheet' },
          ],
        },
      ],
    },
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce App',
    tagline: 'Modern mobile shopping experience',
    description:
      'Feature-rich mobile commerce app with full product catalog, GetX reactive state management, persistent cart via GetStorage, dark mode support, and a polished Material 3 design system.',
    featured: false,
    badges: ['Mobile', 'E-Commerce'],
    tech: ['Flutter', 'GetX', 'GetStorage', 'Material 3', 'Google Fonts', 'share_plus'],
    links: { github: 'https://github.com/AbdullahAslam1', live: null },
    caseStudy: {
      sections: [
        {
          title: 'E-Commerce Features',
          icon: '◈',
          type: 'checklist',
          items: [
            'Product catalog with categories, search & filter',
            'Detail pages with image gallery & size selection',
            'Real-time cart with quantity management',
            'Order summary with subtotal & discount calculation',
            'User auth with registration & login flow',
            'Order history & wishlist management',
          ],
        },
        {
          title: 'GetX State Management',
          icon: '◆',
          type: 'layers',
          items: [
            { label: 'Reactive Controllers', desc: 'Obs variables & workers for automatic UI updates' },
            { label: 'Route Management',     desc: 'Named routes with middleware & transitions' },
            { label: 'Dependency Injection', desc: 'Lazy-loaded bindings for clean service lifecycle' },
          ],
        },
        {
          title: 'Local Storage & Offline',
          icon: '◇',
          type: 'grid',
          items: [
            { label: 'Cart Persistence',   value: 'Cart survives app restarts via GetStorage' },
            { label: 'User Preferences',   value: 'Theme, language & favourites persisted locally' },
            { label: 'Offline Browsing',   value: 'Cached catalog for browsing without internet' },
            { label: 'Session Handling',   value: 'Auto-login with secure token storage' },
          ],
        },
        {
          title: 'UI & Design System',
          icon: '◉',
          type: 'grid',
          items: [
            { label: 'Typography',      value: 'Google Fonts with fluid type scale' },
            { label: 'Design System',   value: 'Material 3 with custom colour tokens' },
            { label: 'Dark Mode',       value: 'Adaptive theme — full light & dark support' },
            { label: 'Sharing',         value: 'Native share sheet via share_plus' },
            { label: 'Animations',      value: 'Hero transitions & page route animations' },
            { label: 'Accessibility',   value: 'Semantic labels & minimum touch targets' },
          ],
        },
      ],
    },
  },
];
