import { useNavigate } from "react-router-dom";
import HERO_IMG from "../assets/hero-img.png"
import { APP_FEATURES } from "../utils/data.js"
import { useState } from "react";
import {LuSparkles} from "react-icons/lu"

export default function LandingPage(){
    const navigate=useNavigate();
    const [openAuthModal,setopenAuthModal]=useState(false);
    const [currentPage,setCurrentPage]=useState("login");
    const handleCTA=()=>{};
    return (
        <>
        <div className="w-full min-h-full bg-[#FFFCEF]">
            <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0">

            </div>
            <div className="container mx-auto px-4 pt-6 pt-6 pb-[200px] relative z-10">
                <header className="flex justify-between items-center mb-16">
                    <div className="text-xl text-black font-bold">
                        CareerPrep
                    </div>
                    <button className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5  rounded-full hover:bg-black hover:text-white border-white transition-color cursor-pointer" onClick={()=>setopenAuthModal(true)}>Login / Sign Up</button>
                </header>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
                        <div className="flex items-center justify-left mb-2">
                            <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                              <LuSparkles/>  AI Powered
                            </div>
                        </div>
                        <h1 className="text-5xl text-black font-medium mb-6 leading-tight">Interview Success Through <br>
                        </br>
                        <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                            Al-Powered
                        </span>{""}
                        Learning
                        
                        </h1>
                    </div>
                    <div className="w-full md:w-1/2">
                        <p className="text-[17px text-gray-900 mr-0 md:mr-20 mb-6">
                            Get specific questions,expand answers when you need them,
                            Contains better concept. From preparation to mastery- you ultimate interview tools. </p>
                            <button className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border boder-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer" onClick={handleCTA}>Get Started</button>
                    </div>
                </div>

            </div>


        </div>
        <div className="w-full min-h-full relative z-10 mb-56">
            <div>
                <section className=" flex items-center justify-center -mt-36">
                    <img src={HERO_IMG} alt="hero" className="w-[80vw] rounded-lg"/>
                </section>
            </div>
        </div>
        <div className="w-full min-h-full bg-[#FFFCEF] MT-10">
            <div className="container mx-auto px-4 pt-10 pb-20">
                <section className="mt-5">
                    <h2 className="text-2xl font-medium text-center mb-12">Tools which will help you..</h2>
                
                <div className="flex flex-col items-center gap-8">
                    <div className="grid grid-col-1 md:grid-cols-3 gap-8 w-full">
                        {APP_FEATURES.slice(0,3).map((feature)=>(
                            <div key={feature.id} className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-lg shadow-amber-100  transition border border-amber-100">
                                <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                                </div>
                        ))}
                    </div>
                    {/* Remainig 6 cards */}
                    <div className="grid grid-col-1 md:grid-cols-2 gap-8">
                        {APP_FEATURES.slice(3).map((feature)=>(
                            <div key={feature.id} className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                                <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>

                            </div>
                        ))}
                    </div>
                </div>
                </section>
            </div>
        </div>
        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">Made with Love...</div>
        <Model
        
        />

        </>






    );
}