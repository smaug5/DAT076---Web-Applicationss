
import React from 'react'; 
import { Modal } from 'react-bootstrap';

interface LoginModal {
    open: boolean;
    onClose: () => void;

}

export default function Modal(props: LoginModal) {
    return (
        <>
            <div className="modal-overlay">
                <div className="modal-box">
                </div>
            </div>
        </>
    );
}