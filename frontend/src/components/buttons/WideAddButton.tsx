import addIcon from '../../assets/svg/add.svg'
import './WideButton.css'

interface WideAddButtonInputs {
    onClick?: () => void
    disabled: boolean
}

export default function WideAddButton({ onClick, disabled }: WideAddButtonInputs) {
    return (
        <button className="wide-button hover:cursor-pointer " onClick={onClick} disabled={disabled}>
            <img className="w-[6rem]" src={addIcon}></img>
        </button>
    );
}