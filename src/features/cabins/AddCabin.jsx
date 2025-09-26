import CreateEditCabinForm from "./CreateEditCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
    return <div>
        <Modal>
            <Modal.Open opens='cabin-form'>
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name='cabin-form'>
                <CreateEditCabinForm />
            </Modal.Window>
        </Modal>
    </div>
}

export default AddCabin
