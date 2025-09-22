import CreateEditCabinForm from "./CreateEditCabinForm";
import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";

function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <div>
            <Button onClick={() => {
                setIsOpenModal((isOpen) => !isOpen)
            }}>
                Add new cabin
            </Button>
            {isOpenModal &&
                <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateEditCabinForm onCloseModal={() => setIsOpenModal(false)} />
                </Modal>
            }
        </div>
    )
}

export default AddCabin
