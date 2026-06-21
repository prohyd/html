import { forwardRef } from "react";

const Filter = forwardRef((props, ref) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const filterField = {
      "Название": event.target["name"].value.toLowerCase(),
      "Тип": event.target["type"].value.toLowerCase(),
      "Среда обитания": event.target["habitat"].value.toLowerCase(),
      "НачВыс": Number(event.target["startHeight"].value) || -Infinity,
      "КонВыс": Number(event.target["finalHeight"].value) || Infinity,
      "НачМасса": Number(event.target["startWeight"].value) || -Infinity,
      "КонМасса": Number(event.target["finalWeight"].value) || Infinity,
      "НачЖизнь": Number(event.target["startLife"].value) || -Infinity,
      "КонЖизнь": Number(event.target["finalLife"].value) || Infinity,
    };

    let arr = props.data;

    for (const key in filterField) {
      arr = arr.filter((item) => {
        // Фильтр по высоте
        if (["НачВыс", "КонВыс"].includes(key)) {
          return (
            Number(item["Высота"]) >= filterField["НачВыс"] &&
            Number(item["Высота"]) <= filterField["КонВыс"]
          );
        }

        // Фильтр по массе
        if (["НачМасса", "КонМасса"].includes(key)) {
          return (
            Number(item["Масса тела"]) >= filterField["НачМасса"] &&
            Number(item["Масса тела"]) <= filterField["КонМасса"]
          );
        }

        // Фильтр по продолжительности жизни
        if (["НачЖизнь", "КонЖизнь"].includes(key)) {
          return (
            Number(item["Продолжительность жизни"]) >= filterField["НачЖизнь"] &&
            Number(item["Продолжительность жизни"]) <= filterField["КонЖизнь"]
          );
        }

        // Текстовые фильтры
        return item[key]
          .toLowerCase()
          .includes(filterField[key]);
      });
    }

    props.filtering(arr);

    const n = Math.ceil(arr.length / props.amountRows);
    props.setActivePage("1");
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={props.resetTable}
      ref={ref}
    >
      <p>
        <label>Название:</label>
        <input name="name" type="text" />
      </p>

      <p>
        <label>Тип:</label>
        <input name="type" type="text" />
      </p>

      <p>
        <label>Среда обитания:</label>
        <input name="habitat" type="text" />
      </p>

      <p>
        <label>Высота от:</label>
        <input name="startHeight" type="number" />
      </p>

      <p>
        <label>Высота до:</label>
        <input name="finalHeight" type="number" />
      </p>

      <p>
        <label>Масса тела от:</label>
        <input name="startWeight" type="number" />
      </p>

      <p>
        <label>Масса тела до:</label>
        <input name="finalWeight" type="number" />
      </p>

      <p>
        <label>Продолжительность жизни от:</label>
        <input name="startLife" type="number" />
      </p>

      <p>
        <label>Продолжительность жизни до:</label>
        <input name="finalLife" type="number" />
      </p>

      <button type="submit">Фильтровать</button>
      <button type="reset">Очистить фильтры</button>
    </form>
  );
});

export default Filter;