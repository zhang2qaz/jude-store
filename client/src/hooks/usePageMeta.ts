import { useEffect } from "react";

type UsePageMetaOptions = {
  title: string;
  description: string;
  structuredData?: Record<string, unknown>;
};

const DESCRIPTION_SELECTOR = 'meta[name="description"]';
const STRUCTURED_DATA_ID = "jude-structured-data";

export function usePageMeta({ title, description, structuredData }: UsePageMetaOptions) {
  useEffect(() => {
    document.title = title;

    let descriptionMeta = document.querySelector(DESCRIPTION_SELECTOR) as HTMLMetaElement | null;
    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.name = "description";
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.content = description;

    const previousStructuredData = document.getElementById(STRUCTURED_DATA_ID);
    if (previousStructuredData) previousStructuredData.remove();

    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = STRUCTURED_DATA_ID;
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, structuredData]);
}
