// 為靜態導出生成所有可能的路徑
export function generateStaticParams() {
  return [
    { mode: 'hiragana' },
    { mode: 'katakana' },
    { mode: 'n5_words' },
    { mode: 'phrases' },
    { mode: 'numbers' },
    { mode: 'travel' },
  ];
}

export default function ModeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

