import "../../styles/Build.css";

interface BuildingInfoProps {
    building: {
        img: string;
        title: string;
        description: string[];
    };
}

function BuildingInfo({ building }: BuildingInfoProps) {
    return (
        <div className="building">
            <h1 className="building__title">
                {building.title}
            </h1>

            <img
                className="building__image"
                src={building.img}
                alt={building.title}
            />

            <div className="building__description">
                {building.description.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        </div>
    );
}

export default BuildingInfo;