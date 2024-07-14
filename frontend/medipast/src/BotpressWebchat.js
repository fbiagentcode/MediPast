import React, { useEffect } from 'react';

const BotpressWebchat = () => {
  useEffect(() => {
    const existingScript = document.getElementById('botpress-webchat-script');
    const existingConfigScript = document.getElementById('botpress-config-script');
    
    if (!existingScript && !window.botpressWebchatInitialized) {
      const script = document.createElement('script');
      script.id = 'botpress-webchat-script';
      script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
      script.async = true;
      document.body.appendChild(script);
      console.log('Webchat script added');
      
      window.botpressWebchatInitialized = true;
    }
    
    if (!existingConfigScript && !window.botpressConfigInitialized) {
      const configScript = document.createElement('script');
      configScript.id = 'botpress-config-script';
      configScript.src = 'https://mediafiles.botpress.cloud/cf4e6678-7acf-42cb-8bbb-7019b0acccdd/webchat/config.js';
      configScript.defer = true;
      document.body.appendChild(configScript);
      console.log('Config script added');
      
      window.botpressConfigInitialized = true;
    }

    return () => {
      // Optional: Cleanup logic if needed
    };
  }, []);

  return null; // This component does not need to render anything
};

export default BotpressWebchat;
