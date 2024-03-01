
import React, { useState } from 'react';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import translateIcon from '../../src/images/translate_icon.svg';
import itGirlImage from '../../src/images/IT-girl.jpg';

export function mainContent() {
    return (
      <div className="container-fluid h-100 mainBackground">
        <div className="row h-100">
          <div className="col-6 d-flex flex-column">
            <div className="half-box">INNEHÅLL</div>
            <div className="half-box">INNAHALL</div>
          </div>
          <div className="col-6 right centered-image">
            <img src={itGirlImage} alt="Logo" className="bit-girl" />
          </div>
        </div>
      </div>
    );
  }

export default mainContent;