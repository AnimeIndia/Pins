import React from "react";

type NewsProps = {
  title: string;
  subtitle: string;
  author?: string;
  newsUrl: string;
};

const NewsCard = (props: NewsProps) => (
  <div className="relative cursor-pointer rounded-2xl border-4 border-indigo-300 bg-gray-100 p-4 w-3/4" onClick={() => window.open(props.newsUrl, "_blank")}>
    <div className="text-xl font-bold	underline">{props.title}</div>
    <div className="text-base">{props.subtitle}</div>
    <div className="text-sm italic">Author: {props.author}</div>
    <div className="text-xs text-right italic">Source: Crunchyroll</div>
  </div>
);

export { NewsCard };
