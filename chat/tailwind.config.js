module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Medical Blue
        primary: {
          DEFAULT: "#2563EB", // blue-600
          50: "#EFF6FF", // blue-50
          100: "#DBEAFE", // blue-100
          500: "#3B82F6", // blue-500
          600: "#2563EB", // blue-600
          700: "#1D4ED8", // blue-700
        },
        
        // Secondary Colors - Sophisticated Slate
        secondary: {
          DEFAULT: "#64748B", // slate-500
          100: "#F1F5F9", // slate-100
          200: "#E2E8F0", // slate-200
          300: "#CBD5E1", // slate-300
          400: "#94A3B8", // slate-400
          500: "#64748B", // slate-500
          600: "#475569", // slate-600
        },
        
        // Accent Colors - Calming Emerald
        accent: {
          DEFAULT: "#059669", // emerald-600
          50: "#ECFDF5", // emerald-50
          100: "#D1FAE5", // emerald-100
          500: "#10B981", // emerald-500
          600: "#059669", // emerald-600
        },
        
        // Background Colors
        background: "#FEFEFE", // custom-white
        surface: "#F8FAFC", // slate-50
        
        // Text Colors
        text: {
          primary: "#1E293B", // slate-800
          secondary: "#64748B", // slate-500
        },
        
        // Status Colors
        success: {
          DEFAULT: "#10B981", // emerald-500
          50: "#ECFDF5", // emerald-50
          100: "#D1FAE5", // emerald-100
        },
        warning: {
          DEFAULT: "#F59E0B", // amber-500
          50: "#FFFBEB", // amber-50
          100: "#FEF3C7", // amber-100
        },
        error: {
          DEFAULT: "#DC2626", // red-600
          50: "#FEF2F2", // red-50
          100: "#FEE2E2", // red-100
        },
        
        // Border Colors
        border: {
          DEFAULT: "#E2E8F0", // slate-200
          light: "#F1F5F9", // slate-100
        },
      },
      
      fontFamily: {
        // Headings - Inter
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        
        // Body Text - Source Sans 3
        body: ['Source Sans 3', 'system-ui', 'sans-serif'],
        source: ['Source Sans 3', 'system-ui', 'sans-serif'],
        
        // Data/Code - JetBrains Mono
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        jetbrains: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      
      fontSize: {
        // Fluid typography using clamp()
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)',
      },
      
      boxShadow: {
        // Medical-grade shadow system
        'medical-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'medical-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medical-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'medical-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'medical-tooltip': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      
      borderRadius: {
        // Healthcare-appropriate border radius
        'medical': '8px',
        'medical-card': '12px',
        'medical-lg': '16px',
      },
      
      animation: {
        // Healthcare-specific animations
        'gentle-pulse': 'gentle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-right': 'slide-in-right 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        'typing-dots': 'typing-dots 1.4s infinite',
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      transitionDuration: {
        // Healthcare-appropriate timing
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
      },
      
      transitionTimingFunction: {
        // Medical-grade easing
        'medical': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'medical-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'medical-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      spacing: {
        // Healthcare-specific spacing scale
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      maxWidth: {
        // Content width constraints for readability
        'medical-content': '65ch',
        'medical-form': '28rem',
        'medical-card': '24rem',
      },
      
      zIndex: {
        // Healthcare UI layering
        'tooltip': '50',
        'modal': '100',
        'toast': '200',
      },
    },
  },
  plugins: [
    // Add any additional plugins here
    function({ addUtilities }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}