import React from 'react';

const Loading = () => {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF2DF] via-[#FFE0B2] to-[#D3A376]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#3E2522] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#3E2522] text-lg font-semibold animate-pulse">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
};

export default Loading;