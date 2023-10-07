import React from 'react';

const logo = require("./AudioSyncLogo.png");

function Logo()
{
   return(
     <img className="logo" src={logo}/>
   );
};

export default Logo;