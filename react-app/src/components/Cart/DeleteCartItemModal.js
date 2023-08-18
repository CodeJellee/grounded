import { useModal } from '../../context/Modal';
// import { useModalForCart } from '../Cart/ModalForCart'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkDeleteCurrentCartItem } from '../../store/cart';
import { thunkGetCurrentCart } from '../../store/cart';
import GetCurrentCart from '../Cart/GetCurrentCart';
//add css

function DeleteCartItemModal({productId}){
    console.log('IS THIS DELETE MODAL HITTING?')
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();


    const deleteClick = async () => {
        await dispatch(thunkDeleteCurrentCartItem(productId))
        closeModal()
        await dispatch(thunkGetCurrentCart())
        history.push(`/carts`)
    }

    return(
        <div id='delete-cart-item-modal-container'>
            <div className='delete-cart-info'>
                <div className='modal-confirm'>Confirm Delete</div>
                <div className='modal-confirm-saying'>Are you sure you want to remove this item?</div>
                <div className='modal-yes-no-button-container'>
                    <button className='from-cart-action' onClick={deleteClick}>Yes</button>
                    <button className='from-cart-action' onClick={(() => closeModal())}>No</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteCartItemModal;
