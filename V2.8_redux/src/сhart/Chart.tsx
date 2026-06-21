import { Group } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import GroupGrid from "./components/GroupGrid";
import { types, habitats, lifetimes } from "./groupdata";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Footer from "../components/Footer";
import * as React from 'react';
import GroupChart from "./components/GroupChart";

type tSelect = "Тип" | "Среда обитания" | "Продолжительность жизни";

function Chart() {
    const [group, setGroup] = React.useState<tSelect>("Тип");
    const [groupData, setGroupData] = React.useState(types);
    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as tSelect;
        setGroup(value);

        switch (value) {
            case "Тип":
                setGroupData(types);
                break;
            case "Среда обитания":
                setGroupData(habitats);
                break;
            case "Продолжительность жизни":
                setGroupData(lifetimes);
                break;
        }
      }
    return (
        <div>
            <Navbar active="3"/>
            <Box sx={{ width:"200px", m:"auto" }}>
                <FormControl fullWidth>
                <InputLabel> Группировать по </InputLabel>
                    <Select
                    id="select-group"
                    value={group}
                    label="Группировать по"
                    onChange={ handleChange }
                    >
                    <MenuItem value="Тип"> Типу </MenuItem>
                    <MenuItem value="Среда обитания"> Среде обитания </MenuItem>
                    <MenuItem value="Продолжительность жизни"> Продолжительности жизни </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <GroupChart data = {groupData}/>
            <GroupGrid data = {groupData}/>
            <Footer/>
        </div>
    )
}

export default Chart;