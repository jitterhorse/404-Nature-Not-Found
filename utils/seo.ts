import {UseSeoMetaInput} from "@unhead/schema";

export const seoDefaults: UseSeoMetaInput = {
    description: '404 Nature not Found is an art project.', // todo: short description
    ogImage: 'https://example.com/image.png', // todo: suitable image for social media
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
