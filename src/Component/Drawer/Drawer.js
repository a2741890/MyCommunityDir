import React from 'react';

const drawer = (props) => {
    const { markDetails, showDetails, arrowClicked, handleChange, saveNote } = props;
    const isCurrentPos = markDetails.userName === 'Current User';
    var classList = ['collapse'];

    if (showDetails) {
        classList.push('show');
    }

    return (

        <div className="pos-f-t fixed-bottom d-sm-none">
            <div className={classList.join(' ')} id="navbarToggleExternalContent">
                <nav className="navbar navbar-dark bg-light">
                    <button className="mx-auto btn btn-block btn-sm mh-10 bg-light dropdown-toggle" type="button" onClick={arrowClicked} />
                </nav>
                <div className="container bg-light px-4 pb-4">
                    <div className="row">
                        <label className=" h3 text-left">{markDetails.location}</label>
                    </div>
                    <div className="row">
                        <label className="text-left"><strong>Name:</strong></label>
                        <span className="ml-2">{markDetails.userName}</span>
                    </div>
                    <div className="row">
                        <label className="text-left"><strong>Note:</strong></label>
                    </div>
                    <div className="row">
                        <p className="text-left">{markDetails.note}</p>
                    </div>
                    {isCurrentPos ?
                        (<div className="form-group mt-3">
                            <label className="pull-left"><strong>Add Note</strong></label>
                            <textarea className="form-control" onChange={handleChange} />
                            <button className="btn btn-success mt-2" type="button" onClick={saveNote}>Save</button>
                        </div>)
                        : null}
                </div>
            </div>
        </div>
    )
}

export default drawer;