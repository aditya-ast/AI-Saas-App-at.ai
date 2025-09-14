import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Users } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  // Fetch community creations
  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
    // eslint-disable-next-line
  }, [user]);

  return !loading ? (
    <div className="min-h-screen bg-white py-10 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-1 drop-shadow-sm flex items-center justify-center gap-2">
          <Users className="w-8 h-8 text-blue-500 bg-white rounded-full p-1 shadow" />
          Community Creations
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">See what the community is creating with AI tools!</p>
      </div>
      {/* Community Creations List */}
      <div className="bg-white/80 rounded-2xl shadow-lg p-6 border border-gray-100 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2"></span>
          Recent Community Creations
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="w-11 h-11 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></span>
          </div>
        ) : (
          creations.length === 0 ? (
            <div className="text-center text-gray-400 py-10 text-lg">No community creations yet. Be the first to share your work!</div>
          ) : (
            <div className="space-y-4">
              {creations.map((item) => <CreationItem key={item.id} item={item} />)}
            </div>
          )
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <span className="w-10 h-10 my-1 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></span>
    </div>
  );
};

export default Community;