import './App.css'
import {Input} from "./components/forms/Input.jsx";
import {Checkbox} from "./components/forms/Checkbox.jsx";
import {ProductCategoryRow} from "./components/products/ProductCategoryRow.jsx";
import {ProductRow} from "./components/products/ProductRow.jsx";
import {useState} from "react";
import {Range} from "./components/forms/Range.jsx";

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
]

function App() {
    const [showStockedOnly,setShowStockedOnly] = useState(false);
    const [search,setSearch] = useState('');
    const [range,setRange] = useState(10);
    const visibleProduct = PRODUCTS.filter(product =>{
        if (showStockedOnly && !product.stocked){
            return false;
        }
        if (search && !product.name.includes(search)){
            return false;
        }
        if (range && parseFloat(product.price.substring(1)) > range) {
            return false;
        }

        return true
    })
    return <div className="container my-5">
        <SearchBar
            search={search}
            onSearchChange={setSearch}
            showStockedOnly={showStockedOnly}
            onStockedOnlyChange={setShowStockedOnly}
            range={range}
            onRangeChange={setRange}
        />
        <ProductTable products={visibleProduct}/>
    </div>
}
function SearchBar({showStockedOnly,onStockedOnlyChange,search,onSearchChange,range,onRangeChange}){
    return <div className="form-check">
        <div className="mb-3">
            <Input value={search} onChange={onSearchChange} placeholder="Rechercher"/>
            {/*<input type="range" className="form-range" onChange={(e)=>onRangeChange(e.target.value)} min={0} max={10}/>*/}
            <Range onChange={onRangeChange} range={range} min={0} max={10} label="Fouchette de prix"/>
            <Checkbox id="stocked" checked={showStockedOnly}
                      onChange={onStockedOnlyChange}
                      label="N'afficher que les produits en stock"/>
        </div>
    </div>
}
function ProductTable({products}) {
    const rows = [];
    let lastCategory = null;
    for (let product of products){
        if (product.category !== lastCategory){
            rows.push(<ProductCategoryRow key={product.category} name={product.category}/>)
        }
        lastCategory = product.category;
        rows.push(<ProductRow product={product} key={product.name}/>)
    }
    return <table className="table">
        <thead>
        <tr>
            <td>Nom</td>
            <td>Prix</td>
        </tr>
        <tbody>
        {rows}
        </tbody>
        </thead>
    </table>
}

export default App
