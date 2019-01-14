import React from 'react';


const PicHeader = (props) => {
  const picStyle = {
    backgroundImage: `url(${props.image})`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    paddingRight: '10rem',
    filter: 'brightness(90%)',
    minHeight: '200px'
  };

  const containerStyle = {
    marginBottom: '1rem',
  }

  const headerStyle = {
    background: 'linear-gradient(to right, rgba(78,78,78,1) 0%,rgba(87,87,87,1) 51%,rgba(92,92,92,1) 71%,rgba(92,92,92,1) 71%,rgba(111,111,111,1) 100%)',
    position: 'relative',
    color: 'white',
    borderRadius: "5px",
    fontSize: "5rem",
    display: 'flex',
  };

  const smallStyle = {
    color: '#999',
    fontSize: '3rem'
  }

  const textStyle = {
    alignSelf: 'flex-end'
  };
  return(
    <div className="container" style={containerStyle}>
      <div className="row" style={headerStyle}>
        <div 
          className="container-fluid col-xs-9 col-sm-9 col-md-9 col-lg-9"
          style={textStyle}
        >
          {props.title} <small style={smallStyle}>{props.caption}</small>
        </div>
        <div 
          className="container-fluid col-xs-3 col-sm-3 col-md-3 col-lg-3"
          style={picStyle}
        >
        </div>
      </div>
    </div>
  );
}

export default PicHeader;