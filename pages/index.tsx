import React from 'react';
import Head from 'next/head';
// import Image from 'next/image';
import { Inter } from '@next/font/google';
// import styles from '@/styles/Home.module.css';
import { WaveBG, wave, pointLight } from '../components/bg';


const inter = Inter({ subsets: ['latin'] })

function hoverGlow(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // console.log("mouse moved!");
    // console.log(e);
    var card:any = e.target;
    var card_container:any = card.parentElement;
    var glow = card.querySelector(".special-glow");
    var x_displacement = e.pageX - (card.getBoundingClientRect().left + window.scrollX) - (card.offsetWidth * 0.3);
    var y_displacement = e.pageY - (card.getBoundingClientRect().top + window.scrollY) - (card.offsetHeight * 0.45);
    var max_x = card.offsetWidth;
    var max_y = card.offsetHeight;
    card_container.style.transform = `scale(1.05) rotateX(${(x_displacement/18)}deg) rotateY(${y_displacement/15}deg)`;
    card_container.style.zIndex = 1000;
    glow.style.top = y_displacement + "px";
    glow.style.left = x_displacement + "px";
    console.log(e.pageX + "," + e.pageY + " AND " + card.pageX + "," + card.pageY + " AND " + x_displacement + "," + y_displacement);
}

function hoverEnd(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log("hoverEnd");
    var card:any = e.target;
    var card_container:any = card.parentElement;
    card_container.style.zIndex = 1;
    var glow = card.querySelector(".special-glow");
    card.style.transform = `scale(1) rotateX(0deg) rotateY(0deg)`;
    card_container.style.transform = `scale(1) rotateX(0deg) rotateY(0deg)`;
}
// export var animationEntities = new Map<string,boolean>();

function Footer() {
    return(
        <div className="footer w-screen h-48 bg-gray-800 cursor-default text-white">
            <div className="backdrop-blur-lg rounded-md border border-blue-700 p-2 ml-auto mr-auto max-w-2xl w-[56rem] bg-blue-900 h-[100%] opacity-100 relative top-[-40px] text-gray-300 self-center justify-self-center place-self-center font-mono">
                <p><span className="text-green-500">user@server</span>:<span className="text-blue-400">~</span>$ ./footer</p>
                    {"this is a footer"}
                    <p>click a link if you dare...</p>
                    <p>&zwnj;</p>
                <p>
                <span>
                    <a className="underline" href="https://github.com/genericallynamed">{"github"}</a> <a className="underline" href="https://www.linkedin.com/in/alexshandilis/">{"linkedin"}</a> <a className="underline" href="https://github.com/GenericallyNamed/dev-portfolio-2">{"source-code"}</a> <a className="underline" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">{"funny"}</a>
                </span>
                </p>
                <p>&zwnj;</p>
                <p className="blinkingCursor select-none">???</p>
            </div>
        </div>
    );
}

function Tags({tags}:{tags:{name:string, color:string}[]}) {
    return (
        <div className="absolute bottom-0 pointer-events-none flex-row flex ml-5 mb-5">
        {
            tags.map((tag:{name:string,color:string}) => (<div key={(tag.name)} style={{background:(tag.color)}} className="text-white pointer-events-none font-mono  rounded-sm p-1 mr-2">{tag.name}</div>))
        }
        </div>
    );
}

function Card({text, link, tags} : {text:string, link:string, tags:{name:string, color:string}[]}) {
    return (
        <a href={link}>
            <div className="rounded-md relative landing-card m-4 w-[100%] h-[100%] cursor-pointer justify-self-center overflow-hidden" onMouseMove={hoverGlow} onMouseLeave={hoverEnd}>
                <div className="relative border border-[rgb(190,190,190)] shadow-[0_0_20px_0.5px_rgba(255,255,255,0.1)] rounded-md bg-[rgb(25,25,25)] h-full">
                    <div className="transition pointer-events-none special-glow w-64 h-64 bg-[rgb(40,40,40)] blur-3xl absolute top-0 left-0"></div>
                    <h2 className="text-white pointer-events-none Franklin text-4xl font-semibold relative pl-6 pt-5">{text}</h2>
                    <Tags tags={tags}/>
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
                <div className="absolute z-100 h-screen w-screen" style={{background:"radial-gradient(rgba(0,0,0,0), rgba(0,0,0,0) 55%,#080808 75%) no-repeat"}}></div>
                <canvas id="special-canvas"></canvas>
            </div>
            <div className="absolute top-12 left-[50%] translate-x-[-50%]">
                <h1 className="text-white relative Baskerville font-extrabold text-4xl text-center select-none">
                Alex Shandilis
                </h1>
                <h2 className="text-white relative mt-96 text-center Baskerville font-semibold select-none">
                    coding / utility / entertainment
                </h2>
                <div className="ml-auto mr-auto select-none w-[56rem] h-[1290px] max-w-[95vw] rounded-md grid" style={{gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gridTemplateRows:"repeat(auto-fill,minmax(240px,1.2fr))", rowGap:"15px", columnGap:"15px"}}>
                    <Card tags={[{name:"typescript",color:"#007acc"},{name:"tailwind",color:"#52a8ac"},{name:"nextjs13",color:"black"},{name:"netlify",color:"blue"}]} text="portfolio" link="https://github.com/GenericallyNamed/dev-portfolio-2"/>
                    <Card tags={[{name:"javascript",color:"black"},{name:"python",color:"rgb(250,130,150)"},{name:"heroku",color:"blue"},{name:"flask",color:"grey"}]} text="nlp-translator" link="https://github.com/GenericallyNamed/f22_translator_flask_heroku_tutorial"/>
                    <Card tags={[{name:"javascript",color:"black"},{name:"mongoDB",color:"green"},{name:"node.js",color:"black"}]} text="a-bot370" link="https://github.com/rramboer/A-Bot"/>
                    <Card tags={[{name:"typescript",color:"#007acc"},{name:"algorithms",color:"purple"}]} text="pathstar" link="https://pathstar.shandilis.dev"/>
                    <Card tags={[{name:"javascript",color:"black"},{name:"css",color:"gray"}]} text="ripple.js" link="https://github.com/GenericallyNamed/ripple-effect"/>
                    <Card tags={[{name:"typescript",color:"#007acc"},{name:"threeJS",color:"orange"}]} text="freestuffclub" link="https://freestuffclub.neocities.org"/>
                    <Card tags={[{name:"playable",color:"red"},{name:"minecraft",color:"blue"}]} text="missingsandwich2" link="https://www.minecraftmaps.com/adventure-maps/the-missing-sandwich-ii"/>
                    <Card tags={[{name:"playable",color:"red"},{name:"minecraft",color:"blue"}]} text="annoyingghosts" link="https://www.youtube.com/watch?v=-4NOqVSOTAM"/>
                </div>
                <Footer/>
            </div>
        </div>
    </>
  )
}


setTimeout(() => {
    WaveBG(wave);
},50);

function blinkCharacter() {
    let cursor:HTMLParagraphElement = (document.querySelector(".blinkingCursor") as HTMLParagraphElement);
    cursor?.classList.toggle("blink");
    if(cursor !== null && cursor?.classList.contains("blink")) {
        cursor.style.color = "#1f3a87";
        // setTimeout(() => {
        //     blinkCharacter();
        // }, 400);
    } else if(cursor !== null) {
        cursor.style.color = "#d1d5db";
        // setTimeout(() => {
        //     blinkCharacter();
        // }, 800);
    }
        
    setTimeout(() => {
        blinkCharacter();
    }, 800);

}
setTimeout(function() {
    blinkCharacter();
}, 1000);
