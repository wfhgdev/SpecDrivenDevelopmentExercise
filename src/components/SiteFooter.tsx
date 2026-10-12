import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        {site.name} &copy; {new Date().getFullYear()} — insert coin to continue
      </p>
    </footer>
  );
}
