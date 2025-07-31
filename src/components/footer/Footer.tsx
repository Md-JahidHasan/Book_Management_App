import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-[#3E2522] text-[#FFF2DF] w-full   border-t border-[#8C6E63]/30">
        <div className="max-w-full mx-auto px-4 py-12 text-center">
          <p className="text-base font-medium">
            &copy; {new Date().getFullYear()} MyLibrary. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Designed with ❤ By Jahid.
          </p>
        </div>
      </footer>
    );
};

export default Footer;