function PumpkinData({title, sid, category, extras}) { 
    return (
        <>
            <div className="text-2xl font-semibold text-black">{title}</div>
            {extras && <div className="text-xl text-black">{extras}</div>}
            <div className="text-xl text-black">{category}</div>
            <div className="text-lg font-mono text-black">{sid}</div>
        </>
    )
}
export default PumpkinData;
