import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/component/header';
import Providers from '@/provider';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Atividades',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  return (
    <html lang="pt-br">
      <body className={`${inter.className}`}>
        <Providers session={session}>
          <div className="min-w-dvw flex min-h-dvh flex-col">
            <Header />

            <main className="flex flex-1 flex-col gap-6 p-10">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
