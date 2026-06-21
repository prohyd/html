import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

interface NavigationChainProps {
    title: string;
}

function BreadCrumbs({ title }: NavigationChainProps) {
    return (
        <div style={{ margin: "5px 0" }}>
            <Link
                to="/"
                style={{ textDecoration: "none" }}
            >
                <Button variant="text">
                    Главная
                </Button>
            </Link>

            <span style={{ margin: "0 5px" }}>
                {'>'}
            </span>

            <span>{title}</span>
        </div>
    );
}

export default BreadCrumbs;