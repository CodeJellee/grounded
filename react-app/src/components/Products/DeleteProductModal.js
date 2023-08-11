import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkDeleteSingleProduct } from '../../store/product';
import GetUserProducts from './GetUserProducts';
//add css

function DeleteProductModal({productId}){
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();


    const deleteClick = () => {
        dispatch(thunkDeleteSingleProduct(productId))
        closeModal()
        history.push(`/products/current`)
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

export default DeleteProductModal;
