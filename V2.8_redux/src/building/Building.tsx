import { useParams } from "react-router-dom";
import structures from "../data";

import BreadCrumbs from "./component/BreadCrumbs";
import BuildingInfo from "./component/BuildingInfo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Building() {
    const { id } = useParams();

    const building = structures[Number(id)];
    return (
        <>
            <Navbar active="1"/>
            <BreadCrumbs title={building.title} />
            <BuildingInfo building={building} />
            <Footer/>
        </>
    );
}

export default Building;