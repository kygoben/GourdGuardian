function PumpkinData({title, sid, category, extras, instruction}) { 
    return (
        <>
            <div className="text-2xl font-semibold text-black">{title}</div>
            {extras && <div className="text-xl text-black">{extras}</div>}
            <div className="text-xl text-black">{category}</div>
            <div 
                className="text-lg text-black"
                style={instruction ? {border: '4px solid red', display: 'inline-block'} : {}}
            >
                {sid}
            </div>
        </>
    )
}
export default PumpkinData;
