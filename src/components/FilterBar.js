import { Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRefresh,
    faClose,
    faChevronUp,
    faChevronDown,
    faMagnifyingGlass,
    faSort,
    faClock,
    faLock,
    faLockOpen,
} from "@fortawesome/free-solid-svg-icons";

const FilterBar = ({ refresh }) => {
    return (
        <>
            <Tooltip content={"Refreshes all accounts"}>
                <button className="sort-button" onClick={(e) => refresh()}>
                    Refresh All <FontAwesomeIcon icon={faRefresh} />
                </button>
            </Tooltip>
        </>
    );
};

export default FilterBar;
