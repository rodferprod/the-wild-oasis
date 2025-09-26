import CreateEditCabinForm from "./CreateEditCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
    return <Modal>
        <Modal.Open opens='cabin-form'>
            <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
            <CreateEditCabinForm />
        </Modal.Window>

        <Modal.Open opens='table-list'>
            <Button>List Cabins</Button>
        </Modal.Open>
        <Modal.Window name='table-list'>
            <CabinTable />
        </Modal.Window>
    </Modal>
}

export default AddCabin
