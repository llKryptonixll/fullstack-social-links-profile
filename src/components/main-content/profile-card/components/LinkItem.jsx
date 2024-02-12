import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const LinkItem = ({ settingsOpen, id, linkName, linkURL, deleteLink }) => {
    return (
        <div className="flex space-x-3">
            <a className="w-full" href={linkURL}>
                <Button size="lg" className="bg-grey hover:bg-green hover:text-off_black w-full h-[45px]">{linkName}</Button>
            </a>
            {settingsOpen ?
                <button onClick={() => deleteLink(id)} aria-label="delete link">
                    <FontAwesomeIcon className="text-red text-xl" icon={faTrashCan} />
                </button>
                : ""
            }
        </div>
    )
}

export default LinkItem