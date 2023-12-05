"use client"
import React, { use, useEffect, useState } from 'react'
 import { Poppins,Inter } from 'next/font/google'
 import { Separator } from "@/components/ui/separator"
 import { Button } from '@/components/ui/button'
 import { ModeToggle } from '@/components/ModeToggler'
 import { UserButton, useAuth } from "@clerk/nextjs";
import Image from 'next/image'
import { toast } from 'react-hot-toast';
import { ArrowUpRight, Heart, Loader2, LogIn, LucideHeart, X } from 'lucide-react'
import PlayGround from '@/components/PlayGround'
// import {PlayGround} from '@/components/PlayGround'


type Props = {}
const poppins = Poppins({
  subsets: ['latin'],
  weight: '300'
})
const inter = Inter({ subsets: ['latin'] })
const Home = (props: Props) => {
  const [showModalTerms, setShowModalTerms] = useState(false);
  const [notified, setNotified] = useState(false);
  const { isLoaded, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = React.useState(false)
const [user, setUser] = useState<null | { name: string }>(null);
const [name, setName] = React.useState("")

useEffect(() => {
  setTimeout(() => {
    setIsLoading(false);
  }
  , 3000);
}
, []);

useEffect(() => {
  if(userId){
    setIsAuth(true)
    
  }
  else{
    setIsAuth(false)
  }

}

, [
  userId,
  isAuth
]);
useEffect(() => {


  if(localStorage.getItem("notified")){
    console.log("note", localStorage.getItem("notified"));
    
    setShowModalTerms(false)
  }
  else{
    setTimeout(() => {
      localStorage.setItem("notified", "true")
      setShowModalTerms(true)
    }
    , 3000);
  }
  
}
, []);

useEffect(() => {
  if(showModalTerms){
    setNotified(true)
    localStorage.setItem("notified", "true")

  }
  else{
    setNotified(false)
  }

}

, [notified]);

  const login = () => {
    setIsLoading(true)
    toast.success('Redirecting to login..', {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
   setTimeout(() => {

    setIsLoading(false)
    window.location.href = "/sign-in"
   }
    , 1000);

     
  }
  const signup = () => {
    setIsLoading(true)
    toast.success('Redirecting to sign up..', {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
    setTimeout(() => {
      setIsLoading(false)
        window.location.href = "/sign-up"
      }
        , 1000);
  }

  return (

    <div className=" min-h-screen m-auto flex items-center justify-center flex-col relative overflow-x-hidden">
     
      <div className='top-0  right-0 fixed mb-3  p-4 flex justify-end items-center gap-x-3 bg-black bg-opacity-50 left-0 z-20 '>
        {
          isAuth && (
            <div className="flex items-center gap-x-3">
              {/* < p className="text-neutral-600">Hello, {user?.name}</p> */}
           
             {
              !isLoaded ?(
                <div className="animate-pulse">
                <Loader2 className="h-7 w-7 animate-spin" />
                </div>
              ):(
                <UserButton  afterSignOutUrl="/"/>
              )

             }
              {/* <Button variant="outline" onClick={logout}>Logout</Button> */}
            </div>
          )
        }
  {
          !isAuth && (
            <div className="flex items-center gap-x-3">
            <Button variant="outline" className='smooth' onClick={login}>
              {
                isLoading ? (
                  <Loader2 className="h-7 w-7 animate-spin" />
                ):(
                  <>
                  Sign In
                  {/* <LogIn className="h-7 w-7" /> */}
                  <LogIn className="h-7 w-7" />
                  </>
                )
              }
            </Button>
            <Button onClick={signup} className='smooth'>
              {
                isLoading ? (
                  <Loader2 className="h-7 w-7 animate-spin" />
                ):(
                  <>
                  Sign Up
                  {/* <SignUpIcon className="h-7 w-7" /> */}
                  <ArrowUpRight className="h-7 w-7" />
                  </>
                )
              }
            </Button>
          </div>

          )
        }

      <ModeToggle />
      </div>
      {
        showModalTerms && (
          <div className="fixed smooth top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-70">
          <div className="bg-white dark:bg-neutral-950 rounded-lg p-4 w-11/12 sm:w-[400px]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Terms</h2>
              <button
                onClick={() => setShowModalTerms(false)}
                className="text-neutral-500 dark:text-neutral-400"
              >
                <X size={24} />
              </button>
            </div>
            <div className="my-4 relative" />
            <div className="flex flex-col gap-y-4">
            We do not store any of your data. 
            <br />
            We do not sell your data.
            <br />
            <br />
            No database is used to store your data.
            </div>
            <div className="my-4 relative" />
            <div className="flex justify-end">
              <Button onClick={() => setShowModalTerms(false)}>Got it</Button>
            </div>
          </div>
        </div>
        )
      }
     {/* Playground */}
     { 
      !isAuth && (
         <div className=" ">

        <div className={inter.className}>
      
      <h1 className="text-[1.8rem] sm:text-4xl lg:text-[3rem] py-1 md:font-extrabold lg:leading-[3.2rem] font-bold bg-gradient-to-r from-blue-950 via-neutral-900 dark:via-neutral-400 to-blue-700 dark:to-white bg-clip-text text-transparent  leading-8 smooth " >Organize Your Gallery.</h1>
      </div>
      <div className=' my-2  mx-auto' />
      <div className={poppins.className}>
        <div className='flex flex-col  justify-center items-center'>
      <p className=" text-xl font-extrabold sm:text-center text-center smooth">Create your own gallery.</p>
      <p className=" text-lg font-bold sm:text-center text-center smooth">Upload your photos and organize.</p>
      <Button className="mt-4 smooth"
      
      onClick={signup}
      >
        {
           isLoading &&(
            <Loader2 className="h-7 w-7 animate-spin" />
           )
        }

        {
          !isLoading && 
           (
            isAuth ? (
               "Welcome buddy"
            ):(
             <>
              Get Started
              {/* <SignUpIcon className="h-7 w-7" /> */}
              <ArrowUpRight className="h-7 w-7" />

             </>
             
            
            )
           )
        }
      </Button>

      </div>
      </div>

    </div>
      )
     }

     {
       isAuth && (
        <div className='my-16 sm:mt-20 overflow-x-hidden'>
        <PlayGround/>
        </div>
        
       )
     }
   
  

    
      {/* end of playground */}
      <div className='my-7' />
      <div className=" mt-6 ">
      <Separator  className='my-3'/>
      <div className={poppins.className}>
       <p className="text-sm font-bold text-center  flex justify-center items-center flex-row">Created with
          <LucideHeart size={30}  className='text-blue-700  mx-2 '/> 
          <a className="text-neutral-600 px-1" href="https://francismwaniki.tech">Love.</a></p>
      </div>
      </div>
    </div>
      
  )
}

export default Home