
import React, { FC, ReactElement } from 'react'; 
import { Button, Modal as BootstrapModal } from 'react-bootstrap';


interface LoginArgs {
    password: string;
    login: string;
}

type LoginFunction = (args: LoginArgs) => Promise<void>;


interface LoginProps {
    open: boolean;
    onClose: () => void;
    children: ReactElement;
    onLoginReq: LoginFunction;
}

const Modal = ({ message, isOpen, onClose, children })=> {
    if (!isOpen) return null
    return ReactDOM.createPortal(
        <div className="modal">
            <span className="message">{message}</span>
            <button onClick={onClose}>Close</button>
        </div>,
        domNode)
}

/*export default function Modal(props: LoginProps): ReturnType<FC> {
    return (
        <div className={`${"modal"} ${props.open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div className="modal-head">
                    <h1>Modal</h1>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="btn-container">
                    <button type="button" className="btn" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>  
    );
}

*/