import '../assets/style/popup.css';

function Pop_Up(props) {
    return (props.trigger) ? (
        <div className="register-popup">
            <div className="register-popup-inner">
                <div className="popup-inner-header">
                </div>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Pop_Up;