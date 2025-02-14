import React from 'react';
import { Loader2 } from 'lucide-react';

const Propose = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#B4F481] mb-8">
            PROPOSE
          </h1>
          <div className="bg-gray-900/50 rounded-lg p-12 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 text-[#B4F481] animate-spin mb-4" />
            <p className="text-gray-400 text-xl">
              Coming Soon
            </p>
            <p className="text-gray-500 mt-2">
              Submit and vote on proposals to shape the future of Regen Bazaar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Propose;