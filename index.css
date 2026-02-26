@import "tailwindcss";

@theme {
  --font-sans: "Montserrat", ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  body {
    @apply bg-[#dde2e8] min-h-screen flex flex-col;
  }
}

@layer components {
  .field-container {
    @apply flex items-center border-[1.5px] border-[#c8d4de] border-l-4 border-l-[#f5a623] rounded-[3px] bg-white mb-4 transition-shadow duration-200;
  }
  
  .field-container:focus-within {
    @apply shadow-[0_0_0_3px_rgba(79,163,209,0.12)] border-[#a8c4d8];
  }

  .btn-ingresar {
    @apply w-full py-3.5 bg-[#7cc4e0] text-white font-semibold rounded-md cursor-pointer transition-all duration-200 hover:bg-[#5ab0d2] active:scale-[0.985] disabled:opacity-70 disabled:cursor-not-allowed;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.4s ease;
}
