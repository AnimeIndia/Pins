import React, { useState } from 'react';
import Link from 'next/link';
import {  useSetRecoilState } from 'recoil';
import { pixivImagesData, pixivModeState, pixivOffsetState } from '../shared/globalState';


const RankBar = () => {
  
const setMode = useSetRecoilState(pixivModeState);
const setImagesData =  useSetRecoilState(pixivImagesData);
const setOffset = useSetRecoilState(pixivOffsetState)
const [highlightTab, setHighLightTab] = useState('day');
const highLightColor = 'black';
const normalColor = '#258fb8';

  return (
      <div className="navBar px-60 flex items-center w-full gap-x-2">
        <Link href="/rank">
          <a className="flex-1 transition bg-transparent px-10 py-3 rounded font-normal text-black text-center border-none"
          style = {{color: `${highlightTab === 'day'?highLightColor:normalColor}`}}
          onClick = {() => {setMode('day'); setImagesData([]);setOffset(0);setHighLightTab('day');}}
          >Daily</a>
        </Link>
        <Link href="/rank">
          <a className="flex-1 transition bg-transparent px-10 py-3 rounded font-normal text-black text-center border-none"
          style = {{color: `${highlightTab === 'week'?highLightColor:normalColor}`}}
          onClick={() => {setMode('week'); setImagesData([]);setOffset(0);setHighLightTab('week');}}
          >Weekly</a>
        </Link>
      
        <Link href="/rank">
          <a className="flex-1 transition bg-transparent px-10 py-3 rounded font-normal text-black text-center border-none"
          style = {{color: `${highlightTab === 'month'?highLightColor:normalColor}`}}
          onClick={() => {setMode('month'); setImagesData([]);setOffset(0);setHighLightTab('month');}}
          >Monthly</a>
        </Link>

        <Link href="/rank">
          <a className="flex-1 transition bg-transparent px-10 py-3 rounded font-normal text-black text-center border-none"
          style = {{color: `${highlightTab === 'week_original'?highLightColor:normalColor}`}}
          onClick={() => {setMode('week_original'); setImagesData([]);setOffset(0);setHighLightTab('week_original');}}
          >Original</a>
        </Link>

        <Link href="/rank">
          <a className="flex-1 transition bg-transparent px-10 py-3 rounded font-normal text-black text-center border-none"
          style = {{color: `${highlightTab === 'week_rookie'?highLightColor:normalColor}`}}
          onClick={() => {setMode('week_rookie'); setImagesData([]);setOffset(0);setHighLightTab('week_rookie');}}
          >Rookie</a>
        </Link>

      </div>
  )
      
};

export { RankBar };
