import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {Pedido} from '../../types/order';

type Props = {
   pedido: Pedido;
};

const OrderStatus = ({pedido}: Props) => {
    return (
        <div className="Order">
            <div className="OrderInfo">
                <div className="info">
                    <h3 > # {pedido.id}</h3>
                    <p > {pedido.costumerName} </p>
                    <p className="produto"> 
                               for com .map        </p> 
                </div>

                <div className="OrderIcons">
                    <FontAwesomeIcon icon={solid('play')} size="3x" />
                    <FontAwesomeIcon icon={solid('truck')} size="3x" />
                    <FontAwesomeIcon icon={solid('circle-check')} size="3x" />
                    <FontAwesomeIcon icon={solid('ban')} size="3x" />
                    
                    <div className="relatorio">
                        <FontAwesomeIcon icon={solid('file-lines')} size="3x" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderStatus;