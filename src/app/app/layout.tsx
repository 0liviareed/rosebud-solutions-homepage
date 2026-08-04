import theme from "./appTheme.module.css";

export default function AppAreaLayout({ children }: { children: React.ReactNode }) {
  return <div className={theme.theme}>{children}</div>;
}
