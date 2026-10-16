import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/settings/",
        "/feedback/",
        "/qr-studio/",
        "/onboarding/",
        "/admin-vault/",
        "/admin/",
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || "https://smartreview-flame.vercel.app"}/sitemap.xml`,
  };
}
