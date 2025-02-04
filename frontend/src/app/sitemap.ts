import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: "https://respet.vercel.app",
            lastModified: new Date().toISOString(),
        },
    ];
}
