import React from 'react';
import ApiKey from './api_key_form';

const ApiInfo = () => {
  return(
    <div className="container">
      <h1>You have not registered an API key yet</h1>
      <p>
        Please create one at <a href="http://www.clashclantracker.appspot.com">www.clashclantracker.appspot.com</a> and save it.
      </p>
      <ApiKey />
    </div>
  );
}

export default ApiInfo;