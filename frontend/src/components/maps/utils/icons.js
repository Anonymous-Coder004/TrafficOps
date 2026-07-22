import L from "leaflet";

export const officerIcon = new L.Icon({
    iconUrl: "/markers/marker-icon-green.png",
    shadowUrl: "/markers/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export const incidentIcon = new L.Icon({
    iconUrl: "/markers/marker-icon-red.png",
    shadowUrl: "/markers/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export const selectedLocationIcon = new L.Icon({
    iconUrl: "/markers/marker-icon-blue.png",
    shadowUrl: "/markers/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});