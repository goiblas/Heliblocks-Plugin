const ButtonColor = ( {color, ...props} ) => {
    return (
        <div className="hb-color-container">
            <button 
                className="hb-color-button"
                style={{background: color}}
                {...props} />
        </div>
    )
}
export default ButtonColor;