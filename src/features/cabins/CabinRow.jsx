import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import CreateEditCabinForm from "./CreateEditCabinForm";
import styled from "styled-components";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {

    const {
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description
    } = cabin;

    const { isCreating, createCabin } = useCreateCabin();
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const [showForm, setShowForm] = useState(false);

    function handleDuplicateCabin() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description
        });
    }

    return (
        <>
            <TableRow role="row">
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <div>Fits up to {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span style={{ display: 'block', textAlign: 'center' }}>&mdash;</span>}
                <div>
                    <button onClick={handleDuplicateCabin} disabled={isCreating}>
                        <HiSquare2Stack />
                    </button>
                    <button onClick={() => setShowForm(showForm => !showForm)}>
                        <HiPencil />
                    </button>
                    <button onClick={() => deleteCabin(cabin)} disabled={isDeleting}>
                        <HiTrash />
                    </button>
                </div>
            </TableRow>
            {showForm && <CreateEditCabinForm cabinToEdit={cabin} setShowForm={setShowForm} />}
        </>
    )
}

export default CabinRow
