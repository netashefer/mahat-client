
import { ReactComponent as Logo } from '../../icons/logo.svg';
import './LogoTitle.scss';

const LogoTitle = ({ size }: { size: 'sm' | 'lr'; }) => {
    return (

        <div className='text-container'>
            <Logo className={`logo ${size}`} />
            <div className={`title ${size}`}> Graph.it</div>
        </div>

    );
};

export default LogoTitle;
