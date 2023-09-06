import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav"
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({children}) {
  const [showNav,setShowNav] = useState(false);
  const { data: session } = useSession();
  if(!session) {
    return (
      <div className='bg-primary w-screen h-screen flex items-center'>
      <div className='text-center w-full'>
        <button onClick={() => signIn('google')} className='bg-white p-2 px-4 rounded-lg'>Login with Google</button>
      </div>
    </div>
    )
  }
  return (
    <div className="bg-primary min-h-screen ">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 64 64">
            <linearGradient id="bfHxmkKXfDM_oIsKLNWwva_48311_gr1" x1="22.345" x2="22.345" y1="13.833" y2="27.842" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset="1" stop-color="#e6abff"></stop></linearGradient><path fill="url(#bfHxmkKXfDM_oIsKLNWwva_48311_gr1)" d="M32,14v10.01c0,1.099-0.891,1.99-1.99,1.99H12.69C14.98,18.16,22.76,14,32,14z"></path><linearGradient id="bfHxmkKXfDM_oIsKLNWwvb_48311_gr2" x1="32" x2="32" y1="6.833" y2="58.727" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#bfHxmkKXfDM_oIsKLNWwvb_48311_gr2)" d="M58,32v-1c0-2.426-0.349-4.718-1-6.851V24h-0.043C53.922,14.311,44.503,8,32,8 C16.691,8,6,17.458,6,31v1h3v2H7v1c0,1.958,0.81,3.729,2.111,5H9v4H7v2h2v2H6v3c0,2.757,2.243,5,5,5h42c2.757,0,5-2.243,5-5v-3h-3 v-2h2v-2h-2v-4h-0.111C56.19,38.729,57,36.958,57,35v-1h-2v-2H58z M32,10c9.388,0,16.89,3.815,20.871,10H46v2h7.996 c0.313,0.646,0.587,1.314,0.829,2H50v2h5.414c0.306,1.28,0.504,2.612,0.564,4H8.022C8.539,18.172,18.253,10,32,10z M11,36h7.899 c-0.465,2.279-2.484,4-4.899,4c-2.415,0-4.435-1.721-4.899-4H11z M56,50v1c0,1.654-1.346,3-3,3H11c-1.654,0-3-1.346-3-3v-1h1h46H56z M53,48H11v-2h42V48z M53,44H11v-2.685C11.911,41.75,12.926,42,14,42c2.548,0,4.775-1.373,6-3.413C21.225,40.627,23.452,42,26,42 s4.775-1.373,6-3.413C33.225,40.627,35.452,42,38,42s4.775-1.373,6-3.413C45.225,40.627,47.452,42,50,42c1.074,0,2.089-0.25,3-0.685 V44z M21.101,36h9.798c-0.465,2.279-2.484,4-4.899,4S21.566,38.279,21.101,36z M33.101,36h9.798c-0.465,2.279-2.484,4-4.899,4 S33.566,38.279,33.101,36z M50,40c-2.414,0-4.434-1.721-4.899-4H54h0.899C54.435,38.279,52.415,40,50,40z M53,34H11v-2h42V34z"></path>
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
    <div className='bg-primary min-h-screen flex'>
      <Nav show={showNav} />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
      </div>
    </div>
    </div>
  )
}
