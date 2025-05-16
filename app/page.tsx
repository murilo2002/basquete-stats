export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

import EstatisticasBasquete from "@/components/EstatisticasBasquete";

export default function Home() {
  return <EstatisticasBasquete />;
}
