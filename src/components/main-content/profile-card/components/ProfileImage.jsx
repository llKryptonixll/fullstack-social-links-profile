import { db, auth, storage } from "../../../../firebase/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const ProfileImage = ({ state, getData }) => {
    function handleFileInput(e) {
        uploadImg(e.target.files[0]);
    }
    async function uploadImg(file) {
        if (!file) return;
        const imgRef = ref(storage, `profileImages/${auth.currentUser.uid}/${file.name}`);
        try {
            await uploadBytes(imgRef, file);
            const downloadURL = await getDownloadURL(imgRef);

            const userRef = doc(db, `users/${auth.currentUser.uid}/data/${state.data[0].id}`);
            await updateDoc(userRef, { profilePictureURL: downloadURL });
            alert('Profile picture uploaded successfully');
            getData()
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    }

    return (
        <div className="grid place-items-center gap-6 relative">
            {state.data && state.data[0] && state.data[0].profilePictureURL ? (
                <img className="w-[90px] h-[90px] rounded-full" src={state.data[0].profilePictureURL} alt="your profile image" />
            ) : (
                <div className="w-[90px] h-[90px] rounded-full bg-off_black grid place-items-center">
                    <FontAwesomeIcon className="text-4xl" icon={faUser} />
                </div>
            )}
            {state.settingsOpen ?
                <div className="absolute bg-white bg-opacity-50 hover:bg-green transition-colors rounded-full h-full grid place-items-center">
                    <FontAwesomeIcon className="absolute text-5xl text-dark_grey" icon={faArrowUpFromBracket} />
                    <input onChange={handleFileInput} aria-label="change your profile image" type="file" className="w-[90px] file:h-[90px] rounded-full opacity-0 file:cursor-pointer " />
                </div>

                : ""
            }
        </div>
    )
}

export default ProfileImage