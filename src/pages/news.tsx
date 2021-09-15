import Head from "next/head";
import { GetServerSideProps } from "next";
import React from "react";
import { NewsCard } from '../components/card/newsCard';
import { Navbar } from '../components/navbar';


const axios = require("axios");
const cheerio = require("cheerio");

export const getServerSideProps: GetServerSideProps = async () => {
  const crunchurollNewsUrl = "https://www.crunchyroll.com/en-gb/news";
  const crunchyrollUrl = "https://www.crunchyroll.com";
  const { data } = await axios.get(crunchurollNewsUrl);

  const $ = cheerio.load(data);
  console.log("calling scraper2");
  const listItems = $(".news-left ul .news-item");

  const newsTitles:Array<Object> = [];

  listItems.each((itx:any, el:any) => {
    const newsTitle = { key:"", h2: "", h3: "", author: "", newsUrl: "" };
    newsTitle.key = itx;
    newsTitle.h2 = $(el).children("h2").children("a").text();
    newsTitle.newsUrl = crunchyrollUrl + $(el).children("h2").children("a").attr('href');
    newsTitle.h3 = $(el).children("h3").children("a").text();
    newsTitle.author = $(el)
      .children(".news-header2")
      .children(".byline-and-post-date")
      .children("span")
      .children("a")
      .text();
    newsTitles.push(newsTitle);
  });
  // console.log(newsTitles);
  return {
    props: { newsTitles }, // will be passed to the page component as props
  };
};

export default function News({ newsTitles }: {newsTitles:any}) {
  // console.log(newsTitles);
  return (
    <div>
      <Head>
        <title>AniPins News</title>
        <meta name="description" content="News" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="bg-blue-200">
        <div className="flex flex-wrap flex-col items-center gap-5">
            {newsTitles.map((item:any, key:any) => (
              <NewsCard
                  key={key}
                  title={item.h2}
                  subtitle={item.h3}
                  author={item.author}
                  newsUrl={item.newsUrl}
                />
            ))}
        </div>
      </main>

      <footer>A footer</footer>
    </div>
  );
}
