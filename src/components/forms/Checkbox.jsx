
export function Checkbox({checked, onChange, label,id}) {
    return <div>
        <input type="checkbox"
               id={id}
               className="form-check-input"
               checked={checked}
               onChange={(e)=>onChange(e.target.value)}/>
        <label htmlFor={id} className="form-check-label">{label}</label>
    </div>
}