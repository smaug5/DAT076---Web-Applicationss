
import React from 'react'; 

function logIn(props) {
    return (props.trigger) ? (
        <div className="login">
            <div className='login-inner'>
                <button className="close-btn">close</button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default logIn