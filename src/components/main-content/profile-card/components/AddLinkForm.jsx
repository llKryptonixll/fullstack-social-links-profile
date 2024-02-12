import { useForm } from "react-hook-form";
import { db, auth } from "../../../../firebase/firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import uuid4 from "uuid4";
import { Button } from "@material-tailwind/react";

const AddLinkForm = ({ state, getData }) => {
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
    const inputStyles = `rounded-md border-[1px] border-white bg-transparent w-full h-[45px] pl-2 placeholder:text-white text-white focus:outline-none focus:border-green focus:border-2`;

    async function addNewLinks() {
        const newLink = {
            id: uuid4(),
            linkName: getValues("linkName"),
            linkURL: getValues("linkURL")
        };

        const userRef = doc(db, `users/${auth.currentUser.uid}/data/${state.data[0].id}`);
        try {
            await updateDoc(userRef, { links: arrayUnion(newLink) });
            getData();
            reset();
        } catch (error) {
            alert('Error adding new link:', error);
        }
    }


    return (
        <>
            {state.settingsOpen ?
                <form onSubmit={handleSubmit(addNewLinks)} className="md:flex md:space-x-4 md:gap-0 grid gap-2">
                    <div className="grid gap-1 flex-grow">
                        <input
                            {...register("linkName", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            })}
                            aria-label="Link Name"
                            name="linkName"
                            placeholder="Link Name"
                            className={`${inputStyles} ${errors.linkName ? 'border-red outline-none focus:border-red' : ''}`}
                            type="text"
                        />
                        <span className="text-red">{errors.linkName?.message}</span>
                    </div>
                    <div className="grid gap-1 flex-grow">
                        <input
                            {...register("linkURL", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                pattern: {
                                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                                    message: "Please enter a valid URL"
                                }
                            })}
                            aria-label="Link URL"
                            name="linkURL"
                            placeholder="Link URL"
                            className={`${inputStyles} ${errors.linkURL ? 'border-red outline-none focus:border-red' : ''}`}
                            type="text"
                        />
                        <span className="text-red">{errors.linkURL?.message}</span>
                    </div>
                    <Button type="submit" size="lg" className="bg-white text-off_black font-bolder md:w-16 h-[45px] text-xl flex justify-center items-center">+</Button>
                </form>
                : ""
            }
        </>
    )
}

export default AddLinkForm