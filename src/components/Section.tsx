import React from 'react';

const Section = ({ title, subtitle, description, items, imageUrl }: { title: string, subtitle: string, description: string, items: any, imageUrl: string }) => {
  return (
    <section className="relative block px-6 py-10 md:py-20 md:px-10 ">
      <div className="relative mx-auto max-w-7xl flex flex-wrap justify-between flex-row">
        <div className="sm:text mx-auto max-w-lg text-center md:w-1/2 md:text-left">
          <span className="text-main my-3 block font-medium uppercase tracking-wider">{title}</span>
          <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">{subtitle}</h2>
          <p className="my-4 bg-transparent font-medium leading-relaxed tracking-wide text-gray-400">{description}</p>
          <div className="my-8 mx-auto flex max-w-md flex-wrap justify-center gap-3 text-xs text-gray-400 md:mx-0 md:justify-start">
            {items?.map((item: any, index: any) => (
              <div key={index} className="flex items-center justify-center gap-2 rounded-md border border-neutral-700/30 bg-neutral-800/50 py-1 px-3 ">
                {item?.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2 md:px-8">
          <div className="rounded-lg  px-20 py-10 bg-gradient-to-r from-indigo-600 to-red-600">
            <div className="relative inline-block overflow-hidden rounded-lg border-neutral-800 border">
              <img alt="" src={imageUrl} width="250" height="257" decoding="async" data-nimg="1" className="inline-block color-transparent" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
