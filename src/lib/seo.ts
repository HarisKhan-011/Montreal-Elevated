export const SITE_NAME = "Nachal Realty";
export const SITE_URL = "https://nachalrealty.com";

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
};

function absoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function createSeo({
  title,
  description,
  path = "/",
  image = "/og-image.jpg",
  imageAlt = "Montreal skyline and Nachal Realty",
}: SeoOptions) {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(image);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_CA" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: socialImage },
      { property: "og:image:width", content: "1600" },
      { property: "og:image:height", content: "900" },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
