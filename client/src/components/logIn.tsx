
import { ReactElement } from 'react'; 
import { Button, Modal as BootstrapModal } from 'react-bootstrap';


// ----------------------------------------------------------
//
// THIS FILE IS DEPRECATED AND IS THEREFORE NOT IN USE
//
// ----------------------------------------------------------
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

const Modal = ()=> {
    return (
        <Button>Hej</Button>
    )
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