import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const marker = (props) => {

    const { position, isCurrentPos, userName, location, note, saveNote, handleChange, markClicked } = props;

    const greenIcon = new L.Icon({
        iconUrl:
            !isCurrentPos
                ? "https://i.pinimg.com/originals/7a/80/c9/7a80c9fbeb2158487b68c827a17bbbea.png"
                : "https://www.freeiconspng.com/uploads/map-location-icon-29.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [40, 41],
        iconAnchor: [12, 41],
        popupAnchor: [9, -41],
        shadowSize: [41, 41]
    });

    return (
        <Marker
            position={position}
            icon={greenIcon}
            onclick={() => markClicked({ userName: userName, location: location, note: note })}>
            <Popup minWidth="400" className="d-none d-sm-block">
                <div className="form-group">
                    <p className="h3">{location}</p>
                    <p><strong>Name: </strong>{userName}</p>
                    <p><strong>Note: </strong>{note}</p>
                </div>
                {isCurrentPos ?
                    (<div className="form-group">
                        <label><strong>Add Note:</strong></label>
                        <textarea className="form-control" onChange={handleChange} />
                        <button className="btn btn-success mt-2" type="button" onClick={saveNote}>Save</button>
                    </div>)
                    : null}
            </Popup>
        </Marker>
    )
}

export default marker;