import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";

function CreateCabinForm() {
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors }
    } = useForm();

    const queryClient = useQueryClient();

    const {
        mutate,
        isLoading: isCreating
    } = useMutation({
        // (newCabin) => createCabin(newCabin),
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
            reset();
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    function submitForm(data) {
        mutate(data);
    }

    function errorSubmit(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(submitForm, errorSubmit)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
                    defaultValue=""
                    {...register(
                        'description',
                        {
                            required: "This field is required",
                        }
                    )}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput id="image" accept="image/*" />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Edit cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
