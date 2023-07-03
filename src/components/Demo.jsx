import React, { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';

import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {

  // Current artcles
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  // All articles
  const [allArticles, setAllArticles] = useState([]);

  // Copy URL
  const [copied, setCopied] = useState("")

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Once reload the page, the datas will be deleted, 
  // To store the data on localstorage
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, [])
  

  const handleSubmit = async (e) => {
    // To avoid reload the app when we clicked
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      // Add the current article to the list of all articles
      const updatedAllArticles = [newArticle, ...allArticles];

      // Add the current single article
      setArticle(newArticle);
      console.log(newArticle);

      setAllArticles(updatedAllArticles);

      // Store the articles on localstorage
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000)
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
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img 
                  src={copied === item.url ? tick : copy}
                  className='copy-img w-[40%] h-[40%] object-contain' 
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-500 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Display the Summaries */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        { isFetching ? (
          // Loader image while fetching the data
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          // If getting any error
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen... 
            <br/>
            <span className='font-normal font-satoshi text-gray-600'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          // If its fetching and no any error will happens, then display the summary
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-bold font-satoshi text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-satoshi font-medium tracking-wider text-sm text-gray-600 '>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Copyrights section */}
      <p className='text-center text-gray-500'>
        © 2023 SumrzAI, All rights reserved by <a className='font-semibold orange_gradient opacity-80 transition duration-300 ease-in-out hover:opacity-100' href='https://vinojan.online' target='_blank'>Vinojan Abhimanyu</a>.
      </p>
    </section>
  )
}

export default Demo