export const COLORS = {
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  accent: {
    50: '#fef7ff',
    100: '#fdeeff',
    200: '#fcddff',
    300: '#f9c2ff',
    400: '#f397ff',
    500: '#ea5dff',
    600: '#d333f7',
    700: '#b820d9',
    800: '#9a1bb3',
    900: '#7e1a92',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  brutalism: {
    black: '#000000',
    white: '#ffffff',
    yellow: '#ffff00',
    pink: '#ff69b4',
    cyan: '#00ffff',
    lime: '#32ff32',
    orange: '#ff4500',
    purple: '#8a2be2',
    red: '#ff0000',
    blue: '#0066ff',
  }
};

export const TASK_STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const TASK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const TASK_CATEGORIES = {
  WORK: 'work',
  PERSONAL: 'personal',
  SHOPPING: 'shopping',
  HEALTH: 'health',
  LEARNING: 'learning',
  ENTERTAINMENT: 'entertainment',
  OTHER: 'other'
};

export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  },
  button: {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  slide: {
    enter: {
      x: 300,
      opacity: 0
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0
    }
  }
};

export const SITE_TITLE = 'Neo Brutalism Todo';

export const SITE_DESCRIPTION = 'A bold, unapologetic todo app with neo-brutalist design principles';

export const LOCAL_STORAGE_KEYS = {
  TASKS: 'neo-brutalism-tasks',
  FILTERS: 'neo-brutalism-filters',
  PREFERENCES: 'neo-brutalism-preferences'
};

export const BRUTALIST_SHADOWS = {
  small: '2px 2px 0px #000000',
  medium: '4px 4px 0px #000000',
  large: '6px 6px 0px #000000',
  xl: '8px 8px 0px #000000',
  colored: {
    yellow: '4px 4px 0px #ffff00',
    pink: '4px 4px 0px #ff69b4',
    cyan: '4px 4px 0px #00ffff',
    lime: '4px 4px 0px #32ff32'
  }
};

export const SCREEN_SIZES = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export const Z_INDEX = {
  dropdown: 1000,
  modal: 1100,
  popover: 1200,
  tooltip: 1300,
  toast: 1400
};