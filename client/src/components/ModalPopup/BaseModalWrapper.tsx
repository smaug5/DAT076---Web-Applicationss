import React from "react";
import { DesktopModalContainer } from "./ModalPopup.styles";
import { Modal } from "react-bootstrap";

interface BaseModalWrapperProps {
    isModalVisible: boolean;
    onBackdropClick: () => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({onBackdropClick, isModalVisible}) => {
    if(!isModalVisible) {
        return null
    }

    return (<Modal onBackdropClick={onBackdropClick} >
        <DesktopModalContainer>
            
        </DesktopModalContainer>
    </Modal>);
}

export default BaseModalWrapper;