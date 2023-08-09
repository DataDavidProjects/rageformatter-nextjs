import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-t from-red-600 to-red-900 text-white py-5 mb-auto">
      <div className="container mx-auto px-5 lg:px-0 text-center">
        <h1 className="text-2xl mb-4 font-bold tracking-tight">
          RageFormatter
        </h1>

        <p className="text-xs leading-relaxed">
          Rageformatter converte quello che vorresti veramente dire al tuo capo
          e colleghi in un messaggio educato e costruttivo.
        </p>
      </div>
    </header>
  );
};

export default Header;
