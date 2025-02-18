import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../config/axios'

const Project = () => {
  const location = useLocation()
  console.log(location.state)

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState([])
  const [users, setUsers]= useState([])
  const[project, setProject] = useState(location.state.project)





  const handleUserClick = (id) => {
    setSelectedUserId(prevSelectedUserId=>{
     const newSelectedUserId = new Set(prevSelectedUserId);
     if(newSelectedUserId.has(id)){
          newSelectedUserId.delete(id);
     } else{
          newSelectedUserId.add(id);
     }
   return newSelectedUserId;
    })
  
  }

  function addColloborator(){
     axios.put("/projects/add-user",{
          projectId:location.state.project._id,
          users:Array.from(selectedUserId)
     }).then(res =>{
          console.log(res.data)
     setIsModalOpen(false)
     }).catch(err =>{
          console.log(err)
     })

  }


  useEffect(()=>{

     axios.get(`/projects/get-project/${location.state.project._id}`).then(res =>{
          setProject(res.data.project)
     }).catch(err=>{
          console.log(err)
     })




   axios.get('/users/all').then(res =>{
     setUsers(res.data.users)
   }).catch(err =>{
    console.log(err)
   })
  },[])

  return (
    <main className='h-screen w-screen flex'>
      <section className="left relative flex flex-col h-full min-w-96 bg-slate-300 ">
        <header className="flex justify-between p-2 px-4 w-full bg-slate-400">
          <button onClick={() => setIsModalOpen(true)} className="gap-2 text-black font-semibold ">
            <i className="ri-add-fill">Add Collaborator</i>
          </button>
          <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className="p-2 ">
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col">
          <div className="message-box p-2 flex-grow flex flex-col gap-2">
            {/* creating message here */}
            {/* this is incoming message */}
            <div className="messages max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className='opacity-65 text-sm'>expample@gamil.com</small>
              <p className='text-base font-medium '>This is another incoming message to demonstrate text wrapping within the message box.</p>
            </div>
            {/* this is outgoing message */}
            <div className="ml-auto max-w-56 messages flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className='opacity-65 text-sm'>expample@gamil.com</small>
              <p className='text-base font-medium'>Hi, how are you? </p>
            </div>
          </div>

          {/* this is the input and send button filed */}
          <div className="inputField w-full flex">
            <input className='p-3 px-7 border-none outline-none border-slate-400 flex-grow' type="text" placeholder="Enter message" />
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
            <div className="user cursor-pointer hover:bg-slate-400 flex gap-2 items-center">
              <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-4 text-white font-bold bg-slate-700">
                <i className="ri-user-2-fill"></i>
              </div>
              <h1 className='font-semibold text-lg'>username</h1>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
              <header className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>Select User</h2>
                <button onClick={() => setIsModalOpen(false)} className='p-2'>
                  <i className="ri-close-fill"></i>
                </button>
              </header>
              <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                {users.map(user => (
                  <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center ${Array.from(selectedUserId).indexOf(user._id)!= -1?"bg-slate-200":""}`} onClick={() => handleUserClick(user._id)}>
                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                      <i className="ri-user-fill absolute"></i>
                    </div>
                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                  </div>
                ))}
              </div>
              <button
               onClick={addColloborator}
          //     onClick={() => setIsModalOpen(false)}
              className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Project