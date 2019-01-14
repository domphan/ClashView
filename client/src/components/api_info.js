import React from 'react';
import ApiKey from './api_key_form';

const ApiInfo = () => {
  return(
    <div className="container">
      <h1>You have not registered an API key yet</h1>
      <p>
        Please create one at <a href="http://www.clashclantracker.appspot.com">www.clashclantracker.appspot.com</a> and save it. 
        This application uses the ClashClanTracker API (created by me in my CS496 class) to store your clan and player data. It assigns you an API key
        by using Google's authorization to request your email address.
      </p>
      <ApiKey />
    </div>
  );
}

export default ApiInfo;