import React from 'react';
import { logo } from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center item-center flex-col'>
      <nav className='flex justify-between items-centerw-full mb-10 pt-3'>
        <img src={logo} alt='Logo' className='w-28 object-contain' loading='lazy' />

        <button
          className='black_btn'
          type='button'
          onClick={() => window.open('https://dechorizon.com')}
        >
          GitHub
        </button>
      </nav>

      <div className='flex items-center flex-col'>
        <h1 className='head_text'>
          Summarize Articles with <br className='max-md:hidden' />
          <span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>

        <h2 className='desc'>
          Simplify your reading with Sumz, an open-source
          article summarizer that transforms lengthy articles
          into clear and concise summaries. 
        </h2>
      </div>
    </header>
  )
}

export default Hero