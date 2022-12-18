interface RenderIfProps {
    children: JSX.Element;
    condition: boolean;
}

const RenderIf = ({ children, condition }: RenderIfProps) => {
    return condition ? children : null;
};

export default RenderIf;