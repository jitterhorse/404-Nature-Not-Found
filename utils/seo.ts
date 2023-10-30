import {UseSeoMetaInput} from "@unhead/schema";

export const seoDefaults: UseSeoMetaInput = {
    description: '404 - Natur nicht gefunden / Nature not found || Digitale Skulptur zur Renaturierung der Emscher und zur Natur aus zweiter Hand. ', 
    ogImage: './assets/img/404_preview.jpg', 
    twitterCard: 'summary_large_image',
}

export const useSimplifiedSeo = ({ title, ...seoOptions }: { title: string } & UseSeoMetaInput) => {
    useSeoMeta({
        ...seoDefaults,
        title,
        ogTitle: title,
        ogDescription: seoDefaults.description,
        ...seoOptions,
    })
}
