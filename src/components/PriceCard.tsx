import React from 'react'

interface Plan {
    name?: string;
    description: string;
    advantages: string[];
    price?: string;
    note: string;
  }


  const PriceCard= ({plan}: any) => {
    function planNote(note:string){
      if (note){
        return (
          <div className="rounded-md py-1 px-2 text-xs font-medium flex space-x-1 bg-gray-50 text-gray-500 dark:text-gray-800">
              {plan.note}
          </div>
          )    
      }
      else
      {
        return ("")
      }
    }
    return (
      <div data-cy="subscription-plan" className="
      relative flex flex-col justify-between space-y-6 rounded-xl
      p-6 lg:w-4/12 xl:p-8 2xl:w-3/12 xl:max-w-xs
    border-gray-100 dark:border-dark-900 border-2">
        <div className="flex flex-col space-y-2.5">
          <div className="flex items-center space-x-6">
            <h3 className="font-heading scroll-m-20 text-2xl font-semibold tracking-tight">
              <b className="font-semibold">{plan.name}</b>
            </h3>
            {planNote(plan.note)}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{plan.description}</span>
        </div>
        <div className="flex items-end space-x-1">
          <div className="animate-in duration-500 slide-in-from-left-4 fade-in">
            <span className="text-2xl font-bold lg:text-3xl xl:text-4xl">${plan.price.amount}</span>
          </div>
          <span className="text-lg lowercase text-gray-500 dark:text-gray-400">
            <span>/</span>
            <span>Once off</span>
          </span>
        </div>
        <div className="text-current">
          <ul className="flex flex-col space-y-2">
            {plan.advantages?.map((item: string) => {
              return (
                <li key={item} className="flex items-center space-x-3 font-medium">
                  <div>
                    <svg  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="bottom-0 left-0 w-full p-0">
          <button tabIndex={-1} className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:[&amp;>*]:translate-y-0.5 border border-input bg-background hover:bg-blue-800 hover:bg-accent hover:text-accent-foreground text-sm h-10 [&amp;>*]:py-2 [&amp;>*]:px-4 w-full bg-blue-500">
            <a className="flex w-full h-full items-center transition-transform duration-500 ease-out text-white" href="/auth/sign-up?utm_source=price_1OJ7rFJv7IPpWIYe8ZOeYodv">
              <span className="flex w-full flex-1 items-center justify-center">Get Started</span>
            </a>
          </button>
        </div>
      </div>
    );
  };
  
  export default PriceCard;