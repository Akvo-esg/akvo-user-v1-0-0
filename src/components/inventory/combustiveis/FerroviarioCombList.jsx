import React from "react";

export default function FerroviarioCombList() {
  return (
    <>
        <option value="" disabled selected>
          Escolha o combustível
        </option>
        <option value="11,Litros,Biodiesel (B100)" >Biodiesel (B100)</option>
        <option value="2,Litros,Óleo Diesel (comercial)" >Óleo Diesel (comercial)</option>
        <option value="13,Toneladas,Carvão Vapor 3100 kcal / kg" >Carvão Vapor 3100 kcal / kg</option>
        <option value="14,Toneladas,Carvão Vapor 3300 kcal / kg" >Carvão Vapor 3300 kcal / kg</option>
        <option value="15,Toneladas,Carvão Vapor 3700 kcal / kg" >Carvão Vapor 3700 kcal / kg</option>
        <option value="16,Toneladas,Carvão Vapor 4200 kcal / kg" >Carvão Vapor 4200 kcal / kg</option>
        <option value="17,Toneladas,Carvão Vapor 4500 kcal / kg" >Carvão Vapor 4500 kcal / kg</option>
        <option value="18,Toneladas,Carvão Vapor 4700 kcal / kg" >Carvão Vapor 4700 kcal / kg</option>
        <option value="19,Toneladas,Carvão Vapor 5200 kcal / kg" >Carvão Vapor 5200 kcal / kg</option>
        <option value="20,Toneladas,Carvão Vapor 5900 kcal / kg" >Carvão Vapor 5900 kcal / kg</option>
        <option value="21,Toneladas,Carvão Vapor 6000 kcal / kg" >Carvão Vapor 6000 kcal / kg</option>
        <option value="22,Toneladas,Carvão Vapor sem Especificação" >Carvão Vapor sem Especificação</option>
        <option value="23,Toneladas,Coque de Carvão Mineral" >Coque de Carvão Mineral</option>
    </>
  );
}
