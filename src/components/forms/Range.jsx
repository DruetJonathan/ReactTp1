export function Range({onChange,range,min,max,label}){
    return <div>
        <label className="form-range-label">{label} de {min} à {range}</label><br/>
        <input type="range" className="form-range" onChange={(e)=>onChange(e.target.value)} min={min} max={max}/>
    </div>
}