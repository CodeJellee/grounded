import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkDeleteCurrentCartItem } from '../../store/cart';
import { thunkGetCurrentCart } from '../../store/cart';
import GetCurrentCart from '../Cart/GetCurrentCart';
//add css

function DeleteCartItemModal({productId}){
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();


    const deleteClick = () => {
        dispatch(thunkDeleteCurrentCartItem(productId))
        closeModal()
        dispatch(thunkGetCurrentCart())
        history.push(`/carts`)
    }

    return(
        <>
            <div className='modal-container'>
                <div className='modal-confirm'>Confirm Delete</div>
                <div className='modal-confirm-saying'>Are you sure you want to remove this item?</div>
                <div className='modal-yes-no-button-container'>
                    <button onClick={deleteClick}>Yes</button>
                    <button onClick={(() => closeModal())}>No</button>
                </div>

            </div>
        </>
    )
}

export default DeleteCartItemModal;
