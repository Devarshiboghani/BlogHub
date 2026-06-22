import "bootstrap/dist/css/bootstrap.min.css";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "BlogHub",
  description: "Discover amazing blogs about Technology, React and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
