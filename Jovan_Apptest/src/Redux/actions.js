export const SET_CONTACT_ID = "SET_CONTACT_ID"
export const SET_CONTACT_FNAME = "SET_CONTACT_FNAME"
export const SET_CONTACT_LNAME = "SET_CONTACT_LNAME"
export const SET_CONTACT_AGE = "SET_CONTACT_AGE"
export const SET_CONTACT_PHOTO = "SET_CONTACT_PHOTO"

export const setId = id => dispatch => {
    dispatch({
        type: SET_CONTACT_ID,
        payload: id,
    });
};

export const setFname = fname => dispatch => {
    dispatch({
        type: SET_CONTACT_FNAME,
        payload: fname,
    });
};

export const setLname = lname => dispatch => {
    dispatch({
        type: SET_CONTACT_LNAME,
        payload: lname,
    });
};

export const setAge = age => dispatch => {
    dispatch({
        type: SET_CONTACT_AGE,
        payload: age,
    });
};

export const setPhoto = photo => dispatch => {
    dispatch({
        type: SET_CONTACT_PHOTO,
        payload: photo,
    });
};