import React from 'react';

const searchBar = (props) => {
    const { searchBy, setSearchBy, setKeyword } = props;

    return (
        <div className="input-group input-group-lg mb-3 fixed-top mx-auto mt-4" style={{width:"70%"}}>
            <div className="input-group-prepend">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="d-none d-sm-inline">{searchBy}</span>
                </button>
                <div className="dropdown-menu">
                    <button className="dropdown-item" value="Name" onClick={setSearchBy}>Name</button>
                    <button className="dropdown-item" value="Note Content" onClick={setSearchBy}>Note Content</button>
                </div>
            </div>
            <input
                type="text"
                className="form-control border border-primary"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder={"Search by " + searchBy}
                onChange={setKeyword} />
        </div>

    );
}

export default searchBar