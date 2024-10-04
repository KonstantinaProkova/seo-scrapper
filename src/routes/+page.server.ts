import { fail } from '@sveltejs/kit';
import * as cheerio from 'cheerio';

export const actions = {
    default: async ({request}) => {
        const formInfo = await request.formData();
        const url: string = formInfo.get("url") as string;

        try {
            if (url.length <= 0) {
                throw new Error("The url is empty. Please insert one.");
            }

            const $ = await cheerio.fromURL(url);

            const metaTitle = $('title').first().text();
            const h1 = $('h1').first().text();
            const canonicalUrl = $("link[rel='canonical']").first().attr('href')
            const metaDescription = $("meta[name='description']").first().attr('content') || "";
            const robots = $("meta[name='robots']").first().attr('content');

            const indexed = !robots?.includes("noindex");


            const data = {
                mainHeading : {success: !!h1?.length, content: h1, error: "You don't have an H1 in your page."},
                metaTitle : {success: !!metaTitle?.length, content: metaTitle, error: "You don't have a Meta Title in your page."},
                metaDescription : {success: !!metaDescription?.length, content: metaDescription, error: "You don't have a Meta Description in your page."},
                canonicalUrl : {success: !!canonicalUrl?.length, content: canonicalUrl, error: "You don't have a canonical URL in your page."},
                robots : {success: indexed, content: "Your URL is indexed.", error: "Your URL is not indexed"},
                metaTitleLength : {success: metaTitle?.length < 60, content: "", error: "Your Meta Title is over 60 characters"},
                metaDescriptionLength : {success: metaDescription?.length < 155, content: "", error: "Your Meta Description is over 155 characters"}
            };

            return {success: true, data: data};
        } catch (error:any) {
            return fail(300, {error: error.message});
        }
        
    },
}