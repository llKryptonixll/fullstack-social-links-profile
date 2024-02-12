import LinkItem from "./components/LinkItem"
import ProfileImage from "./components/ProfileImage";
import AddLinkForm from "./components/AddLinkForm";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { INITIAL_STATE, profileCardReducer } from "./profileCardReducer";
import { db, auth } from "../../../firebase/firebase";
import { collection, getDocs, updateDoc, doc, arrayRemove } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faGear } from "@fortawesome/free-solid-svg-icons"

const ProfileCard = () => {
  const [state, dispatch] = useReducer(profileCardReducer, INITIAL_STATE);
  const { data, settingsOpen, updatedUserData } = state;
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getData();
      }
      else {
        navigate("/login")
      }
    })
  })

  async function getData() {
    try {
      const userDataRef = collection(db, `users/${auth.currentUser.uid}/data`);
      const data = await getDocs(userDataRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      dispatch({ type: "SET_DATA", payload: filteredData });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile() {
    const userRef = doc(db, `users/${auth.currentUser.uid}/data/${data[0].id}`);
    const { fullName, cityCountry, profession } = updatedUserData;

    try {

      const updateData = {};
      if (fullName.trim() !== "") updateData.fullName = fullName;
      if (cityCountry.trim() !== "") updateData.cityCountry = cityCountry;
      if (profession.trim() !== "") updateData.profession = profession;

      await updateDoc(userRef, updateData);
      getData();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  async function deleteLink(id) {
    const userRef = doc(db, `users/${auth.currentUser.uid}/data/${data[0].id}`);
    try {
      await updateDoc(userRef, { links: arrayRemove(data[0].links.find(link => link.id === id)) });
      getData();
    } catch (error) {
      alert('Error deleting link:', error);
    }
  }

  function toggleSettingsState() {
    dispatch({ type: "TOGGLE_SETTINGS" })
  }

  function makeContentEditable() {
    return settingsOpen ? { contentEditable: true } : {};
  }

  return (
    <section className={`${settingsOpen ? "max-w-[800px]" : "max-w-96"} bg-dark_grey w-full transition-all sm:p-12 p-6 grid gap-6 rounded-xl relative group`}>
      <button onClick={toggleSettingsState} aria-label="edit your profile card" className="absolute transition-opacity right-0 opacity-0 group-hover:opacity-100">
        <FontAwesomeIcon className="p-4 text-2xl text-white hover:text-green transition-colors" icon={faGear} />
      </button>
      <div className="grid gap-6 place-items-center text-center relative">
        <ProfileImage
          state={state}
          getData={getData}
        />
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 justify-center">
            <p {...makeContentEditable()} onBlur={updateProfile} onInput={(e) => dispatch({ type: "SET_UPDATED_USER_DATA", payload: { fullName: e.target.innerText } })} className="text-2xl font-medium">{state.data ? state.data[0].fullName : ""}</p>
            {settingsOpen ? <FontAwesomeIcon className="text-lg text-green" icon={faPen} /> : ""}
          </div>
          <p className="text-green text-sm font-medium flex space-x-2 items-center justify-center">
            <span {...makeContentEditable()} onBlur={updateProfile} onInput={(e) => dispatch({ type: "SET_UPDATED_USER_DATA", payload: { cityCountry: e.target.innerText } })}>{state.data ? state.data[0].cityCountry : ""}</span>
            {settingsOpen ? <FontAwesomeIcon className="text-lg text-green" icon={faPen} /> : ""}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <p {...makeContentEditable()} onBlur={updateProfile} onInput={(e) => dispatch({ type: "SET_UPDATED_USER_DATA", payload: { profession: e.target.innerText } })} className="text-sm">{state.data ? state.data[0].profession : ""}</p>
          {settingsOpen ? <FontAwesomeIcon className="text-lg text-green" icon={faPen} /> : ""}
        </div>
      </div>
      <div className="grid gap-4 overflow-auto max-h-[300px]">
        {state.data && state.data[0] && state.data[0].links && state.data[0].links.length > 0 ? (
          state.data[0].links.map((link) => (
            <LinkItem
              key={link.id}
              id={link.id}
              settingsOpen={settingsOpen}
              linkName={link.linkName}
              linkURL={link.linkURL}
              deleteLink={deleteLink}
            />
          ))
        ) : (
          <div className="text-center">NO LINKS ADDED</div>
        )}
      </div>
      <AddLinkForm 
        state={state}
        getData={getData}
      />
    </section>
  )
}

export default ProfileCard