import React, { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';

import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {

  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    // To avoid reload the app when we clicked
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      setArticle(newArticle);
      console.log(newArticle);
    }
  }
  
  return (
    <section className='mt-16 w-full max-w-xl'>
      
      {/* Search bar */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img 
            src={linkIcon} 
            alt='Link icon' 
            loading='lazy' 
            className='absolute left-0 my-2 ml-3 w-5' 
          />
          <input
            type='url'
            placeholder='Enter the Article URL'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />

          <button
            type='submit'
            className='submit_btn peer-focus:text-gray-700'
          >
            📝⏎
          </button>
        </form>

        {/* Browser URL History */}

      </div>

      {/* Display the Summaries */}
    </section>
  )
}

export default Demo