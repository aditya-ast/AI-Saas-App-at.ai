import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets.js'
import { Gem, Sparkles } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../component/CreationItem.jsx'
import axios from "axios";
import toast from 'react-hot-toast'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const {getToken} = useAuth()

  const getDashboardData = async () => {
    try {
      const {data} = await axios.get('/api/user/get-user-creations',{
        headers : {Authorization: `Bearer ${await getToken()}`}
      })

      if(data.success){
        setCreations(data.creations)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)

  }

  useEffect(() => {
    getDashboardData()
  }, [])
  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-1 drop-shadow-sm">Your AI Dashboard </h1>
            <p className="text-gray-500 text-lg max-w-xl"> Stay productive and let AI help you achieve more every day!</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white rounded-xl shadow border border-gray-200 px-6 py-3 min-w-[250px]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] flex items-center justify-center">
              <Sparkles className="w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Creations</p>
              <h2 className="text-xl font-bold text-blue-800">{creations.length}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl shadow border border-gray-200 px-6 py-3 min-w-[250px]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] flex items-center justify-center">
              <Gem className="w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Plan</p>
              <h2 className="text-xl font-bold text-purple-700"><Protect plan={'premium'} fallback="Free">Premium</Protect></h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Creations Section */}
      <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></span>
          Recent Creations
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="w-11 h-11 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></span>
          </div>
        ) : (
          creations.length === 0 ? (
            <div className="text-center text-gray-400 py-10 text-lg">No creations yet. Start using the AI tools to see your work here!</div>
          ) : (
            <div className="space-y-4">
              {creations.map((item) => <CreationItem key={item.id} item={item} />)}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Dashboard