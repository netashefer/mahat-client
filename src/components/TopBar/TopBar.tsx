
import LogoTitle from '../LogoTitle/LogoTitle';
import './TopBar.scss';


interface TopBarProps {
    withLogo?: boolean;
}

const TopBar = ({ withLogo = true }: TopBarProps) => {
    return (
        <div className='top-bar'>
            {
                withLogo ? <LogoTitle size='sm' /> : null
            }
        </div>
    );
};

export default TopBar;
