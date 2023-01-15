import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { WaveBG, wave, pointLight } from './components/bg';


const inter = Inter({ subsets: ['latin'] })

// export var animationEntities = new Map<string,boolean>();

function Card({text, link}) {
    return (
        <a href={link}>
            <div className="m-4 w-[100%] h-[100%] cursor-pointer justify-self-center overflow-hidden">
                <div className="relative border border-[rgb(190,190,190)] shadow-[0_0_20px_0.5px_rgba(255,255,255,0.1)] rounded-md bg-[rgb(25,25,25)] h-full">
                    <div className="w-64 h-64 bg-[rgb(40,40,40)] blur-3xl absolute top-0 left-0"></div>
                    <h2 className="Franklin text-4xl font-semibold relative pl-6 pt-5">{text}</h2>
                </div>
            </div>
        </a>
    );
}


export default function Home() {
  return (
    <>
      <Head>
        <title>Alex Shandilis</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="index-container">
        <div id="index-bg" className="absolute h-screen w-scren bg-black">
            <div className="absolute z-100 h-screen w-screen" style={{background:"radial-gradient(rgba(0,0,0,0),#080808 90%) no-repeat"}}></div>
            <canvas id="special-canvas"></canvas>
        </div>
        <div className="absolute top-12 left-[50%] translate-x-[-50%]">
            <h1 className="relative Baskerville font-extrabold text-4xl text-center select-none">
            Alex Shandilis
            </h1>
            <h2 className="relative mt-96 text-center Baskerville font-semibold select-none">
                coding / utility / entertainment
            </h2>
            <div className="select-none w-[56rem] h-[2000px] max-w-[95vw] rounded-md grid" style={{gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gridTemplateRows:"repeat(auto-fill,minmax(240px,1.2fr))", rowGap:"15px", columnGap:"15px"}}>
                <Card text="portfolio" link="/"/>
                <Card text="a-bot370" link="https://github.com/rramboer/A-Bot"/>
                <Card text="pathstar" link="https://pathstar.shandilis.dev"/>
                <Card text="modernripple" link="https://github.com/GenericallyNamed/ripple-effect"/>
                <Card text="freestuffclub" link="https://freestuffclub.neocities.org"/>
                <Card text="missingsandwich2" link="https://www.minecraftmaps.com/adventure-maps/the-missing-sandwich-ii"/>
                <Card text="annoyingghosts" link="https://www.youtube.com/watch?v=-4NOqVSOTAM"/>
            </div>
        </div>
      </div>
    </>
  )
}


setTimeout(() => {
    WaveBG(wave);
},300);
