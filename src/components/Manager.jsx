import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {

        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/closeye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"

        }
    }

    const savePassword = () => {
        setPasswordArray([...passwordArray,{ ...form, id: uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray,{ ...form, id: uuidv4()}]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
    }

    const deletePassword = (id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter
             (item=>item.id!==id)))
        }
       
    }

    const editPassword = (id) => {
        console.log("editing password with id", id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <div className='p-2 md:p-0 md:mycontainer'>
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className=' flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder="Enter website URL" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="site" id='site' />
                    <div className='flex w-full flex-col md:flex-row justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id='username' />
                        <div className='relative'>

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-0.5 top-0.5 cursor-pointer' onClick={showPassword} >
                                <img ref={ref} className=' px-2' width={50} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>


                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show </div>}
                    {passwordArray.length != 0 && <table className='table-auto w-full rounded-md overflow-hidden'>
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>

                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center w-32'><a href={item.site} target='_blank'>{item.site}</a></td>
                                    <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                                    <td className='py-2 border border-white text-center w-32'>{item.password}</td>
                                    <td className='justify-center py-2 border border-white text-center flex'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                        </svg>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                        </svg>

                                        </span>
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>}




                </div>
            </div>
        </>

    )
}

export default Manager;