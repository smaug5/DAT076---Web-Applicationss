
import React from 'react'; 


function Login(props : any) {
    return (props.trigger) ? (
        <div className="login">
            <div className='login-inner'>
                <button className="close-btn">close</button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Login