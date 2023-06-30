import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

// const options = {
//     method: 'GET',
//     url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
//     params: {
//         url: 'https://time.com/6266679/musk-ai-open-letter/',
//         length: '3'
//     },
//     headers: {
//         'X-RapidAPI-Key': 'dd7f820412msh3220d152eccb0c6p15532fjsnfe4dddafd832',
//         'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
//     }
// };

// If you wanna publish this site, people able to get your 'X-RapidAPI-Key'
// What's you insteat wanna do is, create a .env file and store there

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ 
        // which API do we want to call, In this case we are using RapidAPI
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            // articleUrl have to wrapped in a function for avoiding the special charectors errors
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
});

// Redux toolkit is automatically creates a hooks how of this endpoint

export const { useLazyGetSummaryQuery } = articleApi