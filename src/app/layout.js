// src/app/layout.js
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'PT. SORA & CO.',
  description: 'Fashion for Every Story - PT. SORA & CO.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
