import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

function CreateEditCabinForm({ cabinToEdit = {}, onCloseModal }) {

    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();
    const isWorking = isCreating || isEditing;

    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSection = Boolean(editId);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: isEditSection ? editValues : {}
    });

    function submitForm(data) {
        const image = typeof data.image === 'string' ? data.image : data.image[0];

        isEditSection ?
            editCabin(
                {
                    newCabinInfo: { ...data, image },
                    id: editId
                },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    }
                }
            )
            : createCabin(
                {
                    ...data,
                    image: image
                },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    }
                }
            );
    }

    function errorSubmit(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(submitForm, errorSubmit)}>
            <FormRow label="Cabin name" error={errors?.name?.message} type={onCloseModal ? "modal" : "regular"}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register(
                        'name',
                        {
                            required: "This field is required",
                        }
                    )}
                />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register(
                        'maxCapacity',
                        {
                            required: "This field is required",
                            min: {
                                value: 1,
                                message: "Capacity should be at least 1"
                            }
                        }
                    )}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register(
                        'regularPrice',
                        {
                            required: "This field is required",
                        }
                    )}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                    {...register(
                        'discount',
                        {
                            required: "This field is required",
                            validate: (value) => {
                                if (parseFloat(value) <= parseFloat(getValues().regularPrice))
                                    return true;
                                else
                                    return "Discount needs to be less than regular price";
                            },
                        }
                    )}
                />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    defaultValue=""
                    {...register(
                        'description',
                        {
                            required: "This field is required",
                        }
                    )}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register('image',
                        {
                            required: isEditSection && getValues().image ? false : "This field is required",
                        }
                    )}
                />
                {typeof getValues().image === "string" && <input type="hidden" id="actualImage" {...register("actualImage")} value={getValues().image} />}
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button onClick={() => onCloseModal?.()} variation="secondary" type={isEditSection ? "button" : "reset"}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSection ? 'Edit cabin' : 'Create new cabin'}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateEditCabinForm;
