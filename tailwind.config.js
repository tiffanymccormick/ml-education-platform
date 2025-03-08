/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neon: {
          yellow: "hsl(var(--neon-yellow))",
          red: "hsl(var(--neon-red))",
          blue: "hsl(var(--neon-blue))",
          green: "hsl(var(--neon-green))",
          purple: "hsl(var(--neon-purple))",
          pink: "hsl(var(--neon-pink))",
          cyan: "hsl(var(--neon-cyan))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: 1,
            boxShadow: "0 0 20px currentColor"
          },
          "50%": {
            opacity: 0.7,
            boxShadow: "0 0 10px currentColor"
          }
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)"
          },
          "50%": {
            transform: "translateY(-10px)"
          }
        },
        "rotate-slow": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": {
            transform: "rotate(360deg)"
          }
        },
        "border-flow": {
          "0%, 100%": {
            "background-position": "0% 50%"
          },
          "50%": {
            "background-position": "100% 50%"
          }
        },
        "reveal-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: 0
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1
          }
        },
        "reveal-up": {
          "0%": {
            transform: "translateY(20px)",
            opacity: 0
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1
          }
        },
        "text-flicker": {
          "0%, 100%": {
            opacity: 1
          },
          "33%": {
            opacity: 0.9
          },
          "66%": {
            opacity: 0.95
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "rotate-slow": "rotate-slow 12s linear infinite",
        "border-flow": "border-flow 4s linear infinite",
        "reveal-right": "reveal-right 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        "reveal-up": "reveal-up 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        "text-flicker": "text-flicker 2s linear infinite"
      },
      boxShadow: {
        'neon-sm': '0 0 5px currentColor',
        'neon': '0 0 10px currentColor',
        'neon-lg': '0 0 20px currentColor, 0 0 40px currentColor',
        'neon-primary': '0 0 10px hsl(var(--primary))',
        'neon-secondary': '0 0 10px hsl(var(--secondary))',
        'neon-accent': '0 0 10px hsl(var(--accent))',
      },
      textShadow: {
        'neon-sm': '0 0 5px currentColor',
        'neon': '0 0 10px currentColor',
        'neon-lg': '0 0 15px currentColor, 0 0 30px currentColor',
      },
      gridTemplateColumns: {
        'swiss-1': 'repeat(1, minmax(0, 1fr))',
        'swiss-2': 'repeat(2, minmax(0, 1fr))',
        'swiss-3': 'repeat(3, minmax(0, 1fr))',
        'swiss-4': 'repeat(4, minmax(0, 1fr))',
        'swiss-5': 'repeat(5, minmax(0, 1fr))',
        'swiss-6': 'repeat(6, minmax(0, 1fr))',
        'swiss-7': 'repeat(7, minmax(0, 1fr))',
        'swiss-8': 'repeat(8, minmax(0, 1fr))',
        'swiss-9': 'repeat(9, minmax(0, 1fr))',
        'swiss-10': 'repeat(10, minmax(0, 1fr))',
        'swiss-11': 'repeat(11, minmax(0, 1fr))',
        'swiss-12': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-neon-sm': {
          textShadow: '0 0 5px currentColor',
        },
        '.text-shadow-neon': {
          textShadow: '0 0 10px currentColor',
        },
        '.text-shadow-neon-lg': {
          textShadow: '0 0 15px currentColor, 0 0 30px currentColor',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 