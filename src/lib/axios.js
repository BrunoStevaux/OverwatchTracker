import Axios from "axios";

const axios = Axios.create({
    headers: {
        "X-Requested-With": "application/xml",
    },
    withCredentials: false,
});

export default axios;
