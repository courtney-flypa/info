'use client';

interface OptionButtonProps {
  text: string;
  onClick: () => void;
  isCorrect?: boolean;
  isWrong?: boolean;
  disabled?: boolean;
}

export default function OptionButton({
  text,
  onClick,
  isCorrect,
  isWrong,
  disabled
}: OptionButtonProps) {
  const getClassName = () => {
    let base = 'bg-white border border-gray-200 px-4 py-4 rounded-xl text-base cursor-pointer transition-all font-medium text-gray-800 min-h-[60px] flex items-center justify-center shadow-sm hover:shadow';
    
    if (disabled) {
      base += ' cursor-not-allowed opacity-50';
    }
    
    if (isCorrect) {
      base = 'bg-green-500 text-white border-green-500 shadow-md';
    } else if (isWrong) {
      base = 'bg-red-500 text-white border-red-500 opacity-70';
    } else {
      base += ' hover:border-pink-300 hover:bg-pink-50';
    }
    
    return base;
  };

  return (
    <button
      className={getClassName()}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
