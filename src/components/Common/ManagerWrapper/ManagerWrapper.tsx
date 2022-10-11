import './ManagerWrapper.scss';

const ManagerWrapper = ({ children }: { children: JSX.Element; }) => {

    return (
        <div className='manager-wrapper'>
            {children}
        </div>
    );
};

export default ManagerWrapper;
