import React from 'react';

const cardStyle = {
  position: 'relative',
  minHeight: "100%",
  minWidth: "100%",
  color: 'white',
  backgroundColor: 'rgba(119, 101, 184, 0.7)',
  borderStyle: 'solid',
  borderColor: 'rgba(119, 101, 184, 0.7)',
  borderRadius: '10px',
}

const imgStyle = {
  maxHeight: "16rem",
}

const optionalImage = (imageSrc) => {
  return(
    <img alt='img' src={imageSrc} style={imgStyle}></img>
  );
}

const DisplayCard = (props) => {
  return(
    <div className="card" style={cardStyle}>
      <div className="card-body"></div>
      <h4 className="card-title">{props.title}</h4>
      {props.image && optionalImage(props.image)}
      <p className="card-text">{props.text}</p>
    </div>
  );
}

export default DisplayCard;