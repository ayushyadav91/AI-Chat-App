import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


const Project = () => {
     const location = useLocation()
     console.log(location.state)

     const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

  return (
    <main className='h-screen w-screen flex'>

     <section className="left relative flex flex-col h-full min-w-96 bg-slate-300 ">
          <header className="flex justify-between p-2 px-4 w-full bg-slate-400">
               <button className="gap-2 text-black font-semibold ">
                    <i class="ri-add-fill">Add Collaborator</i>
               </button>
               <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
               className="p-2 ">
               <i class="ri-group-fill"></i>
               </button>
          </header>

          <div className="conversation-area flex-grow flex flex-col">
              <div className="message-box p-2  flex-grow flex flex-col gap-2">
               {/* creating message here */}
                     {/* this is incoming message */}
               <div className=" messages  max-w-56 flex flex-col p-2 bg-slate-50  w-fit rounded-md">
                    <small className='opacity-65 text-sm'>expample@gamil.com</small>
                    <p className='text-base font-medium '>This is another incoming message to demonstrate text wrapping within the message box.</p>
                    </div>
                     {/* this is outgoing message */}
                     <div className="ml-auto max-w-56 messages flex flex-col p-2 bg-slate-50  w-fit rounded-md">
                    <small className='opacity-65 text-sm'>expample@gamil.com</small>
                    <p className='text-base font-medium'>Hi, how are you? </p>
                    </div>


               </div> 

               {/* this is the input and send button filed */}
              <div className="inputField w-full flex">
                    <input className='p-3 px-7 border-none outline-none border-slate-400  flex-grow'
                    type="text" placeholder="Enter message" />
                    <button className='px-5 bg-slate-600 text-white'><i className="ri-send-plane-fill font-bold text-2xl hover:text-blue-500"></i></button>
              </div>
          </div>


         <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-300 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
         <header className='flex justify-end items-center px-4 p-2 bg-slate-400'>

                        <h1 className='font-semibold text-lg'>Collaborators</h1>
                 <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                        <i className="ri-close-fill"></i>
               </button>
          </header>

          <div className="users flex flex-col gap-2 ">
              <div className="user  cursor-pointer hover:bg-slate-400 flex gap-2 items-center">
                   <div className="aspect-square rounded-full  w-fit h-fit  flex items-center justify-center   p-4 text-white font-bold bg-slate-700">
                    <i class="ri-user-2-fill"></i>
                    </div>

                    <h1 className='font-semibold text-lg'>username</h1>
              </div>

          </div>


          </div> 


     </section>
     

      


    </main>
  )
}

export default Project
