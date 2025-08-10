import { writeFileSync } from "fs";
import { join } from "path";

const domain = "https://www.heydentie.com";

// List routes here
const pages = [
  "/",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    return `<url>
  <loc>${domain}${page}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`;
  })
  .join("\n")}
</urlset>`;

// Save in public/ so it’s served directly
writeFileSync(join(process.cwd(), "public", "sitemap.xml"), sitemap);

console.log("✅ Sitemap generated at public/sitemap.xml");
