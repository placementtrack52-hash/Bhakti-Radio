import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  id?: string;
}

const variants = {
  primary:
    'bg-gradient-to-r from-[#FF6B00] to-[#D4A843] text-white hover:from-[#FF8C38] hover:to-[#E8C76A] shadow-lg hover:shadow-[0_0_20px_rgba(255,107,0,0.4)]',
  secondary:
    'glass border border-[rgba(212,168,67,0.3)] text-[#d4a843] hover:bg-[rgba(212,168,67,0.1)] hover:border-[rgba(212,168,67,0.6)]',
  ghost:
    'text-[#d4a843] hover:text-white hover:bg-white/10',
  gold:
    'bg-gradient-to-r from-[#D4A843] to-[#FF6B9D] text-white hover:from-[#E8C76A] hover:to-[#FFB3CE] shadow-lg',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ariaLabel,
  id,
}: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        inline-flex items-center justify-center gap-2
        font-[family-name:var(--font-cinzel)] font-semibold rounded-full
        transition-all duration-300 cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0808]
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
