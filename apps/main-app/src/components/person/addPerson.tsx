"use client"

import { memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdAddCircleOutline } from "react-icons/md";
import { usePersonStore } from "../definitions/stores/person-store";
import { PersonData } from "../definitions/types/person-interfaces";

function AddPerson() {
    console.log("Rendering AddPerson...");

    const { register, handleSubmit, reset, formState: { errors } } = useForm<PersonData>();
    const { addPerson } = usePersonStore();

    const onsubmit: SubmitHandler<PersonData> = (data) => {
        addPerson(data);
        reset(); 
    }

    return (
        <form className="w-full h-full flex items-center justify-center" onSubmit={ handleSubmit(onsubmit) }>
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full max-w-sm border p-10 gap-7">

                <input {...register("id", { required: true })} className="input-hidden" hidden={true} value={0}/>

                <div>
                    <label className="label mb-2">Name</label>
                    <input {...register("name", { required: true })} className="input w-full" placeholder="Name" />
                    { errors.name && <span className="text-error mt-2">It's required</span> }
                </div>

                <div>
                    <label className="label mb-2">Job</label>
                    <input {...register("job", { required: true })} className="input w-full" placeholder="Job" />
                    { errors.job && <span className="text-error mt-2">It's required</span> }
                </div>

                <div>
                    <label className="label mb-2">Favorite color</label>
                    <input {...register("color", { required: true })} className="input w-full" placeholder="Favorite color" />
                    { errors.color && <span className="text-error mt-2">It's required</span> }
                </div>

                <button type="submit" className="btn btn-primary btn-soft mt-4">
                    <MdAddCircleOutline /> Add
                </button>

            </fieldset>
        </form>
    );
}

export default  memo(AddPerson);