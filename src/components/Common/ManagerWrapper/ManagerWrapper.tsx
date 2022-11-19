import './ManagerWrapper.scss';

const ManagerWrapper = ({ children }: { children: JSX.Element;}) => {

    return (
        children ?
            <div className='manager-wrapper'>
                {children}
            </div>
            : null
    );
};

export default ManagerWrapper;
